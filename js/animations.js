/* ==============================================
   Animations & Effects
   ============================================== */

// Smooth counter animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when section is visible
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = statsSection.querySelectorAll('[data-count]');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-count'));
                        animateCounter(counter, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
});

// Fade in animations
const fadeElements = document.querySelectorAll('[data-fade]');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    fadeObserver.observe(el);
});
