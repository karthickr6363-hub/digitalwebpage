// ===== GLOBAL VARIABLES =====
let currentUser = null;
let isMenuOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupAnimations();
    setupFormHandlers();
    setupDashboard();
});

// ===== INITIALIZE APP =====
function initializeApp() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize counters
    initCounters();
    
    // Initialize testimonials carousel
    initTestimonials();
    
    // Initialize pricing toggle
    initPricingToggle();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !e.target.closest('.nav')) {
            closeMobileMenu();
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', handleScroll);

    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
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

    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Search functionality
    const searchInput = document.querySelector('#search');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// ===== NAVIGATION =====
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.nav-toggle');
    
    if (!nav || !toggle) return;

    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        nav.classList.add('active');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.nav-toggle');
    
    if (nav && toggle) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        isMenuOpen = false;
        document.body.style.overflow = '';
    }
}

// ===== SCROLL EFFECTS =====
function handleScroll() {
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    // Header background on scroll
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Show/hide scroll to top button
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    // Animate elements on scroll
    animateOnScroll();
}

function initScrollEffects() {
    // Add scroll padding for fixed header
    document.documentElement.style.scrollPaddingTop = '80px';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    addAnimationClasses();
}

function addAnimationClasses() {
    // Hero section - ensure it's visible on page load
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.classList.add('fade-in');
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateX(0)';
    }

    // Service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Testimonials
    document.querySelectorAll('.testimonial').forEach((testimonial, index) => {
        testimonial.classList.add('slide-in-left');
        testimonial.style.animationDelay = `${index * 0.2}s`;
    });

    // Pricing cards
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.15}s`;
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        if (counter.textContent.match(/\d+/)) {
            counterObserver.observe(counter);
        }
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

// ===== TESTIMONIALS CAROUSEL =====
function initTestimonials() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.testimonial');
    const totalSlides = slides.length;

    if (totalSlides <= 1) return;

    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    carousel.appendChild(dotsContainer);

    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 5000);

    function goToSlide(index) {
        currentSlide = index;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
            slide.classList.toggle('active', i === currentSlide);
        });

        // Update dots
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
}

// ===== PRICING TOGGLE =====
function initPricingToggle() {
    const toggle = document.querySelector('.pricing-toggle');
    if (!toggle) return;

    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');

    toggle.addEventListener('change', function() {
        if (this.checked) {
            // Show yearly prices
            monthlyPrices.forEach(el => el.style.display = 'none');
            yearlyPrices.forEach(el => el.style.display = 'block');
        } else {
            // Show monthly prices
            monthlyPrices.forEach(el => el.style.display = 'block');
            yearlyPrices.forEach(el => el.style.display = 'none');
        }
    });
}

// ===== FORM HANDLERS =====
function setupFormHandlers() {
    // Contact form validation
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('#newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }

    // Login form
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showNotification('Form submitted successfully!', 'success');
        }, 2000);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form data:', data);
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    console.log('Newsletter subscription:', email);
    showNotification('Successfully subscribed to our newsletter!', 'success');
    e.target.reset();
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Mock authentication
    if (data.email && data.password) {
        currentUser = {
            id: 1,
            email: data.email,
            name: 'John Doe'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Login successful!', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }
    
    console.log('Registration data:', data);
    showNotification('Registration successful! Please log in.', 'success');
    e.target.reset();
}

// ===== AUTHENTICATION =====
function checkAuthStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateAuthUI();
    }
}

function updateAuthUI() {
    const loginBtn = document.querySelector('.login-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (currentUser) {
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
        if (userMenu) {
            userMenu.style.display = 'block';
            userMenu.querySelector('.user-name').textContent = currentUser.name;
        }
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully.', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ===== DASHBOARD =====
function setupDashboard() {
    if (!document.body.classList.contains('dashboard-page')) return;
    
    loadDashboardData();
    setupDashboardFilters();
    setupChartAnimations();
}

function loadDashboardData() {
    // Mock dashboard data
    const dashboardData = {
        totalClients: 156,
        activeCampaigns: 23,
        monthlyRevenue: 45000,
        conversionRate: 12.5
    };

    // Update metrics
    Object.keys(dashboardData).forEach(key => {
        const element = document.querySelector(`[data-metric="${key}"]`);
        if (element) {
            element.textContent = dashboardData[key];
        }
    });
}

function setupDashboardFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterDashboardContent(filter);
        });
    });
}

function filterDashboardContent(filter) {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupChartAnimations() {
    const charts = document.querySelectorAll('.chart');
    
    charts.forEach(chart => {
        const bars = chart.querySelectorAll('.chart-bar');
        
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = bar.dataset.value + '%';
            }, index * 100);
        });
    });
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const searchResults = document.querySelector('.search-results');
    
    if (!searchResults) return;
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    // Mock search results
    const results = [
        'SEO Optimization Services',
        'Social Media Marketing',
        'Google Ads Campaigns',
        'Content Marketing Strategy',
        'Email Marketing Automation'
    ].filter(item => item.toLowerCase().includes(query));
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
    } else {
        searchResults.innerHTML = results.map(result => 
            `<div class="search-result-item">${result}</div>`
        ).join('');
    }
    
    searchResults.style.display = 'block';
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// ===== PERFORMANCE MONITORING =====
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
            }, 0);
        });
    }
}

// ===== INITIALIZE PERFORMANCE TRACKING =====
trackPerformance();

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        handleScroll,
        showNotification,
        debounce,
        throttle
    };
}

