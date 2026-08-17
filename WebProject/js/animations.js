/* ======================================
   مكتبة الحركات والرسوم المتحركة
   ====================================== */

const Animations = {
    // حركة fade في
    fadeIn: function(selector, duration = 500) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = `opacity ${duration}ms ease`;
            
            setTimeout(() => {
                el.style.opacity = '1';
            }, 10);
        });
    },

    // حركة fade خارج
    fadeOut: function(selector, duration = 500) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.transition = `opacity ${duration}ms ease`;
            el.style.opacity = '0';
        });
    },

    // حركة slide من اليمين
    slideInRight: function(selector, duration = 500) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.transform = 'translateX(100%)';
            el.style.transition = `transform ${duration}ms ease`;
            
            setTimeout(() => {
                el.style.transform = 'translateX(0)';
            }, 10);
        });
    },

    // حركة slide من اليسار
    slideInLeft: function(selector, duration = 500) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.transform = 'translateX(-100%)';
            el.style.transition = `transform ${duration}ms ease`;
            
            setTimeout(() => {
                el.style.transform = 'translateX(0)';
            }, 10);
        });
    },

    // حركة bounce
    bounce: function(selector, duration = 500) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `bounce ${duration}ms ease`;
        });

        // إضافة الـ keyframes إذا لم تكن موجودة
        if (!document.querySelector('style[data-animation="bounce"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'bounce');
            style.textContent = `
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    25% { transform: translateY(-10px); }
                    50% { transform: translateY(0); }
                    75% { transform: translateY(-5px); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // حركة pulse (نبض)
    pulse: function(selector, duration = 1000) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `pulse ${duration}ms ease-in-out infinite`;
        });

        if (!document.querySelector('style[data-animation="pulse"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'pulse');
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // حركة rotate (دوران)
    rotate: function(selector, degrees = 360, duration = 2000) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `rotate-animation ${duration}ms linear infinite`;
        });

        if (!document.querySelector('style[data-animation="rotate"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'rotate');
            style.textContent = `
                @keyframes rotate-animation {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(${degrees}deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // حركة scale (تكبير/تصغير)
    scale: function(selector, scale = 1.1, duration = 300) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.transition = `transform ${duration}ms ease`;
            el.style.transform = `scale(${scale})`;
        });
    },

    // إرجاع الحجم الأصلي
    scaleReset: function(selector, duration = 300) {
        this.scale(selector, 1, duration);
    },

    // حركة shake (اهتزاز)
    shake: function(selector, duration = 500) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `shake ${duration}ms`;
        });

        if (!document.querySelector('style[data-animation="shake"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'shake');
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // حركة heartbeat (نبض القلب)
    heartbeat: function(selector, duration = 1300) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `heartbeat ${duration}ms ease-in-out infinite`;
        });

        if (!document.querySelector('style[data-animation="heartbeat"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'heartbeat');
            style.textContent = `
                @keyframes heartbeat {
                    0% { transform: scale(1); }
                    14% { transform: scale(1.3); }
                    28% { transform: scale(1); }
                    42% { transform: scale(1.3); }
                    70% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // تأثير parallax
    parallax: function(selector, speed = 0.5) {
        const elements = document.querySelectorAll(selector);
        
        window.addEventListener('scroll', () => {
            elements.forEach(el => {
                const scrollPosition = window.pageYOffset;
                el.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    },

    // حركة wobble (اهتزاز جانبي)
    wobble: function(selector, duration = 800) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `wobble ${duration}ms`;
        });

        if (!document.querySelector('style[data-animation="wobble"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'wobble');
            style.textContent = `
                @keyframes wobble {
                    0% { transform: translateX(0); }
                    15% { transform: translateX(-5px) rotate(-2deg); }
                    30% { transform: translateX(3px) rotate(2deg); }
                    45% { transform: translateX(-3px) rotate(-2deg); }
                    60% { transform: translateX(2px) rotate(2deg); }
                    75% { transform: translateX(-1px) rotate(-1deg); }
                    100% { transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // حركة flip (قلب)
    flip: function(selector, duration = 600) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `flip ${duration}ms ease-in-out`;
        });

        if (!document.querySelector('style[data-animation="flip"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'flip');
            style.textContent = `
                @keyframes flip {
                    0% { transform: perspective(400px) rotateY(0); }
                    100% { transform: perspective(400px) rotateY(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // تأثير typing (الكتابة)
    typewriter: function(selector, text, speed = 50) {
        const element = document.querySelector(selector);
        if (!element) return;

        element.textContent = '';
        let index = 0;

        const timer = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    },

    // تأثير scroll trigger
    onScroll: function(selector, callback, threshold = 0.5) {
        const elements = document.querySelectorAll(selector);
        
        const options = {
            threshold: threshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        }, options);

        elements.forEach(el => observer.observe(el));
    },

    // حركة glow (توهج)
    glow: function(selector, duration = 2000) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.animation = `glow ${duration}ms ease-in-out infinite`;
        });

        if (!document.querySelector('style[data-animation="glow"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'glow');
            style.textContent = `
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
                    50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.8); }
                }
            `;
            document.head.appendChild(style);
        }
    }
};
