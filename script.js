document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       CURSOR GLOW EFFECT
    ======================================== */
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    /* ========================================
       HEADER TRANSFORMATION ON SCROLL
    ======================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ========================================
       MOBILE NAVIGATION HAMBURGER
    ======================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    /* ========================================
       MANUAL IMAGE SLIDER (CREATIONS)
    ======================================== */
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = sliderTrack ? sliderTrack.querySelectorAll('.slide') : [];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDotsContainer = document.getElementById('sliderDots');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    if (totalSlides > 0 && sliderTrack) {
        // Create Dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetAutoSlide();
            });
            sliderDotsContainer.appendChild(dot);
        });

        const dots = sliderDotsContainer.querySelectorAll('.dot');

        function updateSlidePosition() {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach((slide, idx) => {
                if (idx === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlidePosition();
        }

        function prevSlideFunc() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlidePosition();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlidePosition();
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlideFunc(); resetAutoSlide(); });

        // Auto slide change
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Pause on interaction
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            sliderContainer.addEventListener('mouseleave', () => startAutoSlide());
        }

        startAutoSlide();
    }

    /* ========================================
       RESERVATION FORM HANDLING
    ======================================== */
    const reservationForm = document.getElementById('reservationForm');
    const resSuccessMessage = document.getElementById('resSuccessMessage');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            reservationForm.style.display = 'none';
            if (resSuccessMessage) {
                resSuccessMessage.style.display = 'block';
            }
        });
    }

    /* ========================================
       FAQ ACCORDION
    ======================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    /* ========================================
       REUSABLE MAGNETIC MOUSE INTERACTION
    ======================================== */
    const magneticElements = document.querySelectorAll('.magnetic, .magnetic-card, .magnetic-item');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            elem.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            
            if (elem.classList.contains('magnetic-card') || elem.classList.contains('magnetic-item')) {
                const rotX = -y * 0.05;
                const rotY = x * 0.05;
                elem.style.transform += ` perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0px, 0px) perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    /* ========================================
       SCROLL ANIMATIONS (IntersectionObserver)
    ======================================== */
    const animElements = document.querySelectorAll('.animate-fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        observer.observe(el);
    });

});
