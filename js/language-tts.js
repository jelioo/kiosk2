// Language Toggle and TTS System

// Global language state
let currentLang = localStorage.getItem('kioskLanguage') || 'en';
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Translation database
const translations = {
    en: {
        school_name: "Makati High School",
        subtitle: "Smart Kiosk - Enhanced Navigation & Information System",
        welcome: "Welcome to Makati High School",
        search_placeholder: "Search for rooms, people...",
        nav: {
            home: "Home",
            directory: "Campus Directory",
            events: "Events",
            about: "About Us",
            news: "News",
            survey: "Survey",
            help: "Help"
        },
        headers: {
            upcoming_events: "Upcoming Events",
            announcements: "Announcements",
            campus_directory: "Campus Directory",
            search_results: "Search Result",
            no_results: "No Results Found",
            navigation: "Navigation",
            directions: "Directions",
            staff_directory: "Complete Staff Directory",
            campus_news: "Campus News",
            ai_assistant: "AI Assistant",
            help_center: "Help Center",
            user_guide: "User Guide",
            faq: "FAQ"
        },
        buttons: {
            back: "Back",
            done: "Done",
            search_again: "Search Again",
            tap_directions: "Tap for Directions",
            play_audio: "Play Audio",
            stop_audio: "Stop Audio",
            back_to_directory: "Back to Directory",
            see_all: "See All",
            close: "Close",
            submit_survey: "Submit Survey",
            specific_rooms: "Specific Rooms",
            back_to: "Back to"
        },
        assistant: {
            title: "School Assistant",
            greeting: "How can I help you today?",
            navigate: "Navigate Rooms",
            events: "View Events",
            announcements: "Read Announcements",
            call: "Call School",
            directory: "Staff Directory",
            chatbot: "Chat with AI"
        },
        labels: {
            floor: "Floor",
            room: "Room",
            building: "Building",
            select_building: "Select a building to view detailed locations",
            tap_to_view: "Tap to view",
            tap_office: "Tap an office to locate it",
            show_path: "Show path from Kiosk to",
            we_could_not_find: "We could not find",
            search_tips: "The item you are looking for is not found in our database. Please check the spelling or try searching for major facilities like 'Library', 'Clinic', or 'Canteen'.",
            loading: "Loading..."
        }
    },
    tl: {
        school_name: "Mataas na Paaralang Makati",
        subtitle: "Matalinong Kiosko - Pinalakas na Sistema ng Nabigasyon at Impormasyon",
        welcome: "Maligayang Pagdating sa Mataas na Paaralang Makati",
        search_placeholder: "Maghanap ng silid, tao...",
        nav: {
            home: "Tahanan",
            directory: "Direktoryo ng Kampus",
            events: "Mga Kaganapan",
            about: "Tungkol sa Amin",
            news: "Balita",
            survey: "Sarbey",
            help: "Tulong"
        },
        headers: {
            upcoming_events: "Mga Paparating na Kaganapan",
            announcements: "Mga Anunsyo",
            campus_directory: "Direktoryo ng Kampus",
            search_results: "Resulta ng Paghahanap",
            no_results: "Walang Nakitang Resulta",
            navigation: "Nabigasyon",
            directions: "Mga Direksyon",
            staff_directory: "Kumpletong Direktoryo ng mga Kawani",
            campus_news: "Balita sa Kampus",
            ai_assistant: "AI na Katulong",
            help_center: "Sentro ng Tulong",
            user_guide: "Gabay sa Paggamit",
            faq: "Mga Madalas Itanong"
        },
        buttons: {
            back: "Bumalik",
            done: "Tapos Na",
            search_again: "Maghanap Muli",
            tap_directions: "Pindutin para sa Direksyon",
            play_audio: "I-play ang Audio",
            stop_audio: "Itigil ang Audio",
            back_to_directory: "Bumalik sa Direktoryo",
            see_all: "Tingnan Lahat",
            close: "Isara",
            submit_survey: "Ipasa ang Sarbey",
            specific_rooms: "Mga Tukoy na Silid",
            back_to: "Bumalik sa"
        },
        assistant: {
            title: "Katulong sa Paaralan",
            greeting: "Paano ako makakatulong sa iyo ngayon?",
            navigate: "Maghanap ng Silid",
            events: "Tingnan ang mga Kaganapan",
            announcements: "Basahin ang mga Anunsyo",
            call: "Tumawag sa Paaralan",
            directory: "Direktoryo ng Kawani",
            chatbot: "Makipag-chat sa AI"
        },
        labels: {
            floor: "Palapag",
            room: "Silid",
            building: "Gusali",
            select_building: "Pumili ng gusali upang tingnan ang mga lokasyon",
            tap_to_view: "Pindutin upang tingnan",
            tap_office: "Pindutin ang opisina upang mahanap ito",
            show_path: "Ipakita ang daan mula Kiosk patungong",
            we_could_not_find: "Hindi namin mahanap ang",
            search_tips: "Ang hinahanap mo ay wala sa aming database. Pakisuri ang spelling o subukang hanapin ang mga pasilidad tulad ng 'Library', 'Clinic', o 'Canteen'.",
            loading: "Naglo-load..."
        }
    }
};

