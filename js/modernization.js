/*
 * ============================================
 * AWET WEBSITE MODERNIZATION - JAVASCRIPT
 * ============================================
 * 
 * This file adds modern interactivity:
 * - Scroll reveal animations
 * - Smooth scrolling
 * - Video background controls
 * - Counter animations
 * - Navbar scroll effects
 * - Preloader
 * 
 * HOW TO USE:
 * Add this before </body>:
 * <script src="js/modernization.js"></script>
 * ============================================
 */

(function() {
    'use strict';

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function() {
        initPreloader();
        initScrollReveal();
        initSmoothScroll();
        initNavbarScroll();
        initVideoBackground();
        initCounterAnimation();
        initParallaxEffects();
        initHoverEffects();
    });

    /* ============================================
       1. PRELOADER
       ============================================ */
    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        
        if (preloader) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    preloader.classList.add('loaded');
                }, 500);
            });
        }
    }

    /* ============================================
       2. SCROLL REVEAL ANIMATIONS
       ============================================ */
    function initScrollReveal() {
        // Elements to animate
        const revealElements = [
            { selector: '.section-title', class: 'reveal' },
            { selector: '.center-heading', class: 'reveal' },
            { selector: '.left-heading', class: 'reveal' },
            { selector: '.left-text', class: 'reveal' },
            { selector: '.center-text', class: 'reveal' },
            { selector: '.team-item', class: 'reveal-scale' },
            { selector: '.mini-box', class: 'reveal-scale' },
            { selector: '.Projects-post-thumb', class: 'reveal' },
            { selector: '.activities-post-thumb', class: 'reveal' },
            { selector: '#About img', class: 'reveal-left' },
            { selector: '.contact-form', class: 'reveal' },
            { selector: '.count-item', class: 'reveal-scale' }
        ];

        // Add reveal classes to elements
        revealElements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach((el, index) => {
                if (!el.classList.contains('reveal') && 
                    !el.classList.contains('reveal-left') && 
                    !el.classList.contains('reveal-right') &&
                    !el.classList.contains('reveal-scale')) {
                    el.classList.add(item.class);
                    // Add staggered delay for grid items
                    if (item.selector.includes('team-item') || 
                        item.selector.includes('mini-box') ||
                        item.selector.includes('Projects-post-thumb') ||
                        item.selector.includes('count-item')) {
                        el.classList.add('delay-' + ((index % 6) + 1));
                    }
                }
            });
        });

        // Intersection Observer for reveal
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }

    /* ============================================
       3. SMOOTH SCROLLING
       ============================================ */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.header-area')?.offsetHeight || 100;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const menuTrigger = document.querySelector('.menu-trigger');
                    const nav = document.querySelector('.main-nav .nav');
                    if (menuTrigger && nav) {
                        menuTrigger.classList.remove('active');
                        nav.classList.remove('visible');
                    }
                }
            });
        });
    }

    /* ============================================
       4. NAVBAR SCROLL EFFECTS
       ============================================ */
    function initNavbarScroll() {
        const header = document.querySelector('.header-area');
        if (!header) return;

        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove background class
            if (currentScroll > 100) {
                header.classList.add('background-header');
            } else {
                header.classList.remove('background-header');
            }
            
            // Hide/show navbar on scroll (optional)
            // if (currentScroll > lastScroll && currentScroll > 300) {
            //     header.style.transform = 'translateY(-100%)';
            // } else {
            //     header.style.transform = 'translateY(0)';
            // }
            
            lastScroll = currentScroll;
        });

        // Active nav link highlighting
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.nav li a');

        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.pageYOffset + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    /* ============================================
       5. VIDEO BACKGROUND
       ============================================ */
    function initVideoBackground() {
        const video = document.querySelector('.welcome-video');
        if (!video) return;

        // Fade in video when ready
        video.addEventListener('canplaythrough', function() {
            this.classList.add('is-ready');
        });

        // Fallback if already loaded
        if (video.readyState >= 3) {
            video.classList.add('is-ready');
        }

        // Add video controls if not exist
        const welcomeArea = document.querySelector('.welcome-area');
        if (welcomeArea && !document.querySelector('.video-controls')) {
            const controls = document.createElement('div');
            controls.className = 'video-controls';
            controls.innerHTML = `
                <button class="video-btn" id="muteBtn" title="Toggle Sound">
                    <i class="fa fa-volume-off"></i>
                </button>
                <button class="video-btn" id="playBtn" title="Pause/Play">
                    <i class="fa fa-pause"></i>
                </button>
            `;
            welcomeArea.appendChild(controls);

            // Control functionality
            const muteBtn = document.getElementById('muteBtn');
            const playBtn = document.getElementById('playBtn');

            if (muteBtn) {
                muteBtn.addEventListener('click', function() {
                    video.muted = !video.muted;
                    this.innerHTML = video.muted 
                        ? '<i class="fa fa-volume-off"></i>' 
                        : '<i class="fa fa-volume-up"></i>';
                });
            }

            if (playBtn) {
                playBtn.addEventListener('click', function() {
                    if (video.paused) {
                        video.play();
                        this.innerHTML = '<i class="fa fa-pause"></i>';
                    } else {
                        video.pause();
                        this.innerHTML = '<i class="fa fa-play"></i>';
                    }
                });
            }
        }
    }

    /* ============================================
       6. COUNTER ANIMATION
       ============================================ */
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.count-item strong');
        if (counters.length === 0) return;

        const animateCounter = (counter) => {
            const target = parseInt(counter.innerText);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        };

        // Observe counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /* ============================================
       7. PARALLAX EFFECTS
       ============================================ */
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const offset = scrolled * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        });
    }

    /* ============================================
       8. HOVER EFFECTS ENHANCEMENT
       ============================================ */
    function initHoverEffects() {
        // Add tilt effect to cards (optional, subtle)
        const cards = document.querySelectorAll('.team-item, .Projects-post-thumb, .activities-post-thumb, .mini-box');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Magnetic effect for buttons (optional)
        const buttons = document.querySelectorAll('.main-button, .contact-form button');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    /* ============================================
       9. MOBILE MENU ENHANCEMENT
       ============================================ */
    function initMobileMenu() {
        const menuTrigger = document.querySelector('.menu-trigger');
        const nav = document.querySelector('.main-nav .nav');

        if (menuTrigger && nav) {
            menuTrigger.addEventListener('click', function() {
                this.classList.toggle('active');
                nav.classList.toggle('visible');
            });
        }
    }

    /* ============================================
       10. IMAGE LAZY LOADING
       ============================================ */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    /* ============================================
       11. TYPING EFFECT (Optional for hero)
       ============================================ */
    function initTypingEffect() {
        const typingElement = document.querySelector('[data-typing]');
        if (!typingElement) return;

        const text = typingElement.dataset.typing;
        const speed = 50;
        let i = 0;

        typingElement.innerHTML = '';

        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        // Start typing when element is visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.disconnect();
            }
        });

        observer.observe(typingElement);
    }

    /* ============================================
       12. SCROLL PROGRESS BAR (Optional)
       ============================================ */
    function initScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                z-index: 9999;
                background: rgba(0,0,0,0.1);
            }
            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #40b6b4, #3a91ee);
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);

        // Update on scroll
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
        });
    }

    // Uncomment to enable scroll progress bar:
    // initScrollProgress();

})();
