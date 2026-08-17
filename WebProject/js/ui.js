/* ======================================
   مكتبة إدارة واجهة المستخدم
   ====================================== */

const UI = {
    // تحديث النصوص في عنصر معين
    setText: function(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
            log(`تم تحديث النص في: ${selector}`);
        }
    },

    // الحصول على قيمة input
    getValue: function(selector) {
        const element = document.querySelector(selector);
        return element ? element.value : null;
    },

    // تعيين قيمة input
    setValue: function(selector, value) {
        const element = document.querySelector(selector);
        if (element) {
            element.value = value;
            log(`تم تعيين القيمة في: ${selector}`);
        }
    },

    // إظهار عنصر
    show: function(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = '';
            el.classList.remove('hidden');
        });
    },

    // إخفاء عنصر
    hide: function(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none';
            el.classList.add('hidden');
        });
    },

    // تبديل رؤية عنصر
    toggle: function(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.style.display === 'none' || !el.style.display) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    },

    // إضافة فئة CSS
    addClass: function(selector, className) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.classList.add(className));
    },

    // إزالة فئة CSS
    removeClass: function(selector, className) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.classList.remove(className));
    },

    // تبديل فئة CSS
    toggleClass: function(selector, className) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.classList.toggle(className));
    },

    // التحقق من وجود فئة
    hasClass: function(selector, className) {
        const element = document.querySelector(selector);
        return element ? element.classList.contains(className) : false;
    },

    // إنشاء عنصر جديد
    createElement: function(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'class') {
                element.className = attributes[key];
            } else if (key === 'style') {
                element.style.cssText = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });

        if (content) {
            element.innerHTML = content;
        }

        return element;
    },

    // إضافة عنصر إلى الـ DOM
    append: function(parentSelector, element) {
        const parent = document.querySelector(parentSelector);
        if (parent) {
            if (typeof element === 'string') {
                parent.insertAdjacentHTML('beforeend', element);
            } else {
                parent.appendChild(element);
            }
        }
    },

    // إزالة عنصر من الـ DOM
    remove: function(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    },

    // الحصول على قيمة attribute
    getAttribute: function(selector, attribute) {
        const element = document.querySelector(selector);
        return element ? element.getAttribute(attribute) : null;
    },

    // تعيين قيمة attribute
    setAttribute: function(selector, attribute, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.setAttribute(attribute, value));
    },

    // إظهار modal
    showModal: function(content, title = 'إشعار') {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary modal-close-btn">إغلاق</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // إضافة أنماط الـ modal
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h2 {
                margin: 0;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #94a3b8;
            }
            .modal-body {
                padding: 20px;
            }
            .modal-footer {
                padding: 20px;
                border-top: 1px solid #e2e8f0;
                text-align: left;
            }
        `;
        document.head.appendChild(style);

        // أغلق الـ modal عند النقر على الزر
        const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });

        // أغلق الـ modal عند النقر خارج المحتوى
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        return modal;
    },

    // تحديث العنصر تحديثاً ديناميكياً
    update: function(selector, updates) {
        const element = document.querySelector(selector);
        if (!element) return;

        Object.keys(updates).forEach(key => {
            if (key === 'text') {
                element.textContent = updates[key];
            } else if (key === 'html') {
                element.innerHTML = updates[key];
            } else if (key === 'class') {
                element.className = updates[key];
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, updates[key]);
            } else {
                element.style[key] = updates[key];
            }
        });
    },

    // التحقق من صحة النموذج
    validateForm: function(selector) {
        const form = document.querySelector(selector);
        if (!form) return false;

        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });

        return isValid;
    },

    // الحصول على بيانات النموذج
    getFormData: function(selector) {
        const form = document.querySelector(selector);
        if (!form) return {};

        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        return data;
    },

    // تحديد النص في عنصر
    select: function(selector) {
        const element = document.querySelector(selector);
        if (element && element.select) {
            element.select();
        }
    },

    // نسخ النص من عنصر
    copy: function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const text = element.textContent || element.value;
            navigator.clipboard.writeText(text).then(() => {
                showNotification('تم نسخ النص بنجاح', 'success');
            });
        }
    }
};
