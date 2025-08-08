// Initialize AOS with optimized settings
AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true,
    offset: 150,
    delay: 0,
    anchorPlacement: 'top-bottom',
    disable: false
});

// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Side Navigation Elements
const sideNavLinks = document.querySelectorAll('.side-nav-link');
const subNavLinks = document.querySelectorAll('.sub-nav-link');
const sections = document.querySelectorAll('section[id]');
const sideNav = document.querySelector('.side-nav');

// Loading Screen Management
function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// Initialize loading screen
window.addEventListener('load', hideLoadingScreen);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Side Navigation Active State Management
function updateSideNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.side-nav-link[href="#${sectionId}"]`);
        const correspondingSubNavLink = document.querySelector(`.sub-nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            sideNavLinks.forEach(link => link.classList.remove('active'));
            subNavLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's link
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
                // If it's a sub-nav item, also activate the parent
                const parentItem = correspondingNavLink.closest('.side-nav-item');
                if (parentItem) {
                    parentItem.classList.add('active');
                }
            }
            if (correspondingSubNavLink) {
                correspondingSubNavLink.classList.add('active');
                // Activate the parent experience item
                const parentItem = correspondingSubNavLink.closest('.side-nav-item');
                if (parentItem) {
                    parentItem.classList.add('active');
                }
            }
            
            // Update side nav background based on section
            updateSideNavBackground(section);
        }
    });
}

// Update side navigation background based on current section
function updateSideNavBackground(section) {
    if (!sideNav) return;
    
    const sectionId = section.getAttribute('id');
    const isLightSection = ['awards', 'education', 'contact', 'volunteer-intern', 'team-lead', 'athletics-coach', 'blue-shed', 'team-talons', 'community-ambassador'].includes(sectionId);
    
    if (isLightSection) {
        sideNav.classList.add('light-background');
    } else {
        sideNav.classList.remove('light-background');
    }
}

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
    
    // Update side navigation
    updateSideNav();
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Video Background Management
function initVideoBackground() {
    const video = document.querySelector('.hero-video-bg video');
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });
    }
}

// Initialize video background
initVideoBackground();

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const duration = 2000;
                const increment = parseInt(finalValue) / (duration / 16);
                let currentValue = 0;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= parseInt(finalValue)) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '') + (finalValue.includes('%') ? '%' : '');
                    }
                }, 16);
                
                observer.unobserve(target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animations
animateCounters();

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! Edward will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Optimized Intersection Observer for Performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create a single observer for all animated elements
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('highlight-item')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
            
            if (entry.target.classList.contains('award-item')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
            
            if (entry.target.classList.contains('cert-item')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
            
            if (entry.target.classList.contains('contact-item')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.highlight-item, .award-item, .cert-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        animationObserver.observe(el);
    });
});

// Hover Effects for Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.highlight-item, .award-item, .cert-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Image hover effects
    document.querySelectorAll('.hero-image, .experience-image img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
});

// Highlight Effects for Key Elements
document.addEventListener('DOMContentLoaded', () => {
    const highlights = document.querySelectorAll('.contact-icon, .cert-item i, .highlight-item h3');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', () => {
            highlight.style.transform = 'scale(1.1) rotate(5deg)';
            highlight.style.boxShadow = '0 8px 25px rgba(26, 31, 22, 0.2)';
        });
        
        highlight.addEventListener('mouseleave', () => {
            highlight.style.transform = 'scale(1) rotate(0deg)';
            highlight.style.boxShadow = 'none';
        });
    });
});

// Staggered Animation for Detail Items
function animateDetailItems() {
    const detailItems = document.querySelectorAll('.highlight-item');
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(item);
    });
}

// Initialize detail item animations
animateDetailItems();

// Content Reveal Animations with Perfect Timing
function createRevealAnimations() {
    const cards = document.querySelectorAll('.highlight-item, .award-item, .cert-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50); // Reduced delay for better timing
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(card);
    });
}

// Initialize reveal animations
createRevealAnimations();

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        console.log('Escape pressed');
    }
});

// Touch Gestures for Mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger scroll to next section
            console.log('Swipe up detected');
        } else {
            // Swipe down - could trigger scroll to previous section
            console.log('Swipe down detected');
        }
    }
}

// Scroll Throttling for Performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll progress and navbar effects are handled here
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Smooth reveal for testimonials with optimized timing
function revealTestimonials() {
    const testimonials = document.querySelectorAll('.highlight-item');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Reduced delay
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(testimonial);
    });
}

// Initialize testimonial animations
revealTestimonials();

// Dynamic content loading simulation with improved timing
function simulateContentLoading() {
    const loadingElements = document.querySelectorAll('.hero-image, .experience-image img');
    loadingElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.9)';
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, 100);
        }, index * 200); // Reduced delay
    });
}

// Initialize content loading simulation
setTimeout(simulateContentLoading, 1000);

// Performance monitoring
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrollTop;
    
    // Optimize animations based on scroll direction
    if (scrollDirection === 'down') {
        document.body.classList.add('scrolling-down');
    } else {
        document.body.classList.remove('scrolling-down');
    }
});

// Initialize all animations when page is fully loaded
window.addEventListener('load', () => {
    // Trigger all animations
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
    
    // Initialize side navigation on page load
    updateSideNav();
    
    // Preload critical images (if any)
    const criticalImages = document.querySelectorAll('img[data-src]');
    criticalImages.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            const imageLoader = new Image();
            imageLoader.onload = () => {
                img.src = src;
                img.classList.add('loaded');
            };
            imageLoader.src = src;
        }
    });
});

// Page transition effects with optimized timing
function createPageTransitions() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50); // Reduced delay
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(section);
    });
}

// Initialize page transitions
createPageTransitions();

// Enhanced animation performance
function optimizeAnimations() {
    // Use requestAnimationFrame for smooth animations
    const animateElements = () => {
        const elements = document.querySelectorAll('.highlight-item, .award-item, .cert-item');
        elements.forEach((element, index) => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(animateElements);
    });
}

// Initialize optimized animations
optimizeAnimations(); 