// Home Page - Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }
    
    // Book Now button interactivity
    const bookNowBtns = document.querySelectorAll('.btn[href="contact.html"]');
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Book Now')) {
                e.preventDefault();
                showNotification('Redirecting to booking page...');
                setTimeout(() => {
                    window.location.href = 'contact.html';
                }, 1000);
            }
        });
    });
    
    // Animated images or entry effects
    const animatedElements = document.querySelectorAll('.service-card, .package-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Services Page - Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Facilities Page - Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    const facilityItems = document.querySelectorAll('.facility-item');
    
    facilityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(10, 60, 95, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
        
        // Add click interaction for mobile
        item.addEventListener('click', function() {
            const overlay = this.querySelector('.facility-overlay');
            if (overlay) {
                if (overlay.style.transform === 'translateY(0px)') {
                    overlay.style.transform = 'translateY(100%)';
                } else {
                    overlay.style.transform = 'translateY(0)';
                }
            }
        });
    });
});

// About Us Page - Fade-in Effects
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
});

// Contact Us Page - Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = {};
            
            // Clear previous errors
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            
            // Validate name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                formData.name = name.value.trim();
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                formData.email = email.value.trim();
            }
            
            // Validate phone (optional but if provided, should be valid)
            const phone = document.getElementById('phone');
            if (phone.value.trim()) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(phone.value.trim())) {
                    showError(phone, 'Please enter a valid phone number');
                    isValid = false;
                } else {
                    formData.phone = phone.value.trim();
                }
            }
            
            // Validate subject (optional)
            const subject = document.getElementById('subject');
            if (subject.value.trim()) {
                formData.subject = subject.value.trim();
            }
            
            // Validate message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                formData.message = message.value.trim();
            }
            
            if (isValid) {
                // Simulate form submission
                showNotification('Message sent successfully! We will contact you soon.');
                contactForm.reset();
                
                // In a real application, you would send this data to a server
                console.log('Form data:', formData);
            }
        });
    }
    
    function showError(input, message) {
        input.classList.add('error');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});

// Packages Page - Show/Hide Details and Package Selection
document.addEventListener('DOMContentLoaded', function() {
    const packageSelectBtns = document.querySelectorAll('.package-select');
    
    packageSelectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            showNotification(`You selected the ${packageName}. Redirecting to contact page...`);
            
            setTimeout(() => {
                window.location.href = 'contact.html?package=' + encodeURIComponent(packageName);
            }, 1500);
        });
    });
    
    // Add hover effects to package cards
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(10, 60, 95, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
});

// Utility Functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--light-pink);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Fredoka', sans-serif;
        font-weight: 300;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile menu toggle (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    // Insert after logo
    if (logo && logo.parentNode) {
        logo.parentNode.insertBefore(mobileMenuBtn, logo.nextSibling);
    }
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--dark-blue)';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        }
    });
    
    // Show mobile menu button on small screens
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'none';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// Preload images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src && !img.complete) {
            const tempImg = new Image();
            tempImg.onload = function() {
                img.style.opacity = '1';
            };
            tempImg.src = src;
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});
