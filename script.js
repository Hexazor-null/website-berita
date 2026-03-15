// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Search Functionality
const searchToggle = document.querySelector('.search-toggle');
const searchOverlay = document.querySelector('.search-overlay');
const closeSearch = document.querySelector('.close-search');
const searchInput = document.querySelector('.search-input');

// Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSearch();
    initNavigation();
    initBreakingNews();
    initScrollEffects();
});

// Mobile Menu
function initMobileMenu() {
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        menuToggle.classList.toggle('active');
    });
}

// Search Overlay
function initSearch() {
    searchToggle.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });

    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });

    // Search functionality
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    if (query.trim() === '') return;
    
    // Simulate search
    console.log('Searching for:', query);
    alert(`Mencari berita: "${query}"\n\nFitur pencarian lengkap akan ditambahkan!`);
    searchOverlay.classList.remove('active');
}

// Navigation
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Simulate section scroll
            const section = this.getAttribute('href').substring(1);
            scrollToSection(section);
        });
    });
}

function scrollToSection(sectionId) {
    const sections = {
        'beranda': document.querySelector('.hero'),
        'politik': document.querySelector('.category-section'),
        'ekonomi': document.querySelector('.news-main'),
        'olahraga': document.querySelector('.news-card.featured'),
        'teknologi': document.querySelector('.news-sidebar'),
        'video': document.querySelector('.footer')
    };
    
    const targetSection = sections[sectionId];
    if (targetSection) {
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Breaking News Animation
function initBreakingNews() {
    const ticker = document.querySelector('.breaking-ticker');
    
    // Duplicate content for seamless loop
    const originalContent = ticker.innerHTML;
    ticker.innerHTML += originalContent;
    
    // Pause on hover
    ticker.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    ticker.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Scroll Effects
function initScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 60, 114, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Animate cards on scroll
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

    // Observe all news cards
    document.querySelectorAll('.news-card, .news-small').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Live time update
function updateLiveTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Update relative times
    updateRelativeTimes();
}

function updateRelativeTimes() {
    const timeElements = document.querySelectorAll('.time');
    timeElements.forEach(el => {
        // Simulate dynamic time updates
        const times = ['1 menit yang lalu', '2 jam yang lalu', '5 jam yang lalu', '1 hari yang lalu'];
        el.textContent = times[Math.floor(Math.random() * times.length)];
    });
}

// Auto update every 30 seconds
setInterval(updateLiveTime, 30000);

// News ticker speed control
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        .breaking-ticker {
            animation: ticker 25s linear infinite;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);
});

// Responsive Mobile Menu CSS (injected)
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 300px;
            background: rgba(30, 60, 114, 0.98);
            flex-direction: column;
            padding-top: 80px;
            transition: right 0.3s ease;
            z-index: 1001;
        }
        
        .nav.mobile-open {
            right: 0;
        }
        
        .nav-link {
            padding: 1.5rem 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .header-actions {
            z-index: 1002;
        }
        
        .news-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .hero-image {
            height: 300px;
        }
        
        .hero-title {
            font-size: 1.5rem;
        }
        
        .news-row {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(mobileStyle);

// Easter egg: Konfeti on click hero
document.querySelector('.hero').addEventListener('click', function() {
    createConfetti();
});

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#ff6b35', '#f7931e', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 5)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'fall 3s linear forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// PWA Ready (Basic)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered');
            });
    });
}
