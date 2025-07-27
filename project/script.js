// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Form will be handled by Formspree
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Reset button after a delay if form submission fails
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .tech-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-image img').style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-image img').style.transform = 'scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const parallaxSpeed = 0.5;
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', () => {
    const footerText = document.querySelector('.footer-text p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${currentYear} Carlton Njong. All rights reserved.`;
    }
});

// Add smooth reveal animation for stats
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statObserver.observe(statsSection);
}

// Add click tracking for portfolio links (for analytics)
document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectName = this.closest('.portfolio-item').querySelector('h4').textContent;
        console.log(`Portfolio project clicked: ${projectName}`);
        // In a real application, you'd send this to your analytics service
    });
});

// Testimonials carousel functionality (if needed for mobile)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    if (window.innerWidth <= 768) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
}

// Initialize testimonials display for mobile
if (window.innerWidth <= 768) {
    showTestimonial(0);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'block';
        });
    } else {
        showTestimonial(currentTestimonial);
    }
});