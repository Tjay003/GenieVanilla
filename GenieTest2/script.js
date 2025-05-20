
// Header scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Copy address functionality
    const copyAddressIcon = document.querySelector('.address i');
    if (copyAddressIcon) {
        copyAddressIcon.addEventListener('click', () => {
            const address = document.querySelector('.address').textContent.trim().split(' ')[0];
            navigator.clipboard.writeText(address).then(() => {
                // Show a temporary tooltip or message
                const originalTitle = copyAddressIcon.getAttribute('title');
                copyAddressIcon.setAttribute('title', 'Copied!');
                copyAddressIcon.classList.add('copied');
                
                setTimeout(() => {
                    copyAddressIcon.setAttribute('title', originalTitle || 'Copy to clipboard');
                    copyAddressIcon.classList.remove('copied');
                }, 2000);
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your backend
            // For now, we'll just show a confirmation
            newsletterForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for subscribing with ${email}!</p>
                    <p>You'll receive updates about GenieCoin soon.</p>
                </div>
            `;
        });
    }
    
    // Add magical floating particles effect
    createMagicalParticles();
});

// Magical floating particles
function createMagicalParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate
        animateParticle(particle);
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(154, 125, 255, 0.8);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(154, 125, 255, 0.8), 0 0 20px rgba(124, 77, 255, 0.4);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

function animateParticle(particle) {
    // Initial position
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    
    // Duration between 15 and 40 seconds
    const duration = Math.random() * 25000 + 15000;
    
    // Movement range
    const moveRangeX = Math.random() * 20 - 10;
    const moveRangeY = Math.random() * 20 - 10;
    
    // Start time
    const startTime = Date.now();
    
    function update() {
        const elapsedTime = Date.now() - startTime;
        const progress = elapsedTime / duration;
        
        if (progress >= 1) {
            // Reset the animation
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            animateParticle(particle);
            return;
        }
        
        // Calculate new position with sine wave for floating effect
        const x = startX + moveRangeX * Math.sin(progress * Math.PI * 2);
        const y = startY + moveRangeY * Math.sin(progress * Math.PI * 2);
        
        particle.style.left = `${x}vw`;
        particle.style.top = `${y}vh`;
        
        requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);
}