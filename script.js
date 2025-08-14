document.addEventListener('DOMContentLoaded', () => {

    // --- LOADING SCREEN --- //
    const loadingScreen = document.querySelector('.loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => loadingScreen.style.display = 'none', 500);
            }
        }, 500);
    });

    // --- SMOOTH SCROLLING --- //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (sideNav.classList.contains('active')) {
                    sideNav.classList.remove('active');
                }
            }
        });
    });

    // --- SIDE NAVIGATION --- //
    const sideNav = document.querySelector('.side-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.side-nav-link, .sub-nav-link');
    const experienceSection = document.querySelector('#experience');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
        });
    }

    const updateActiveState = () => {
        let currentSectionId = '';
        const sectionTopOffset = window.innerHeight * 0.4;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - sectionTopOffset) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => link.classList.remove('active'));

        const activeLink = document.querySelector(`.side-nav a[href="#${currentSectionId}"]`);
        
        if (activeLink) {
            activeLink.classList.add('active');
            if (activeLink.classList.contains('sub-nav-link')) {
                const parentLink = activeLink.closest('.side-nav-item').querySelector('.side-nav-link');
                if(parentLink) parentLink.classList.remove('active');
            }
        }

        // Sidebar light/dark mode
        if (experienceSection && window.scrollY > experienceSection.offsetTop) {
            sideNav.classList.add('light');
        } else {
            sideNav.classList.remove('light');
        }
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveState();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateActiveState();

    // --- COUNTER ANIMATION --- //
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.innerText.replace('+', '');
                    let count = 0;

                    const updateCount = () => {
                        const increment = target / speed;
                        count += increment;

                        if (count < target) {
                            counter.innerText = Math.ceil(count) + (counter.innerText.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
                        }
                    };

                    requestAnimationFrame(updateCount);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    };

    animateCounters();

    // --- FADE-IN ANIMATIONS ON SCROLL --- //
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                aosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.experience-content, .award-item-major, .award-item, .education-card, .cert-item, .contact-item, .social-link').forEach(el => {
        el.setAttribute('data-aos', '');
        aosObserver.observe(el);
    });
});
