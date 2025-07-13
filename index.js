document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    overlay.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#') && 
                !this.getAttribute('href').includes(':')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    const scrollTopBtn = document.querySelector('.scroll-top');
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = header.offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - headerHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    const logo = document.querySelector('.logo h1');
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1)';
        logo.style.transition = 'transform 0.3s ease';
    });
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
    const scrollRevealOption = {
        distance: '50px',
        duration: 1000,
        easing: 'ease-in-out',
        origin: 'bottom',
        reset: false
    };
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('header', {
            ...scrollRevealOption,
            origin: 'top',
            delay: 100
        });
        
        ScrollReveal().reveal('.home-img', {
            ...scrollRevealOption, origin: 'right', delay: 200
        });
        ScrollReveal().reveal('.home-content h1', {
            ...scrollRevealOption, origin: 'left', delay: 300
        });
        ScrollReveal().reveal('.home-content p', {
            ...scrollRevealOption, origin: 'left', delay: 400
        });
        ScrollReveal().reveal('.btn-group', {
            ...scrollRevealOption, origin: 'left', delay: 500
        });
        ScrollReveal().reveal('#about h2', {
            ...scrollRevealOption, delay: 100
        });
        ScrollReveal().reveal('.about-img', {
            ...scrollRevealOption, origin: 'left', delay: 200
        });
        ScrollReveal().reveal('.about-text', {
            ...scrollRevealOption, origin: 'right', delay: 300
        });
        const sectionConfigs = {
            '#education h2': { delay: 100 },
            '.timeline-item': { interval: 200, delay: 200 },
            '#skills h2': { delay: 100 },
            '.skill-category': { interval: 200, delay: 200 },
            '#experience h2': { delay: 100 },
            '#activities h2': { delay: 100 },
            '.activity-item': { interval: 150, delay: 200 },
            '#projects h2': { delay: 100 },
            '.project-card': { interval: 200, delay: 200 },
            '#contact h2': { delay: 100 },
            '.contact-item': { interval: 150, delay: 200 },
            'footer': { delay: 100 }
        };
        
        Object.entries(sectionConfigs).forEach(([selector, config]) => {
            ScrollReveal().reveal(selector, {
                ...scrollRevealOption,
                ...config
            });
        });
    }
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            window.scrollTo(0, target.offsetTop - header.offsetHeight);
        }
    }
});