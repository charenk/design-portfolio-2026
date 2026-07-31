'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

/**
 * Full-viewport GPU particle field: a topographic plane of small points that
 * drifts on a cheap trig noise field and leans away from the cursor, points
 * near the cursor brightening toward the accent magenta. Rendering pauses
 * when the tab is hidden or the canvas leaves the viewport, and under
 * prefers-reduced-motion exactly one static frame is drawn.
 */

const PLANE_WIDTH = 46
const PLANE_DEPTH = 30
const DIM_COLOR = '#2A2A33'
const ACCENT_COLOR = '#FF2E9A'

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uPointer;
  uniform float uPointerActive;
  uniform float uSize;

  attribute float aSeed;

  varying float vGlow;
  varying float vFade;

  // Cheap pseudo-noise from stacked trig waves: enough for a slow
  // topographic swell without a full simplex implementation.
  float swell(vec2 p, float t) {
    return sin(p.x * 0.55 + t * 0.55) * 0.34
         + cos(p.y * 0.42 - t * 0.42) * 0.34
         + sin((p.x + p.y) * 0.27 + t * 0.33) * 0.22;
  }

  void main() {
    vec3 pos = position;
    float t = uTime;

    pos.y += swell(pos.xz, t);
    pos.x += sin(t * 0.22 + aSeed * 6.2831) * 0.09;
    pos.z += cos(t * 0.18 + aSeed * 6.2831) * 0.09;

    // Cursor repulsion: gaussian falloff around the unprojected pointer.
    vec2 away = pos.xz - uPointer.xz;
    float dist = length(away);
    float force = exp(-dist * dist * 0.32) * uPointerActive;
    pos.xz += (away / max(dist, 0.001)) * force * 1.1;
    pos.y += force * 0.55;
    vGlow = clamp(force * 1.65, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float depth = -mv.z;
    vFade = smoothstep(36.0, 10.0, depth);
    gl_PointSize = uSize * (18.0 / depth);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  uniform vec3 uDimColor;
  uniform vec3 uAccentColor;

  varying float vGlow;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float disc = smoothstep(0.5, 0.12, r);
    float alpha = disc * (0.28 + 0.72 * vFade);
    alpha = min(1.0, alpha + vGlow * 0.5);
    vec3 color = mix(uDimColor, uAccentColor, vGlow);
    gl_FragColor = vec4(color, alpha);
  }
`

/**
 * Deterministic pseudo-random in [0, 1) from an index. Pure, so grid
 * jitter is stable across re-renders (and satisfies react-hooks/purity).
 */
function hashRandom(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123
  return s - Math.floor(s)
}

interface ParticleFieldProps {
  reducedMotion: boolean
  onFirstFrame: () => void
}

function ParticleField({ reducedMotion, onFirstFrame }: ParticleFieldProps) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const pointsRef = useRef<THREE.Points>(null)
  const firstFrame = useRef(false)

  const [count] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 2500 : 6000
  )

  const geometry = useMemo(() => {
    const cols = Math.round(Math.sqrt(count * (PLANE_WIDTH / PLANE_DEPTH)))
    const rows = Math.ceil(count / cols)
    const total = cols * rows
    const positions = new Float32Array(total * 3)
    const seeds = new Float32Array(total)
    let i = 0
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        positions[i * 3] =
          (col / (cols - 1) - 0.5) * PLANE_WIDTH +
          (hashRandom(i * 4 + 1) - 0.5) * 0.4
        positions[i * 3 + 1] = (hashRandom(i * 4 + 2) - 0.5) * 0.3
        positions[i * 3 + 2] =
          (row / (rows - 1) - 0.5) * PLANE_DEPTH +
          (hashRandom(i * 4 + 3) - 0.5) * 0.4
        seeds[i] = hashRandom(i * 4)
        i += 1
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    return geo
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector3(0, 0, 0) },
          uPointerActive: { value: 0 },
          uSize: { value: 2.2 },
          uDimColor: { value: new THREE.Color(DIM_COLOR) },
          uAccentColor: { value: new THREE.Color(ACCENT_COLOR) },
        },
      }),
    []
  )

  // Point size is expressed in device pixels: scale by the real pixel ratio.
  // Mutations go through the scene-graph ref, never the memoized value.
  useEffect(() => {
    const mat = pointsRef.current?.material as THREE.ShaderMaterial | undefined
    if (mat) {
      mat.uniforms.uSize.value = 2.2 * gl.getPixelRatio()
    }
  }, [gl])

  // Explicit GPU resource cleanup on unmount.
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  const ndc = useRef(new THREE.Vector2(0, 0))
  const pointerSeen = useRef(false)
  const pointerTarget = useRef(new THREE.Vector3(0, 0, 0))
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const groundPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    []
  )
  const hitPoint = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (event: PointerEvent) => {
      ndc.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
      pointerSeen.current = true
    }
    const onLeave = () => {
      pointerSeen.current = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion])

  useFrame((_state, delta) => {
    const points = pointsRef.current
    if (!points) return
    const uniforms = (points.material as THREE.ShaderMaterial).uniforms
    if (!reducedMotion) {
      uniforms.uTime.value += Math.min(delta, 0.05)

      if (pointerSeen.current) {
        raycaster.setFromCamera(ndc.current, camera)
        if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
          pointerTarget.current.copy(hitPoint)
        }
      }

      // Frame-rate independent damping toward the pointer target.
      const damp = 1 - Math.exp(-4.5 * delta)
      const pointerUniform = uniforms.uPointer.value as THREE.Vector3
      pointerUniform.lerp(pointerTarget.current, damp)
      uniforms.uPointerActive.value +=
        ((pointerSeen.current ? 1 : 0) - uniforms.uPointerActive.value) * damp
    }

    if (!firstFrame.current) {
      firstFrame.current = true
      onFirstFrame()
    }
  })

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  )
}

export default function SceneBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

  const pageHidden = useRef(false)
  const offscreen = useRef(false)
  const staticFrameDone = useRef(false)

  const applyFrameloop = useCallback(() => {
    const paused =
      pageHidden.current ||
      offscreen.current ||
      (reducedMotion && staticFrameDone.current)
    setFrameloop(paused ? 'never' : 'always')
  }, [reducedMotion])

  useEffect(() => {
    const onVisibility = () => {
      pageHidden.current = document.hidden
      applyFrameloop()
    }
    document.addEventListener('visibilitychange', onVisibility)

    let observer: IntersectionObserver | undefined
    const el = wrapRef.current
    if (el) {
      observer = new IntersectionObserver(([entry]) => {
        offscreen.current = !entry.isIntersecting
        applyFrameloop()
      })
      observer.observe(el)
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      observer?.disconnect()
    }
  }, [applyFrameloop])

  // Under reduced motion: allow exactly one rendered frame, then freeze.
  const handleFirstFrame = useCallback(() => {
    if (!reducedMotion || staticFrameDone.current) return
    staticFrameDone.current = true
    applyFrameloop()
  }, [reducedMotion, applyFrameloop])

  return (
    <div ref={wrapRef} className="cmd-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={frameloop}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 7.5, 16], fov: 48, near: 0.1, far: 80 }}
        onCreated={(state) => {
          state.camera.lookAt(0, 0, -2)
        }}
      >
        <ParticleField
          reducedMotion={reducedMotion}
          onFirstFrame={handleFirstFrame}
        />
      </Canvas>
    </div>
  )
}
