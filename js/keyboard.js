let currentInput = null;
let isCapsLock = false;

document.addEventListener('DOMContentLoaded', function () {
    // Attach focus events — tracks which input the keyboard should type into
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

    // Update displayed key labels
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
    // Robust recovery: if currentInput is null or has been removed from the DOM, recover it
    if (!currentInput || !document.body.contains(currentInput)) {
        // 1. Try the currently focused element
        const ae = document.activeElement;
        if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA') &&
            ae.getAttribute('type') !== 'button' && ae.getAttribute('type') !== 'submit') {
            currentInput = ae;
        } else {
            // 2. Fall back to known inputs in priority order
            currentInput =
                document.getElementById('chatbot-input') ||
                document.getElementById('chatbot-apikey-input') ||
                document.getElementById('search-input');
        }
    }

    if (!currentInput) return;

    if (key === 'BACKSPACE') {
        const val = currentInput.value;
        const start = currentInput.selectionStart;
        const end = currentInput.selectionEnd;
        if (start !== undefined && start !== end) {
            // Delete selected text
            currentInput.value = val.slice(0, start) + val.slice(end);
            currentInput.selectionStart = currentInput.selectionEnd = start;
        } else {
            currentInput.value = val.slice(0, -1);
        }
    } else if (key === 'SPACE') {
        currentInput.value += ' ';
    } else if (key === 'ENTER') {
        if (currentInput.id === 'chatbot-input' && typeof sendChatbotMessage === 'function') {
            sendChatbotMessage();
            // Keep keyboard open — user may want to send more messages
        } else if (currentInput.id === 'chatbot-apikey-input' && typeof applyApiKey === 'function') {
            applyApiKey();
        } else if (currentInput.id === 'search-input' && typeof performSearch === 'function') {
            performSearch();
            closeKeyboard();
        } else {
            closeKeyboard();
        }
    } else {
        let char = key;
        if (char.length === 1 && /[a-zA-Z]/.test(char)) {
            char = isCapsLock ? char.toUpperCase() : char.toLowerCase();
        }
        currentInput.value += char;
    }

    // Fire an input event so live search / chat updates
    currentInput.dispatchEvent(new Event('input', { bubbles: true }));
}
