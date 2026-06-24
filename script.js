document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const handleScrollNavbar = () => {
        if (window.scrollY > 40) { navbar.classList.add('scrolled'); }
        else { navbar.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', handleScrollNavbar);
    handleScrollNavbar();

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    const spyScrollIndicator = () => {
        let currentSectionId = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            if (window.scrollY >= sectionTop) { currentSectionId = section.getAttribute('id'); }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) { link.classList.add('active'); }
        });
    };
    window.addEventListener('scroll', spyScrollIndicator);

    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                entry.target.querySelectorAll('.fade-right, .fade-left').forEach(el => el.classList.add('reveal-active'));
                if (entry.target.classList.contains('skills')) { animateSkillsBars(); }
                if (entry.target.classList.contains('about')) { animateStatisticsCounters(); }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    
    document.querySelectorAll('.scroll-reveal, .section-reveal').forEach(sec => revealOnScrollObserver.observe(sec));

    setTimeout(() => {
        const firstFold = document.querySelector('.section-reveal');
        if (firstFold) {
            firstFold.classList.add('reveal-active');
            firstFold.querySelectorAll('.fade-right, .fade-left').forEach(el => el.classList.add('reveal-active'));
        }
    }, 100);

    const animateSkillsBars = () => {
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress');
        });
    };

    const animateStatisticsCounters = () => {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-target'), 10);
            let startValue = 0;
            const counterInterval = setInterval(() => {
                startValue += Math.ceil(targetValue / 50);
                if (startValue >= targetValue) {
                    startValue = targetValue;
                    clearInterval(counterInterval);
                }
                counter.innerText = counter.parentElement.innerText.includes('Passion') ? `${startValue}%` : `${startValue}+`;
            }, Math.min(Math.floor(2000 / targetValue), 40));
        });
    };

    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formStatus = document.getElementById('formStatus');
        const submitBtn = e.target.querySelector('.form-submit-btn');
        const standardBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Message <i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = standardBtnText;
            formStatus.className = 'form-status-msg success';
            formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, Omar has received your message successfully!';
            e.target.reset();
            setTimeout(() => { formStatus.innerHTML = ''; formStatus.className = 'form-status-msg'; }, 6000);
        }, 1500);
    });
});