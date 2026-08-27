document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL OBSERVER CONFIGURATION
    const observerOptions = {
        threshold: 0.15, // Wait until 15% of the card is visible
        rootMargin: "0px 0px -40px 0px" // Trigger slightly before it hits the bottom
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Trigger the CSS slide & bounce animation
                el.classList.add('active');
                
                // Wait 400ms for the card to slide in before starting the typing effect
                setTimeout(() => {
                    startTypingInContainer(el);
                }, 400); 

                // DOUBLE LOCK: Stop watching the element so animations never repeat or glitch
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Grab all elements with directional reveal classes and observe them
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    animatedElements.forEach(el => revealObserver.observe(el));

    // 2. GLITCH-FREE TYPING ENGINE
    function startTypingInContainer(container) {
        const typeElements = container.querySelectorAll('.tech-type');
        
        typeElements.forEach((el, index) => {
            // THE LOCK: If this element is already typing or finished, abort immediately
            if (el.dataset.isTyping === "true" || el.classList.contains('typed-done')) {
                return; 
            }

            const textToType = el.getAttribute('data-text');
            if (!textToType) return;

            // Engage the lock
            el.dataset.isTyping = "true";
            
            // Clear innerHTML exactly once to remove placeholder text
            el.innerHTML = '';
            el.classList.add('type-ready');
            
            // Stagger multiple headings inside the same card
            setTimeout(() => {
                let i = 0;
                
                function typeChar() {
                    if (i < textToType.length) {
                        el.innerHTML += textToType.charAt(i);
                        i++;
                        
                        // Humanized variable typing speed (between 30ms and 70ms)
                        const randomSpeed = Math.floor(Math.random() * 40) + 30;
                        setTimeout(typeChar, randomSpeed);
                    } else {
                        // Cleanup when finished
                        el.classList.remove('type-ready');
                        el.classList.add('typed-done');
                        el.dataset.isTyping = "false"; 
                    }
                }
                
                // Start typing the first character
                typeChar();
                
            }, index * 400); // 400ms delay between different text blocks starting
        });
    }

    // 3. EMERGENCY FAIL-SAFE
    // Ensures content loads if user is on a massive monitor or scroll breaks
    setTimeout(() => {
        animatedElements.forEach(el => {
            if (!el.classList.contains('active')) {
                el.classList.add('active');
                startTypingInContainer(el);
            }
        });
    }, 2500);

    // 4. MOBILE NAVBAR OVERLAY LOGIC
    const mobileToggle = document.getElementById('mobile-toggle');
    const closeMenu = document.getElementById('close-menu');
    const navCollapse = document.getElementById('navbarNav');
    const navBackdrop = document.getElementById('navBackdrop');

    let scrollLockY = 0; // Remember the page position so it's restored on close

    const openMobileMenu = () => {
        if (!navCollapse) return;
        navCollapse.classList.add('active');
        mobileToggle?.classList.add('is-hidden');
        navBackdrop?.classList.add('show-open');

        // Lock the page exactly where it is so the background can't scroll underneath
        scrollLockY = window.scrollY || document.documentElement.scrollTop;
        document.body.style.top = `-${scrollLockY}px`;
        document.body.classList.add('menu-open');
    };

    const closeMobileMenu = () => {
        navCollapse?.classList.remove('active');
        mobileToggle?.classList.remove('is-hidden');
        navBackdrop?.classList.remove('show-open');

        // Unlock the page and restore the original scroll position
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollLockY);
    };

    mobileToggle?.addEventListener('click', openMobileMenu);
    closeMenu?.addEventListener('click', closeMobileMenu);
    navBackdrop?.addEventListener('click', closeMobileMenu); // Tap outside the panel to close

    // Close the menu when a link is clicked
    navCollapse?.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 5. SMART IMAGE OPTIMIZATION ENGINE
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach((img, index) => {
            // Prioritize the first image (usually Hero/Profile) for immediate fetch
            if (index === 0) {
                img.fetchPriority = "high";
            } else {
                img.loading = "lazy";
            }
        });
    };

    optimizeImages();
});