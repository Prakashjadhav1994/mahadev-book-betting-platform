// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    try {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Toggle menu icon
                const menuIcon = mobileMenuButton.querySelector('i');
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    const menuIcon = mobileMenuButton.querySelector('i');
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }

    // FAQ Accordion functionality
    try {
        const faqItems = document.querySelectorAll('.faq button');
        
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const content = item.nextElementSibling;
                const icon = item.querySelector('i');

                // Toggle current FAQ
                content.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }

                // Close other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.nextElementSibling;
                        const otherIcon = otherItem.querySelector('i');
                        
                        otherContent.classList.add('hidden');
                        if (otherIcon) {
                            otherIcon.classList.remove('rotate-180');
                        }
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error initializing FAQ accordion:', error);
    }

    // Smooth scroll for anchor links
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        const menuIcon = document.querySelector('#mobile-menu-button i');
                        if (menuIcon) {
                            menuIcon.classList.add('fa-bars');
                            menuIcon.classList.remove('fa-times');
                        }
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scroll:', error);
    }

    // Add animation class to WhatsApp button
    try {
        const whatsappButton = document.querySelector('a[href*="wa.link"]');
        if (whatsappButton) {
            whatsappButton.classList.add('whatsapp-btn');
        }
    } catch (error) {
        console.error('Error initializing WhatsApp button:', error);
    }

    // Intersection Observer for animate-on-scroll elements
    try {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    } catch (error) {
        console.error('Error initializing Intersection Observer:', error);
    }

    // Form validation for contact/registration forms
    try {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Reset previous error states
                form.querySelectorAll('.error-message').forEach(error => error.remove());
                form.querySelectorAll('.error-input').forEach(input => {
                    input.classList.remove('error-input');
                });

                let isValid = true;
                
                // Validate required fields
                form.querySelectorAll('[required]').forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error-input');
                        const errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMessage);
                    }
                });

                // Validate email fields
                form.querySelectorAll('input[type="email"]').forEach(email => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (email.value && !emailRegex.test(email.value)) {
                        isValid = false;
                        email.classList.add('error-input');
                        const errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
                        errorMessage.textContent = 'Please enter a valid email address';
                        email.parentNode.appendChild(errorMessage);
                    }
                });

                if (isValid) {
                    // Handle form submission
                    console.log('Form submitted successfully');
                    // Add your form submission logic here
                }
            });
        });
    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
});

// Utility function to handle API calls (if needed)
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}
