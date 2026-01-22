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
});
