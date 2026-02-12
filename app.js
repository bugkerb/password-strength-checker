// Password Strength Checker
(function() {
    'use strict';

    // DOM Elements
    const passwordInput = document.getElementById('password');
    const toggleVisibility = document.getElementById('toggle-visibility');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    const scoreDetails = document.getElementById('score-details');

    const checkLength = document.getElementById('check-length');
    const checkLowercase = document.getElementById('check-lowercase');
    const checkUppercase = document.getElementById('check-uppercase');
    const checkNumber = document.getElementById('check-number');
    const checkSpecial = document.getElementById('check-special');

    // Password strength criteria
    const criteria = {
        minLength: 8,
        strongLength: 12,
        veryStrongLength: 16
    };

    // Calculate password strength score
    function calculateStrength(password) {
        if (!password) {
            return {
                score: 0,
                label: 'Enter a password to check',
                color: '',
                checks: {
                    length: false,
                    lowercase: false,
                    uppercase: false,
                    number: false,
                    special: false
                }
            };
        }

        let score = 0;
        const checks = {
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false
        };

        // Length check
        if (password.length >= criteria.minLength) {
            score += 20;
            checks.length = true;
            if (password.length >= criteria.strongLength) score += 10;
            if (password.length >= criteria.veryStrongLength) score += 10;
        }

        // Character type checks
        if (/[a-z]/.test(password)) {
            score += 15;
            checks.lowercase = true;
        }

        if (/[A-Z]/.test(password)) {
            score += 15;
            checks.uppercase = true;
        }

        if (/[0-9]/.test(password)) {
            score += 15;
            checks.number = true;
        }

        if (/[^a-zA-Z0-9]/.test(password)) {
            score += 15;
            checks.special = true;
        }

        // Determine label and color
        let label, color;
        if (score < 30) {
            label = 'Very Weak';
            color = 'var(--strength-weak)';
        } else if (score < 50) {
            label = 'Weak';
            color = 'var(--strength-weak)';
        } else if (score < 70) {
            label = 'Fair';
            color = 'var(--strength-fair)';
        } else if (score < 90) {
            label = 'Good';
            color = 'var(--strength-good)';
        } else {
            label = 'Strong';
            color = 'var(--strength-strong)';
        }

        return { score, label, color, checks };
    }

    // Update strength display
    function updateStrengthDisplay() {
        const password = passwordInput.value;
        const strength = calculateStrength(password);

        // Update progress bar
        strengthFill.style.width = `${strength.score}%`;
        strengthFill.style.backgroundColor = strength.color;
        strengthText.textContent = strength.label;
        strengthText.style.color = strength.color;

        // Update score details
        if (password) {
            scoreDetails.style.display = 'grid';
        } else {
            scoreDetails.style.display = 'none';
        }

        // Update check items
        updateCheckItem(checkLength, strength.checks.length, '✓', '✗');
        updateCheckItem(checkLowercase, strength.checks.lowercase, '✓', '✗');
        updateCheckItem(checkUppercase, strength.checks.uppercase, '✓', '✗');
        updateCheckItem(checkNumber, strength.checks.number, '✓', '✗');
        updateCheckItem(checkSpecial, strength.checks.special, '✓', '✗');
    }

    // Update individual check item
    function updateCheckItem(element, passed, passedIcon, missingIcon) {
        const icon = element.querySelector('.score-icon');
        if (passed) {
            element.classList.remove('missing');
            element.classList.add('present');
            icon.textContent = passedIcon;
        } else {
            element.classList.remove('present');
            element.classList.add('missing');
            icon.textContent = missingIcon;
        }
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleVisibility.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleVisibility.textContent = '👁️';
        }
        passwordInput.focus();
    }

    // Event listeners
    passwordInput.addEventListener('input', updateStrengthDisplay);
    toggleVisibility.addEventListener('click', togglePasswordVisibility);

    // Prevent form submission if in a form
    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
})();
