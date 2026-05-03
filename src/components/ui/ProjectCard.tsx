import Link from 'next/link'
import { LastViewedBadge } from './LastViewedBadge'

function slugFromHref(href: string): string {
  return href.replace(/^\//, '').split('/')[0] ?? ''
}

export interface ProjectCardProps {
  title: string
  tags: string
  href: string
  badge?: string
  aspect: string
  placeholder: string
  rotate?: string
  svgSrc?: string
  imageFit?: 'contain' | 'cover'
}

export function ProjectCard({ title, tags, href, badge, aspect, placeholder, rotate, svgSrc, imageFit = 'contain' }: ProjectCardProps) {
  const fitClass =
    imageFit === 'cover'
      ? 'object-cover object-center'
      : 'object-contain object-bottom'

  return (
    <Link href={href} className={`group block no-underline ${rotate ?? ''}`}>
      <div
        className={`w-full ${aspect} rounded-[14px] overflow-hidden shadow-sm relative
                    transition-transform duration-[220ms] group-hover:scale-[1.02]`}
        style={{ backgroundColor: placeholder }}
      >
        {svgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={svgSrc}
            alt=""
            draggable={false}
            className={`absolute inset-0 w-full h-full ${fitClass}`}
          />
        )}
        {badge && (
          <span className="absolute bottom-3 right-3 bg-black/10 text-[#1a1a1a]
                           text-[11px] font-medium px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
        <LastViewedBadge slug={slugFromHref(href)} />
      </div>
      <div className="mt-3 px-1">
        <p className="font-sans text-[15px] font-semibold text-[#1a1a1a]
                       inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-[220ms]">
          {title}
          <span aria-hidden="true">→</span>
        </p>
        <p className="font-sans text-[12px] text-[#9e9e9e] mt-1">{tags}</p>
      </div>
    </Link>
  )
}
