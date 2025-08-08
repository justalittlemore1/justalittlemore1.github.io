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
const sideNav = document.querySelector('.side-nav');
const sideNavLinks = document.querySelectorAll('.side-nav-link');
const subNavLinks = document.querySelectorAll('.sub-nav-link');
const sections = document.querySelectorAll('section[id]');
const menuToggle = document.createElement('button');

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
            // Close nav on mobile after click
            if (window.innerWidth <= 1200) {
                sideNav.classList.remove('active');
            }
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
                const parentItem = correspondingNavLink.closest('.side-nav-item');
                if (parentItem) {
                    parentItem.classList.add('active');
                }
            }
            if (correspondingSubNavLink) {
                correspondingSubNavLink.classList.add('active');
                const parentItem = correspondingSubNavLink.closest('.side-nav-item');
                if (parentItem) {
                    parentItem.classList.add('active');
                }
            }
            
            updateSideNavBackground(section);
        }
    });
}

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

animateCounters();

// Hamburger Menu for Mobile
function setupHamburgerMenu() {
    menuToggle.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;
    menuToggle.className = 'hamburger-menu';
    document.body.appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        sideNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Initialize all animations and interactive elements
function init() {
    updateSideNav();
    createPageTransitions();
    optimizeAnimations();
    if (window.innerWidth <= 1200) {
        setupHamburgerMenu();
    }
}

window.addEventListener('load', init);
window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
        if (document.querySelector('.hamburger-menu')) {
            document.querySelector('.hamburger-menu').remove();
        }
        sideNav.classList.remove('active');
    } else {
        if (!document.querySelector('.hamburger-menu')) {
            setupHamburgerMenu();
        }
    }
});

// Placeholder for functions from the original script that might be needed
function createPageTransitions() { /* ... */ }
function optimizeAnimations() { /* ... */ }