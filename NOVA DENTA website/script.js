// Smooth scrolling for navigation links
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

// Appointment form handling
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            service: this.querySelector('select').value,
            date: this.querySelector('input[type="date"]').value,
            notes: this.querySelector('textarea').value
        };
        
        // Show success message
        alert(`Rahmat, ${data.name}! Sizning vaqt belgilash so'rovingiz qabul qilindi. Biz tez orada sizga bog'lanamiz.`);
        
        // Reset form
        this.reset();
    });
}

// Service details toggle on click
const serviceDetailsMap = {
    'general': {
        title: 'Umumiy Stomatologiya',
        description: 'Bonus tekshiruvlar, proflaktika, tish tozalash va yoriqlarni davolash.',
        price: 'UZS 200,000 - 400,000',
        detail: 'Omonat yondashuvlar va habitatsiya rejasi bilan ogʻiz sogʻligʻini mustahkamlash.'
    },
    'cosmetic': {
        title: 'Kosmetik Stomatologiya',
        description: 'Oqartirish, vinirlar, bolqishlarni toʻgʻrilash va estetik dizayn.',
        price: 'UZS 800,000 - 2,500,000',
        detail: 'Sizga moslashtirilgan tabassum dizayni va yuqori sifatli materiallar bilan natijalar.'
    },
    'implants': {
        title: 'Implantlar',
        description: 'Tish implantatsiyasi, sinov, ogʻriqsiz yondashuv.',
        price: 'UZS 3,000,000 - 6,500,000',
        detail: 'Tayyorlash, oʻrnatish va keyingi parvarish uchun toʻliq paket.'
    },
    'orthodontics': {
        title: 'Ortopediya',
        description: 'Breyketlar, alaynular, korreksiya usullari.',
        price: 'UZS 1,500,000 - 4,500,000',
        detail: 'Raqamli diagnostika va shaxsiy mos dastur bilan toʻliq tekislash.'
    },
    'root-canal': {
        title: 'Ildiz Kanal Terapiyasi',
        description: 'Endodontik davolash, ilgʻor apparatlar bilan zararsiz ishlov berish.',
        price: 'UZS 500,000 - 1,200,000',
        detail: 'Noqulaylikni kamaytirish va tishni saqlashga yoʻnaltirilgan professional yondashuv.'
    },
    'pediatric': {
        title: 'Bolalar Stomatologiyasi',
        description: 'Oʻgʻil-qizlar uchun moslashgan tekshiruvlar va shirin emas yondashuv.',
        price: 'UZS 150,000 - 350,000',
        detail: 'Bola doʻstona kabinet va keksa toʻliq profilaktika rejasi.'
    }
};

let currentActive = null;

function closeOpenServiceDetails() {
    document.querySelectorAll('.service-card.expanded').forEach(openCard => {
        openCard.classList.remove('expanded');
        const existing = openCard.querySelector('.service-details');
        if (existing) {
            existing.remove();
        }
    });
    currentActive = null;
}

document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.getAttribute('data-service');
        const item = serviceDetailsMap[key];
        if (!item) return;

        if (currentActive === key) {
            closeOpenServiceDetails();
            return;
        }

        closeOpenServiceDetails();

        card.classList.add('expanded');
        currentActive = key;

        const details = document.createElement('div');
        details.className = 'service-details';
        details.innerHTML = `
            <h4>${item.title} - Qo'shimcha ma'lumot</h4>
            <p><strong>Ta'rif:</strong> ${item.description}</p>
            <p>${item.detail}</p>
            <p class="price">Narx: ${item.price}</p>
            <a href="#contact" class="service-cta">Ko'rikga yozilish</a>
        `;

        card.appendChild(details);

        details.querySelector('.service-cta').addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#contact');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            closeOpenServiceDetails();
        });
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, team members, and blog posts
document.querySelectorAll('.service-card, .team-member, .blog-post, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (for future mobile menu)
const mobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu.style.display === 'none' || navMenu.style.display === '') {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
};

// Add active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
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

// Add some CSS for active links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);