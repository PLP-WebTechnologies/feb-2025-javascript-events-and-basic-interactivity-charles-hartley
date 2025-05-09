// DOM loading before script.js execution
document.addEventListener("DOMContentLoaded", function() {
    // tab  functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.color = 'white';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                button.style.color = 'rgba(255, 255, 255, 0.7)';
            }
        });
    });

    // image gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const galleryCaption = document.querySelector('.gallery-caption');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    // Function to show specific image
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        galleryCaption.textContent = galleryImages[index].getAttribute('data-caption');
    }
    
    prevBtn.addEventListener('click', () => {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentImageIndex++;
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        showImage(currentImageIndex);
    });
    
    setInterval(() => {
        currentImageIndex++;
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        showImage(currentImageIndex);
    }, 5000);

    //theme color button
    const themeButton = document.getElementById('theme-button');
    const colorOptions = ['#3c6e71', '#6b4d57', '#4a7c59', '#7c4a6d', '#4a617c'];
    let colorIndex = 0;
    
    themeButton.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colorOptions.length;
        const newColor = colorOptions[colorIndex];
        
        document.documentElement.style.setProperty('--primary', newColor);
        themeButton.textContent = `Theme Changed! Click for More`;
        themeButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            themeButton.style.transform = 'scale(1)';
        }, 200);
    });

    // key events
    const keyDisplay = document.getElementById('key-display');
    
    // Listen for key presses on the entire document
    document.addEventListener('keydown', (event) => {
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
            event.preventDefault();
        }
        keyDisplay.innerHTML = `
            <strong>Key pressed:</strong> ${event.key}<br>
            <strong>Key code:</strong> ${event.code}
        `;
        keyDisplay.style.backgroundColor = '#f0f7fa';
        keyDisplay.style.boxShadow = '0 0 10px rgba(60, 110, 113, 0.5)';
        
        setTimeout(() => {
            keyDisplay.style.backgroundColor = 'white';
            keyDisplay.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }, 300);
        if (event.key.toLowerCase() === 'j') {
            const secretCode = ['j', 'a', 'm', 'i', 'i'];
            let currentIndex = 0;
            let typedKeys = [event.key.toLowerCase()];
            
            const secretCodeListener = (e) => {
                typedKeys.push(e.key.toLowerCase());
                currentIndex++;
                if (currentIndex >= secretCode.length) {
                    if (typedKeys.slice(-5).join('') === secretCode.join('')) {
                        document.getElementById('easter-egg').classList.add('active');
                        document.removeEventListener('keydown', secretCodeListener);
                    }
                }
            };

            document.addEventListener('keydown', secretCodeListener);
            setTimeout(() => {
                document.removeEventListener('keydown', secretCodeListener);
            }, 5000);
        }
    });

    // form validation
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            nameInput.style.borderColor = '#ff6b6b';
            return false;
        } else {
            nameError.style.display = 'none';
            nameInput.style.borderColor = '#4a7c59';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#ff6b6b';
            return false;
        } else {
            emailError.style.display = 'none';
            emailInput.style.borderColor = '#4a7c59';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.length < 8) {
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = '#ff6b6b';
            return false;
        } else {
            passwordError.style.display = 'none';
            passwordInput.style.borderColor = '#4a7c59';
            return true;
        }
    }

    // Form submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (isNameValid && isEmailValid && isPasswordValid) {
            formSuccess.style.display = 'block';

            contactForm.reset();
            nameInput.style.borderColor = '#ddd';
            emailInput.style.borderColor = '#ddd';
            passwordInput.style.borderColor = '#ddd';
            
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });

    // Double click easter egg
    document.addEventListener('dblclick', (event) => {
        document.getElementById('easter-egg').classList.add('active');
    });
    document.getElementById('close-easter-egg').addEventListener('click', () => {
        document.getElementById('easter-egg').classList.remove('active');
    });
    
    // long press easter egg
    let pressTimer;
    
    document.addEventListener('mousedown', (event) => {
        pressTimer = setTimeout(() => {
            document.getElementById('easter-egg').classList.add('active');
        }, 2000);
    });
    
    document.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });
    document.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });
});