// Translate text helper
function translate(key, lang = currentLang) {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
        value = value?.[k];
        if (!value) break;
    }
    return value || key;
}

// Sentence-level Translation Logic for Natural TTS
const sentenceMap = {
    // English Pattern -> Natural Filipino Translation
    // Starting points
    "Start at the Main Kiosk near the gate.": "Magsimula sa Main Kiosk malapit sa gate.",
    "Start at the main kiosk near the gate.": "Magsimula sa main kiosk malapit sa gate.",

    // Core movements
    "Walk straight ahead towards the quadrangle.": "Maglakad nang diretso patungo sa quadrangle.",
    "Walk straight toward the quadrangle.": "Maglakad nang diretso pa-quadrangle.",

    // Building specific
    "Turn towards Building A, coming from your right.": "Kumanan patungo sa Building A.",
    "Walk toward Building D.": "Maglakad papuntang Building D.",
    "Walk toward Building B.": "Maglakad papuntang Building B.",
    "Walk toward Building C.": "Maglakad papuntang Building C.",

    // Floor instructions
    "Proceed to the designated floor.": "Pumunta sa tamang palapag.",
    "Go up until you have reached your designated Floor.": "Umakyat hanggang makarating sa tamang palapag.",
    "Walk up the stairs from Floor 1 to Floor 2.": "Umakyat ng hagdan mula unang palapag papuntang ikalawa.",

    // Turns and Corners
    "Turn right at the corner.": "Kumanan sa kanto.",
    "Turn to the right after reaching the turning point.": "Pagdating sa likuan, kumanan.",
    "Turn left.": "Kumaliwa.",
    "Turn right.": "Kumanan.",
    "Turn to your left.": "Kumaliwa.",
    "Turn to your right.": "Kumanan.",

    // Arrival / Destination
    "You have arrived at": "Nakarating ka na sa",
    "The first door you will see on the left is Room 101.": "Ang unang pinto sa kaliwa ay Room 101.",
    "Walk until you reach the Stockroom or \"Room 101\".": "Maglakad hanggang marating ang Stockroom o Room 101.",
    "Walk past all rooms on Floor 1 and continue straight to the stairs.": "Lagpasan ang mga silid sa 1st Floor at dumiretso sa hagdan.",

    // Generic patterns for regex replacement if strict match fails
    patterns: [
        { regex: /Start at the (.*)/i, replace: "Magsimula sa $1" },
        { regex: /Walk straight (.*)/i, replace: "Maglakad nang diretso $1" },
        { regex: /Turn right (.*)/i, replace: "Kumanan $1" },
        { regex: /Turn left (.*)/i, replace: "Kumaliwa $1" },
        { regex: /You have reached (.*)/i, replace: "Nakarating ka na sa $1" },
        { regex: /Walk until you reach (.*)/i, replace: "Maglakad hanggang marating ang $1" }
    ]
};

