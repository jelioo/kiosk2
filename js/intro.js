// ============================================================
// ANIMATED INTRO TUTORIAL
// Shows a step-by-step intro guide when the page first loads
// ============================================================

const INTRO_STEPS = [
    {
        icon: "🔍",
        title: "Search",
        desc: "Type a room name or person in the search bar to quickly find what you need. Voice search is also available!"
    },
    {
        icon: "🗺️",
        title: "Campus Directory",
        desc: "Explore campus buildings A–D on the interactive map. Click any building to see its floors and rooms."
    },
    {
        icon: "📅",
        title: "Events",
        desc: "Stay up-to-date with upcoming school events, exams, and important dates."
    },
    {
        icon: "📰",
        title: "News",
        desc: "Read the latest school news and announcements from the News section."
    },
    {
        icon: "📊",
        title: "Survey",
        desc: "Share your feedback through our quick survey. Your opinion helps us improve!"
    },
    {
        icon: "🤖",
        title: "AI Assistant",
        desc: "Tap the graduation cap button anytime to chat with our AI school assistant for instant help."
    },
    {
        icon: "🌐",
        title: "Language",
        desc: "Switch between English and Filipino using the language toggle button at the top right."
    }
];

let currentStep = 0;

function buildIntroHTML() {
    return `
    <div class="intro-overlay" id="intro-overlay">
        <div class="intro-card" id="intro-card">
            <div class="intro-header">
                <div class="intro-logo">🎓</div>
                <h2 class="intro-title">Welcome to MHS Smart Kiosk</h2>
                <p class="intro-subtitle">Here's a quick guide to get you started</p>
            </div>

            <div class="intro-steps" id="intro-steps">
                ${INTRO_STEPS.map((step, i) => `
                <div class="intro-step" id="intro-step-${i}" style="animation-delay: ${i * 0.12 + 0.3}s">
                    <div class="intro-step-icon">${step.icon}</div>
                    <div class="intro-step-body">
                        <div class="intro-step-title">${step.title}</div>
                        <div class="intro-step-desc">${step.desc}</div>
                    </div>
                </div>`).join('')}
            </div>

            <div class="intro-footer">
                <button class="intro-btn" id="intro-skip-btn" onclick="closeIntro()">
                    Got it! Let's explore ✨
                </button>
                <p class="intro-note">This guide won't show again on your next visit.</p>
            </div>
        </div>
    </div>`;
}

function closeIntro() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;
    overlay.classList.add('intro-fade-out');
    setTimeout(() => {
        overlay.remove();
    }, 600);
    try { localStorage.setItem('mhs_intro_seen', '1'); } catch (e) { }
}

function initIntro() {
    // Check if user has seen the intro before
    let seen = false;
    try { seen = localStorage.getItem('mhs_intro_seen') === '1'; } catch (e) { }
    if (seen) return;

    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', buildIntroHTML());

    // Animate steps in sequence
    INTRO_STEPS.forEach((_, i) => {
        const el = document.getElementById(`intro-step-${i}`);
        if (el) {
            setTimeout(() => {
                el.classList.add('intro-step-visible');
            }, 500 + i * 140);
        }
    });
}

// Launch after page fully loads
window.addEventListener('load', () => {
    setTimeout(initIntro, 400);
});
