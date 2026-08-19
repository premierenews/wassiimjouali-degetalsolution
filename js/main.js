/* ==============================================
   Main JavaScript
   ============================================== */

// Configuration
const APP = {
    debug: true,
    whatsappNumber: '0696744427',
    whatsappMessage: 'Bonjour, je suis intéressé par vos services. Pouvez-vous m\'en dire plus ?'
};

// Fonction de log
function log(message, type = 'info') {
    if (!APP.debug) return;
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    log('Application démarrée');
    
    initNavigation();
    initScrollEffect();
    initSmoothScroll();
    initWhatsAppLinks();
    initMobileMenu();
});

/* ==============================================
   Navigation
   ============================================== */

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/* ==============================================
   Mobile Menu
   ============================================== */

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-menu-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/* ==============================================
   Scroll Effects
   ============================================== */

function initScrollEffect() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .service-card, .stat-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

/* ==============================================
   Smooth Scroll
   ============================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/* ==============================================
   WhatsApp Links
   ============================================== */

function initWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });
}

function openWhatsApp() {
    const phoneNumber = APP.whatsappNumber;
    const message = APP.whatsappMessage;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
    log('WhatsApp link opened');
}

/* ==============================================
   Contact Form
   ============================================== */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            // Validate form
            if (validateForm(data)) {
                // Show success message
                showNotification('Merci! Votre message a été envoyé avec succès.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Save to localStorage
                saveFormData(data);
                
                log('Contact form submitted', 'success');
            }
        });
    }
}

function validateForm(data) {
    if (!data.name || !data.email || !data.phone || !data.message) {
        showNotification('Veuillez remplir tous les champs requis.', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return false;
    }
    
    return true;
}

function saveFormData(data) {
    try {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        submissions.push({
            ...data,
            date: new Date().toISOString()
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        log('Form data saved to localStorage', 'success');
    } catch (error) {
        log('Error saving form data: ' + error.message, 'error');
    }
}

/* ==============================================
   Notifications
   ============================================== */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `
        <div class="alert-icon">
            ${getAlertIcon(type)}
        </div>
        <div>${message}</div>
    `;
    
    // Add to page
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(notification, container.firstChild);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    log(`Notification: ${message}`, type);
}

function getAlertIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

/* ==============================================
   Utilities
   ============================================== */

// Format phone number
function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '');
}

// Get current year for footer
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize on load
updateFooterYear();

// Export for use
window.APP = APP;
window.openWhatsApp = openWhatsApp;
window.showNotification = showNotification;
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const text = `السلام عليكم، عندي طلب جديد من الموقع:\n\n` +
                         `👤 *الاسم:* ${name}\n` +
                         `📧 *الإيميل:* ${email}\n` +
                         `📱 *الهاتف:* ${phone}\n` +
                         `📌 *الموضوع:* ${subject}\n` +
                         `💬 *الرسالة:* ${message}`;

            const encodedText = encodeURIComponent(text);
            const whatsappNumber = "212696744427"; 
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            window.open(whatsappURL, '_blank');
        });
    }
});