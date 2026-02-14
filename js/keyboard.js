let currentInput = null;
let isCapsLock = false;

document.addEventListener('DOMContentLoaded', function () {
    // Attach focus events
    document.body.addEventListener('focusin', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            const type = e.target.getAttribute('type');
            if (type === 'text' || type === 'number' || type === 'search' || e.target.tagName === 'TEXTAREA') {
                currentInput = e.target;
                const keyboard = document.getElementById('virtual-keyboard');
                if (keyboard) keyboard.style.display = 'block';
            }
        }
    });

    // Close keyboard when clicking outside (optional, maybe distracting if unintentional)
    /*
    document.addEventListener('click', function(e) {
        const keyboard = document.getElementById('virtual-keyboard');
        if (keyboard && keyboard.style.display === 'block') {
             if (!keyboard.contains(e.target) && e.target !== currentInput) {
                 closeKeyboard();
             }
        }
    });
    */
});

function closeKeyboard() {
    const keyboard = document.getElementById('virtual-keyboard');
    if (keyboard) keyboard.style.display = 'none';
}

function toggleCapsLock() {
    isCapsLock = !isCapsLock;
    const capsBtn = document.getElementById('caps-lock-btn');
    if (capsBtn) {
        if (isCapsLock) capsBtn.classList.add('active');
        else capsBtn.classList.remove('active');
    }

    // Update keys
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if (!key.classList.contains('special') && !key.classList.contains('space') && !key.classList.contains('close-keyboard')) {
            const char = key.textContent;
            if (char.length === 1 && /[a-zA-Z]/.test(char)) {
                key.textContent = isCapsLock ? char.toUpperCase() : char.toLowerCase();
            }
        }
    });
}

function typeKey(key) {
    if (!currentInput) return;

    if (key === 'BACKSPACE') {
        currentInput.value = currentInput.value.slice(0, -1);
    } else if (key === 'SPACE') {
        currentInput.value += ' ';
    } else if (key === 'ENTER') {
        if (currentInput.id === 'search-input' && typeof performSearch === 'function') {
            performSearch();
        }
        closeKeyboard();
    } else {
        let char = key;
        if (char.length === 1 && /[a-zA-Z]/.test(char)) {
            char = isCapsLock ? char.toUpperCase() : char.toLowerCase();
        }
        currentInput.value += char;
    }

    // Trigger input event
    currentInput.dispatchEvent(new Event('input', { bubbles: true }));
}
