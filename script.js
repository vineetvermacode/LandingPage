// Interactive JavaScript for enhanced user experience

document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    createParticles();
    
    // Add click animations to social links
    addClickAnimations();
    
    // Add mouse tracking effect
    addMouseTracking();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add sound effects (optional)
    addSoundEffects();
});

// Create floating particles
function createParticles() {
    const container = document.querySelector('.container');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(particle);
    }
}

// Add click animations
function addClickAnimations() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add bounce effect
            this.style.transform = 'translateY(-5px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }, 100);
        });
    });
}

// Add mouse tracking effect
function addMouseTracking() {
    const container = document.querySelector('.container');
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move shapes based on mouse position
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Add parallax effect to profile card
        const profileCard = document.querySelector('.profile-card');
        const cardX = (mouseX - 0.5) * 10;
        const cardY = (mouseY - 0.5) * 10;
        
        profileCard.style.transform = `translateY(-10px) rotateX(${cardY}deg) rotateY(${cardX}deg)`;
    });
}

// Add scroll animations
function addScrollAnimations() {
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
    
    // Observe social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        link.style.transition = 'all 0.6s ease';
        observer.observe(link);
    });
}

// Add sound effects (optional)
function addSoundEffects() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Create subtle sound effect using Web Audio API
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                const audioContext = new (AudioContext || webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            }
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .social-link {
        position: relative;
        overflow: hidden;
    }
    
    .social-link:active {
        transform: translateY(-3px) scale(0.98) !important;
    }
    
    /* Enhanced hover effects */
    .social-link:hover .link-content {
        transform: translateX(5px);
    }
    
    .social-link:hover .text .platform {
        color: #4ecdc4;
        text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
    }
    
    /* Loading state */
    .loading {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .loaded {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease;
    }
    
    /* Pulse animation for profile image */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .profile-pic:hover {
        animation: pulse 2s ease-in-out infinite;
    }
    
    /* Glow effect for social links */
    .social-link:hover {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(78, 205, 196, 0.3);
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.profile-card, .social-link');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 100);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const socialLinks = document.querySelectorAll('.social-link');
    const currentIndex = Array.from(socialLinks).indexOf(document.activeElement);
    
    if (e.key === 'ArrowDown' && currentIndex < socialLinks.length - 1) {
        e.preventDefault();
        socialLinks[currentIndex + 1].focus();
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        socialLinks[currentIndex - 1].focus();
    } else if (e.key === 'Enter' && document.activeElement.classList.contains('social-link')) {
        document.activeElement.click();
    }
});

// Add focus styles for accessibility
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .social-link:focus {
        outline: 2px solid #4ecdc4;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.3);
    }
    
    .social-link:focus .icon {
        transform: scale(1.1);
    }
`;
document.head.appendChild(focusStyle);