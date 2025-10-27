// Reborn Media - Main JavaScript

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.card, .process-step');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Skickar...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
            // Simulate form submission (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Tack! Vi återkommer inom 24 timmar.';
            contactForm.appendChild(successMsg);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
            
        } catch (error) {
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Något gick fel. Vänligen försök igen eller kontakta oss direkt.';
            contactForm.appendChild(errorMsg);
            
            setTimeout(() => {
                errorMsg.remove();
            }, 5000);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Booking form handling
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Skickar...';
        submitBtn.disabled = true;

        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Bokningsförfrågan mottagen! Vi kontaktar er inom kort.';
            bookingForm.appendChild(successMsg);
            
            bookingForm.reset();
            
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
            
        } catch (error) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Något gick fel. Vänligen försök igen.';
            bookingForm.appendChild(errorMsg);
            
            setTimeout(() => {
                errorMsg.remove();
            }, 5000);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Password protection for presentation page
if (window.location.pathname.includes('presentation.html')) {
    const checkPassword = () => {
        const enteredPassword = sessionStorage.getItem('presentationAccess');
        if (enteredPassword !== 'KH2025') {
            const password = prompt('Ange lösenord för att visa denna sida:');
            if (password === 'KH2025') {
                sessionStorage.setItem('presentationAccess', 'KH2025');
            } else {
                alert('Felaktigt lösenord');
                window.location.href = 'index.html';
            }
        }
    };
    checkPassword();
}

// Animate logo on load
window.addEventListener('load', () => {
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.style.animation = 'fadeInUp 1s ease-out';
    }
});

// Dynamic CTA button text on scroll
const ctaButton = document.querySelector('.cta-scroll');
if (ctaButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            ctaButton.textContent = 'Skapa något nytt';
        } else {
            ctaButton.textContent = 'Boka möte';
        }
    });
}
