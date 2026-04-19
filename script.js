// EmailJS Config - Replace with your keys from emailjs.com
const EMAILJS_SERVICE_ID = 'service_uyr02n6';
const EMAILJS_TEMPLATE_ID_PROJECT = 'template_7cg7swe';
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_7cg7swe';
const EMAILJS_PUBLIC_KEY = 't75xSem6xvpZdIQiX';

emailjs.init(EMAILJS_PUBLIC_KEY);

// GSAP Setup - commented for NTB style
// gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
function initCursor() {
    // Disabled for NTB gov style - standard cursors only
}

// Hero Animations
function initHeroAnimations() {
    // GSAP disabled for NTB gov style
}

// Scroll Animations
function initScrollAnimations() {
    // Vanilla IntersectionObserver for subtle fade-up
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// File Preview
function initFilePreview() {
    const fileInput = document.querySelector('input[type="file"]');
    const preview = document.querySelector('.file-preview');
    
    fileInput?.addEventListener('change', (e) => {
        preview.innerHTML = '';
        Array.from(e.target.files).slice(0, 6).forEach(file => {
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                preview.appendChild(img);
            }
        });
    });
}

// Form Handling
function initForms() {
    const projectForm = document.getElementById('projectForm');
    const reviewForm = document.getElementById('reviewForm');
    
    async function submitForm(form, templateId) {
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        try {
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            const formData = new FormData(form);
            const files = formData.getAll('files');
            const filesList = files.length ? Array.from(files).map(f => f.name).join(', ') : 'None';
            const budget = formData.get('budget') || 'Not specified';
            
            const params = {
                clientName: formData.get('clientName'),
                user_email: formData.get('user_email'),
                projectDesc: formData.get('projectDesc') || formData.get('message'),
                budget: budget,
                files: filesList
            };
            
            await emailjs.send(EMAILJS_SERVICE_ID, templateId, params);
            showModal();
            form.reset();
            document.querySelector('.file-preview').innerHTML = '';
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert('Please setup EmailJS or email creatorofwebsites57@gmail.com directly');
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    }
    
    projectForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm(projectForm, EMAILJS_TEMPLATE_ID_PROJECT);
    });
    
    reviewForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        submitReview(reviewForm);
    });
}

function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    setTimeout(() => modal.classList.remove('active'), 3000);
}

function submitReview(form) {
    const formData = new FormData(form);
    const review = {
        name: formData.get('reviewName'),
        email: formData.get('reviewEmail'),
        text: formData.get('reviewText'),
        date: new Date().toLocaleDateString()
    };

    // Local storage (admin approval pending)
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.unshift({...review, pending: true});
    localStorage.setItem('reviews', JSON.stringify(reviews.slice(0,5))); // Max 5

    // Send to EmailJS
    const params = {
        reviewName: review.name,
        reviewEmail: review.email,
        reviewText: review.text
    };
    
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_PROJECT, params).catch(console.error);
    
    displayReviews();
    form.reset();
    showModal();
}

function displayReviews() {
    const container = document.getElementById('reviews-display');
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    container.innerHTML = reviews.map(r => `
        <div class="review-item ${r.pending ? 'pending' : ''}">
            <strong>${r.name}</strong> <small>${r.date}</small>
            <p>${r.text}</p>
            ${r.pending ? '<small>Pending approval</small>' : ''}
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    displayReviews();
});

document.getElementById('projectform')?.addEventListener('submit',funtion(e){
    document.getElementById('successModal').classList.remove('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    // initHeroAnimations(); // Minimal for gov style
    initScrollAnimations();
    initFilePreview();
    initForms();
    
    // Modal backdrop close
    document.getElementById('successModal')?.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
});

