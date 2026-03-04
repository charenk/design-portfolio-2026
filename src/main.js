// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Swiss Grid Fade on Scroll
    const pageBackground = document.querySelector('.pageBackground');
    
    function updateGridOpacity() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const maxScroll = docHeight - viewportHeight;
        
        // Calculate scroll progress (0 to 1)
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        
        // Fade out grid from 0% to 30% scroll progress
        let gridOpacity = 1;
        
        if (progress <= 0.30) {
            // Ease-out interpolation: starts fast, ends slow
            const fadeProgress = progress / 0.30;
            const easedProgress = 1 - Math.pow(1 - fadeProgress, 3); // cubic ease-out
            gridOpacity = 1 - easedProgress;
        } else {
            gridOpacity = 0;
        }
        
        // Force grid to be invisible near bottom (after 85% scroll)
        if (progress > 0.85) {
            gridOpacity = 0;
        }
        
        // Clamp opacity between 0 and 1
        gridOpacity = Math.max(0, Math.min(1, gridOpacity));
        
        // Apply the opacity to CSS variable
        if (pageBackground) {
            pageBackground.style.setProperty('--gridOpacity', gridOpacity);
        }
    }
    
    // Run on scroll with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateGridOpacity();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Run on initial load
    updateGridOpacity();
    
    // Apple-style Carousel Enhancement
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        // Enable momentum scrolling
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carouselContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            carouselContainer.style.cursor = 'grabbing';
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            isDown = false;
            carouselContainer.style.cursor = 'grab';
        });
        
        carouselContainer.addEventListener('mouseup', () => {
            isDown = false;
            carouselContainer.style.cursor = 'grab';
        });
        
        carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2;
            carouselContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Set initial cursor
        carouselContainer.style.cursor = 'grab';
    }
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Update aria-expanded for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add subtle animations on scroll (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project sections for fade-in effect
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Set first section visible immediately
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'translateY(0)';
    }
    
    // Add hover effect enhancements for buttons
    const buttons = document.querySelectorAll('button, .btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Navigation scroll transparency
    const nav = document.querySelector('nav');
    if (nav) {
        const handleScroll = function() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Check initial scroll position
        handleScroll();
    } else {
        console.error('Navigation element not found');
    }
    
    // Demo video modal
    const demoModal = document.getElementById('demo-modal');
    const demoModalBackdrop = demoModal && demoModal.querySelector('.demo-modal-backdrop');
    const demoModalClose = demoModal && demoModal.querySelector('.demo-modal-close');
    const demoModalIframe = document.getElementById('demo-modal-iframe');
    
    function openDemoModal(videoUrl) {
        if (!demoModal || !demoModalIframe) return;
        demoModalIframe.src = videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        demoModal.setAttribute('aria-hidden', 'false');
        demoModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        demoModalClose && demoModalClose.focus();
    }
    
    function closeDemoModal() {
        if (!demoModal || !demoModalIframe) return;
        demoModal.classList.remove('is-open');
        demoModal.setAttribute('aria-hidden', 'true');
        demoModalIframe.src = '';
        document.body.style.overflow = '';
    }
    
    document.querySelectorAll('.experiment-pill-demo').forEach(function(btn) {
        btn.addEventListener('click', function() {
            openDemoModal(this.getAttribute('data-video') || 'https://www.youtube.com/embed/dQw4w9WgXcQ');
        });
    });
    
    if (demoModalBackdrop) demoModalBackdrop.addEventListener('click', closeDemoModal);
    if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && demoModal && demoModal.classList.contains('is-open')) {
            closeDemoModal();
        }
    });
    
    // Tabs functionality (Workato page)
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    
    if (tabTriggers.length > 0) {
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all triggers
                tabTriggers.forEach(t => {
                    t.classList.remove('tab-active');
                    t.setAttribute('aria-selected', 'false');
                });
                
                // Add active class to clicked trigger
                this.classList.add('tab-active');
                this.setAttribute('aria-selected', 'true');
                
                // Hide all tab content panels
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                    content.setAttribute('aria-hidden', 'true');
                });
                
                // Show the target tab content
                const targetContent = document.getElementById('tab-' + targetTab);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                    targetContent.setAttribute('aria-hidden', 'false');
                    
                    // Re-trigger scroll animations for newly visible tab content
                    setTimeout(() => {
                        const fadeElements = targetContent.querySelectorAll('.fade-in-up');
                        fadeElements.forEach(el => {
                            scrollAnimationObserver.observe(el);
                        });
                    }, 50);
                }
            });
        });
    }
    
    // Scroll-triggered animations for Workato page
    const scrollAnimationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optionally unobserve after animation to improve performance
                    // scrollAnimationObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    // Observe all fade-in elements on page load
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    fadeInElements.forEach(element => {
        scrollAnimationObserver.observe(element);
    });
    
    // Smooth scroll enhancement
    document.documentElement.style.scrollBehavior = 'smooth';

    // Background Beams with Collision — Footer
    (function initFooterBeams() {
        var footer = document.querySelector('.footer');
        if (!footer) return;

        var beamsEl = document.createElement('div');
        beamsEl.className = 'beams-container';
        beamsEl.setAttribute('aria-hidden', 'true');
        footer.insertBefore(beamsEl, footer.firstChild);

        // Collision bar at bottom
        var bar = document.createElement('div');
        bar.className = 'beam-collision-bar';
        beamsEl.appendChild(bar);

        var configs = [
            { x: 10,   dur: 7,  repeat: 3,  delay: 2, h: 56 },
            { x: 600,  dur: 3,  repeat: 3,  delay: 4, h: 56 },
            { x: 100,  dur: 7,  repeat: 7,  delay: 0, h: 24 },
            { x: 400,  dur: 5,  repeat: 14, delay: 4, h: 56 },
            { x: 800,  dur: 11, repeat: 2,  delay: 0, h: 80 },
            { x: 1000, dur: 4,  repeat: 2,  delay: 0, h: 48 },
            { x: 1200, dur: 6,  repeat: 4,  delay: 2, h: 24 },
        ];

        configs.forEach(function(cfg) { runBeam(beamsEl, cfg); });

        function runBeam(container, cfg) {
            var beam = document.createElement('div');
            beam.className = 'beam';
            beam.style.left = cfg.x + 'px';
            beam.style.height = cfg.h + 'px';
            container.appendChild(beam);

            function cycle() {
                var containerH = container.offsetHeight;
                var startY = -cfg.h - 200;
                var endY = containerH;
                var dist = endY - startY;
                var duration = cfg.dur * 1000;
                var start = null;
                var collided = false;

                beam.style.opacity = '1';
                beam.style.transform = 'translateY(' + startY + 'px)';

                function step(ts) {
                    if (!start) start = ts;
                    var t = Math.min((ts - start) / duration, 1);
                    var y = startY + dist * t;
                    beam.style.transform = 'translateY(' + y + 'px)';

                    if (!collided && y + cfg.h >= containerH) {
                        collided = true;
                        explode(container, cfg.x, containerH);
                        beam.style.opacity = '0';
                        setTimeout(cycle, cfg.repeat * 1000);
                        return;
                    }
                    if (t < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            }

            setTimeout(cycle, (cfg.delay || 0) * 1000);
        }

        function explode(container, x, y) {
            var wrap = document.createElement('div');
            wrap.className = 'beam-explosion';
            wrap.style.left = x + 'px';
            wrap.style.top = y + 'px';
            container.appendChild(wrap);

            // Horizontal glow
            var glow = document.createElement('div');
            glow.className = 'beam-explosion-glow';
            wrap.appendChild(glow);

            // Particles
            var particles = [];
            for (var i = 0; i < 20; i++) {
                var p = document.createElement('span');
                p.className = 'beam-particle';
                var dx = Math.floor(Math.random() * 80 - 40);
                var dy = Math.floor(Math.random() * -50 - 10);
                var dur = (Math.random() * 1.5 + 0.5).toFixed(2);
                p.style.transition = 'transform ' + dur + 's ease-out, opacity ' + dur + 's ease-out';
                wrap.appendChild(p);
                particles.push({ el: p, dx: dx, dy: dy });
            }

            // Trigger animations next frame
            requestAnimationFrame(function() {
                glow.style.opacity = '0';
                particles.forEach(function(pt) {
                    pt.el.style.transform = 'translate(' + pt.dx + 'px,' + pt.dy + 'px)';
                    pt.el.style.opacity = '0';
                });
            });

            // Cleanup
            setTimeout(function() { wrap.remove(); }, 2000);
        }
    })();
});