// Auto-translate direction text with natural grammar
function translateDirection(text) {
    if (currentLang === 'en') return text;
    if (!text) return "";

    // 1. Check Exact Sentence Match (Best for natural grammar)
    if (sentenceMap[text]) {
        return sentenceMap[text];
    }

    // 2. Check Loop for specific known sentences not in direct map keys but in logic
    // (This part mimics the previous logic but with better data if we populated sentenceMap fully)

    // 3. Pattern Matching (Fallback)
    // Simple replacements usually sound robotic, so we try to keep English terms that are commonly used (like "Building A", "Kiosk")
    // but change the verbs and prepositions.

    let translated = text;

    // Common Phrase Replacements (Context-aware)
    const phrases = [
        { en: "Start at the Main Kiosk near the gate", tl: "Magsimula sa Main Kiosk malapit sa gate" },
        { en: "Walk straight ahead towards", tl: "Maglakad nang diretso patungong" },
        { en: "Walk straight", tl: "Maglakad nang diretso" },
        { en: "toward the quadrangle", tl: "sa quadrangle" },
        { en: "Turn towards", tl: "Lumiko patungong" },
        { en: "coming from your right", tl: "mula sa iyong kanan" },
        { en: "Proceed to the designated floor", tl: "Pumunta sa tamang palapag" },
        { en: "Turn right at the corner", tl: "Kumanan sa kanto" },
        { en: "Turn to the right", tl: "Kumanan" },
        { en: "Turn to the left", tl: "Kumaliwa" },
        { en: "Turn right", tl: "Kumanan" },
        { en: "Turn left", tl: "Kumaliwa" },
        { en: "after reaching the turning point", tl: "pagdating sa likuan" },
        { en: "Continue walking until you have reached", tl: "Maglakad hanggang marating ang" },
        { en: "Walk until you reach", tl: "Maglakad hanggang marating ang" },
        { en: "Walk until you have reached", tl: "Maglakad hanggang marating ang" },
        { en: "Walk past all rooms", tl: "Lagpasan ang lahat ng silid" },
        { en: "continue straight to the stairs", tl: "dumiretso sa hagdan" },
        { en: "Walk up the stairs", tl: "Umakyat sa hagdan" },
        { en: "on the left", tl: "sa kaliwa" },
        { en: "on the right", tl: "sa kanan" },
        { en: "You have arrived at", tl: "Nakarating ka na sa" },
        { en: "Room", tl: "Room" }, // Keep "Room" as it's commonly used, or "Silid" if strict
        { en: "Building", tl: "Building" } // Keep "Building"
    ];

    for (const phrase of phrases) {
        // Use a case-insensitive replacement
        const regex = new RegExp(phrase.en, "gi");
        translated = translated.replace(regex, phrase.tl);
    }

    return translated;
}

// Toggle language function
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'tl' : 'en';
    localStorage.setItem('kioskLanguage', currentLang);
    updateUILanguage();
    // Refresh the view if dynamic content is showing (like building view) to re-render with new language
    // Since we can't easily re-call the exact function without params, clean reload might be best or specific checks
    const cardGrid = document.getElementById('card-grid');
    if (cardGrid && cardGrid.innerHTML.includes('Building')) {
        // Attempt to refresh current view if possible, otherwise go home is safer
        // For now, simpler UI update is handled, deep view refresh requires state tracking
        // We'll trust user to navigate or we can reload:
        // location.reload(); // Strict reload ensures everything is translated
    }
}

// Update all UI text
function updateUILanguage() {
    // Update button text
    document.getElementById('lang-display').textContent = currentLang === 'en' ? 'English' : 'Tagalog';

    // Update elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translate(key);
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        el.placeholder = translate(key);
    });
}

// Text-to-Speech functions
function speakDirections(textArray, elementId) {
    stopSpeech();

    if (!textArray || textArray.length === 0) return;

    // Translate if needed
    const translatedText = textArray.map(t => translateDirection(t));
    const fullText = translatedText.join('. '); // Add pause with period

    currentUtterance = new SpeechSynthesisUtterance(fullText);
    // Use 'fil-PH' (Filipino) or fallback to 'en-US' if English
    // Note: 'fil-PH' availability depends on OS/Browser. 'id-ID' (Indonesian) or 'es-ES' might be closer fallbacks than English if Filipino is missing, but sticky to standard.
    currentUtterance.lang = currentLang === 'tl' ? 'fil-PH' : 'en-US';
    currentUtterance.rate = 0.95; // Natural speaking rate
    currentUtterance.pitch = 1;
    currentUtterance.volume = 1;

    // Update button state
    const playBtn = document.getElementById(elementId);
    if (playBtn) {
        playBtn.classList.add('playing');
        playBtn.innerHTML = '<i class="fas fa-stop"></i> ' + translate('buttons.stop_audio');
    }

    currentUtterance.onend = () => {
        if (playBtn) {
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<i class="fas fa-volume-up"></i> ' + translate('buttons.play_audio');
        }
        currentUtterance = null;
    };

    speechSynthesis.speak(currentUtterance);
}

function stopSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    currentUtterance = null;

    // Reset all TTS buttons
    document.querySelectorAll('.tts-btn.playing').forEach(btn => {
        btn.classList.remove('playing');
        btn.innerHTML = '<i class="fas fa-volume-up"></i> ' + translate('buttons.play_audio');
    });
}

function toggleTTS(textArray, btnId) {
    if (speechSynthesis.speaking) {
        stopSpeech();
    } else {
        speakDirections(textArray, btnId);
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function () {
    updateUILanguage();
});
