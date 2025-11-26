// ===================================
// ARCHITECTURE PORTFOLIO WEBSITE
// Main JavaScript File
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate menu toggle icon
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // SCROLL ANIMATIONS (Fade In)
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // FLOATING ABOUT CARD ANIMATION
    // ===================================
    const aboutCard = document.querySelector('.about-card');

    if (aboutCard) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const aboutSection = document.querySelector('.about-floating');

            if (aboutSection) {
                const sectionTop = aboutSection.offsetTop;
                const sectionHeight = aboutSection.offsetHeight;
                const windowHeight = window.innerHeight;

                // Calculate scroll progress through the about section
                const scrollProgress = (scrolled - sectionTop + windowHeight) / (sectionHeight + windowHeight);

                // Apply floating effect when in view
                if (scrollProgress > 0.2 && scrollProgress < 1.2) {
                    const floatAmount = Math.sin(scrollProgress * Math.PI) * 20;
                    aboutCard.style.transform = `translateY(${-floatAmount}px)`;
                    aboutCard.classList.add('float-up');
                } else {
                    aboutCard.style.transform = 'translateY(0)';
                }
            }
        });
    }

    // ===================================
    // PORTFOLIO ITEMS HOVER EFFECT
    // ===================================
    const portfolioItems = document.querySelectorAll('.portfolio-item, .masonry-item');

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });

    // ===================================
    // LIGHTBOX FOR FULL-SCREEN IMAGES
    // ===================================

    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Full size image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Add click event to all portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox when clicking close button
    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close lightbox when clicking on the background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===================================
    // CONTACT FORM HANDLING
    // ===================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Form message element
            const formMessage = document.getElementById('formMessage');

            // Basic validation
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.style.color = '#ff7b00';
                formMessage.style.display = 'block';
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = '#ff7b00';
                formMessage.style.display = 'block';
                return;
            }

            // Simulate form submission (replace with actual backend call)
            formMessage.textContent = 'Sending your message...';
            formMessage.style.color = '#6ec1e4';
            formMessage.style.display = 'block';

            // Simulate successful submission after 1.5 seconds
            setTimeout(function() {
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
                formMessage.style.color = '#6ec1e4';
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);

            // In a real application, you would send the data to a server here:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.textContent = 'Thank you! Your message has been sent.';
                    formMessage.style.color = '#6ec1e4';
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                    formMessage.style.color = '#ff7b00';
                }
                formMessage.style.display = 'block';
            })
            .catch(error => {
                formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                formMessage.style.color = '#ff7b00';
                formMessage.style.display = 'block';
            });
            */
        });
    }

    // ===================================
    // STAGGERED ANIMATION FOR GRID ITEMS
    // ===================================
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (portfolioGrid) {
        const gridItems = portfolioGrid.querySelectorAll('.portfolio-item');

        gridItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // ===================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ===================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksArray = document.querySelectorAll('.nav-links a');

    navLinksArray.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Remove active class from all links
        link.classList.remove('active');

        // Add active class to current page link
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===================================
    // IMAGE LOADING OPTIMIZATION
    // ===================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================

    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle any resize-specific logic here
            console.log('Window resized');
        }, 250);
    });

    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    console.log('%c Lefort Associates ', 'background: #ff7b00; color: #000; font-size: 20px; padding: 10px;');
    console.log('%c Architecture & Design Portfolio Website ', 'background: #6ec1e4; color: #000; font-size: 14px; padding: 5px;');

});

// ===================================
// UTILITIES
// ===================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}
