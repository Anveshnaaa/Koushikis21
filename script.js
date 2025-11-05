// Add sparkle effect on cards
document.querySelectorAll('.birthday-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
    
    // Add hover sparkle effect
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Confetti effect (optional enhancement)
function createConfetti() {
    const colors = ['#1e3a8a', '#1e40af', '#3b82f6', '#c0c0c0', '#e8e8e8', '#60a5fa', '#93c5fd'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '0.8';
        
        document.body.appendChild(confetti);
        
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        
        confetti.style.animation = `confettiFall ${animationDuration}s ease-in ${animationDelay}s forwards`;
        
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + animationDelay) * 1000);
    }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});

// Progress tracking functions
function getViewedCards() {
    const viewed = localStorage.getItem('viewedCards');
    return viewed ? JSON.parse(viewed) : [];
}

function markCardAsViewed(cardNumber) {
    const viewed = getViewedCards();
    if (!viewed.includes(cardNumber)) {
        viewed.push(cardNumber);
        localStorage.setItem('viewedCards', JSON.stringify(viewed));
    }
}

function updateProgressBar() {
    const viewed = getViewedCards();
    const totalCards = 21;
    const viewedCount = viewed.length;
    const percentage = (viewedCount / totalCards) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const progressNumber = document.getElementById('progressNumber');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    if (progressNumber) {
        progressNumber.textContent = viewedCount;
    }
    
    // Mark viewed cards with visual indicator
    document.querySelectorAll('.birthday-card').forEach((card, index) => {
        const cardNumber = index + 1;
        if (viewed.includes(cardNumber)) {
            card.classList.add('viewed');
            card.style.opacity = '0.8';
        }
    });
}

// Update progress bar on main page load and when returning to page
if (document.getElementById('progressFill')) {
    updateProgressBar();
    
    // Refresh progress when page becomes visible (returning from card page)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateProgressBar();
        }
    });
    
    // Also update on focus
    window.addEventListener('focus', updateProgressBar);
}

// Mark cards as viewed when clicked (before navigation)
document.querySelectorAll('.birthday-card').forEach((card, index) => {
    card.addEventListener('click', function(e) {
        const cardNumber = index + 1;
        markCardAsViewed(cardNumber);
    });
});

// Simple Carousel
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    if (carousels.length === 0) return;
    
    carousels.forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const dotsContainer = document.getElementById(carousel.id + 'Dots') || carousel.parentElement.querySelector('.carousel-dots');
        let index = 0;

        // Build dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            });
        }

        const update = () => {
            track.style.transform = `translateX(-${index * 100}%)`;
            if (dotsContainer) {
                Array.from(dotsContainer.children).forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
            // Notify listeners which slide is active for this carousel
            document.dispatchEvent(new CustomEvent('carouselChange', { detail: { id: carousel.id, index } }));
        };

        const goTo = (i) => {
            index = (i + slides.length) % slides.length;
            update();
        };

        prevBtn?.addEventListener('click', () => goTo(index - 1));
        nextBtn?.addEventListener('click', () => goTo(index + 1));

        // Keyboard navigation when carousel is in view
        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goTo(index - 1);
            if (e.key === 'ArrowRight') goTo(index + 1);
        });

        // Touch support
        let startX = 0;
        let delta = 0;
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        track.addEventListener('touchmove', (e) => {
            delta = e.touches[0].clientX - startX;
        }, { passive: true });
        track.addEventListener('touchend', () => {
            if (Math.abs(delta) > 40) {
                if (delta > 0) goTo(index - 1); else goTo(index + 1);
            }
            delta = 0;
        });

        update();
    });
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
} else {
    initCarousels();
}