document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления элементов при скроллинге
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Наблюдаем за секциями для анимации
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Наблюдаем за checkpoints для анимации дорожной карты
    document.querySelectorAll('.checkpoint').forEach(checkpoint => {
        checkpoint.classList.add('fade-in');
        observer.observe(checkpoint);
    });

    // Наблюдаем за карточками водителей для анимации
    document.querySelectorAll('.driver-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Наблюдаем за токеномикой для анимации
    document.querySelectorAll('.token-stat').forEach(stat => {
        stat.classList.add('fade-in');
        observer.observe(stat);
    });

    // Добавляем плавный эффект ховера для всех интерактивных элементов
    document.querySelectorAll('.driver-card, .checkpoint, .token-stat, .cta-button, .link-button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            playHoverSound();
        });
    });

    // Добавляем неоновые частицы на фон
    createParticles();

    // Добавляем эффект параллакса
    document.addEventListener('mousemove', parallaxEffect);
});

// Функция для проигрывания звука при наведении (без аудио, только эффект)
function playHoverSound() {
    // Можно добавить звук в будущем
}

// Функция для создания неоновых частиц
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Рандомный размер
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Рандомная позиция
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Рандомный цвет
        const colors = ['#ff00ff', '#00ffff', '#9d00ff', '#00ff66'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Рандомная анимация
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Эффект параллакса для элементов
function parallaxEffect(e) {
    const parallaxElements = document.querySelectorAll('.logo-container, .section-title, .digital-racetrack');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.05;
        const x = (window.innerWidth / 2 - e.pageX) * speed;
        const y = (window.innerHeight / 2 - e.pageY) * speed;
        
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .particles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
    
    .particle {
        position: absolute;
        border-radius: 50%;
        opacity: 0.5;
        box-shadow: 0 0 10px currentColor;
        animation: float-particle linear infinite;
    }
    
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Функция для анимации печатающегося текста
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '2px solid var(--neon-blue)';
    
    let charIndex = 0;
    function typeText() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        } else {
            typingText.style.borderRight = 'none';
        }
    }
    
    // Запускаем анимацию печати с задержкой
    setTimeout(typeText, 1000);
}

// Добавляем паралакс-эффект при скролле
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Паралакс для фона
    document.body.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    
    // Эффект параллакса для разных элементов
    document.querySelectorAll('.banner, .intro, .garage, .tokenomics, .roadmap, .community').forEach((section, index) => {
        const speed = 0.2 * (index + 1);
        const yPos = -(scrollY * speed / 10);
        section.style.backgroundPosition = `center ${yPos}px`;
    });
}); 