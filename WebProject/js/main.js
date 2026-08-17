/* ======================================
   ملف JavaScript الرئيسي
   ====================================== */

// إعدادات عامة
const APP = {
    debug: true,
    version: '1.0.0'
};

// دالة تسجيل الأخطاء
function log(message, type = 'info') {
    if (APP.debug) {
        const timestamp = new Date().toLocaleTimeString('ar-SA');
        console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
    }
}

// دالة تحميل المحتوى عند جاهزية DOM
document.addEventListener('DOMContentLoaded', function() {
    log('تم تحميل الصفحة بنجاح');
    
    // تهيئة المكونات
    initNavigation();
    initCTA();
    initCounter();
    initScrollEffects();
});

/* ======================================
   إدارة شريط التنقل
   ====================================== */

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // فتح/إغلاق القائمة الجوّالة
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            log('تم تبديل قائمة الملاحة');
        });
    }

    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // تحديث الرابط النشط
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // إضافة ظل عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    log('تم تهيئة شريط التنقل');
}

/* ======================================
   زر الدعوة للعمل (CTA)
   ====================================== */

function initCTA() {
    const ctaButton = document.getElementById('ctaButton');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            log('تم النقر على زر الدعوة للعمل');
            showNotification('شكراً لاهتمامك! سنتواصل معك قريباً.', 'success');
            
            // محاكاة ملء النموذج
            setTimeout(() => {
                window.location.href = 'pages/contact.html';
            }, 1500);
        });
    }
}

/* ======================================
   عداد الإحصائيات
   ====================================== */

function initCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    if (!statsSection) return;

    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(statsSection);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ميلي ثانية
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
                log(`تم إنهاء العداد: ${target}`);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

/* ======================================
   تأثيرات التمرير
   ====================================== */

function initScrollEffects() {
    const elements = document.querySelectorAll('.feature-card, .stat, .footer-section');
    
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(el => observer.observe(el));
}

/* ======================================
   دوال مساعدة
   ====================================== */

// إظهار الإخطارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease forwards;
    `;

    // تعيين الألوان حسب النوع
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    notification.style.backgroundColor = colors[type] || colors.info;
    document.body.appendChild(notification);

    // إزالة الإخطار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);

    log(`تم إظهار إخطار: ${message}`);
}

// التحقق من الاتصال بالإنترنت
function checkConnection() {
    if (!navigator.onLine) {
        showNotification('تحقق من اتصال الإنترنت', 'error');
        log('فقدان الاتصال بالإنترنت', 'warning');
        return false;
    }
    return true;
}

// حفظ البيانات في localStorage
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        log(`تم حفظ البيانات: ${key}`);
    } catch (error) {
        log(`خطأ في حفظ البيانات: ${error.message}`, 'error');
    }
}

// استرجاع البيانات من localStorage
function getData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        log(`خطأ في استرجاع البيانات: ${error.message}`, 'error');
        return null;
    }
}

// إزالة البيانات من localStorage
function removeData(key) {
    try {
        localStorage.removeItem(key);
        log(`تم حذف البيانات: ${key}`);
    } catch (error) {
        log(`خطأ في حذف البيانات: ${error.message}`, 'error');
    }
}

// مراقبة الأخطاء العامة
window.addEventListener('error', function(event) {
    log(`خطأ: ${event.message}`, 'error');
});

window.addEventListener('unhandledrejection', function(event) {
    log(`وعد مرفوض: ${event.reason}`, 'error');
});

// تسجيل معلومات التطبيق عند التحميل
log(`تم تحميل التطبيق - الإصدار: ${APP.version}`);
