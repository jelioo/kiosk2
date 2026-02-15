// Language Toggle and TTS System

// Global language state
let currentLang = 'en';
try {
    currentLang = localStorage.getItem('kioskLanguage') || 'en';
} catch (e) {
    console.warn('LocalStorage access denied (likely file:// protocol). Defaulting to English.');
}
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
        },
        homepage: {
            upcoming_events_title: "Upcoming Events",
            announcements_title: "Announcements",
            campus_directory_title: "Campus Directory",
            select_building_desc: "Select a building to view detailed locations"
        },
        events: {
            fourth_quarter_exams: "Fourth Quarter Exams",
            eosy_rites: "End-of-School-Year Rites",
            parent_teacher_conf: "Parent-Teacher Conference",
            after_quarter_exams: "After Quarter Exams"
        },
        announcements: {
            exams_scheduled: "Fourth Quarter Exams scheduled for March 19 and 20, 2026",
            eosy_march: "End-of-School-Year Rites on March 30-31, 2026",
            ptc_after_exams: "Parent-Teacher Conference after quarterly exams",
            submit_clearance: "Submit all clearance requirements before EOSY Rites",
            report_cards: "Report cards will be distributed after quarter exams",
            school_year_ends: "School Year 2025-2026 ends on March 31, 2026"
        },
        team: {
            our_research_team: "Our Research Team",
            meet_team: "Meet the dedicated minds behind this project",
            research_leader: "Research Leader",
            co_researcher: "Co-Researcher"
        },
        survey: {
            title: "User Feedback Survey",
            question1: "How would you rate your overall experience with the kiosk?",
            question2: "Was the information you were looking for easy to find?",
            question3: "How helpful was the navigation system?",
            question4: "Would you recommend this kiosk to others?",
            question5: "Please share any suggestions for improvement:",
            very_poor: "Very Poor",
            poor: "Poor",
            average: "Average",
            good: "Good",
            excellent: "Excellent",
            yes: "Yes",
            no: "No",
            not_helpful: "Not Helpful",
            somewhat_helpful: "Somewhat Helpful",
            very_helpful: "Very Helpful",
            your_suggestions: "Your suggestions here..."
        },
        help: {
            help_center_title: "Help Center",
            user_guide_title: "User Guide",
            faq_title: "Frequently Asked Questions",
            contact_support_title: "Contact Support",
            guide_search: "Use the search bar at the top to find any room or facility",
            guide_directory: "Browse the Campus Directory to explore all buildings",
            guide_language: "Toggle between English and Tagalog using the language button",
            guide_voice: "Click the microphone icon for voice search",
            faq_q1: "Q: How do I search for a specific room?",
            faq_a1: "A: Use the search bar or voice search feature at the top of the screen.",
            faq_q2: "Q: Can I change the language?",
            faq_a2: "A: Yes! Click the globe icon at the top right to switch between English and Tagalog.",
            faq_q3: "Q: How do I get directions to a room?",
            faq_a3: "A: Search for the room, then tap 'Tap for Directions' to view the route.",
            need_help: "Need more help? Contact the school office",
            phone: "Phone",
            email: "Email",
            use_directory: "Use the \"Campus Directory\" or ask the Assistant to \"Navigate Rooms\".",
            export_data: "Admin: Export Data",
            upload_data: "Admin: Upload Data"
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
        },
        homepage: {
            upcoming_events_title: "Mga Paparating na Kaganapan",
            announcements_title: "Mga Anunsyo",
            campus_directory_title: "Direktoryo ng Kampus",
            select_building_desc: "Pumili ng gusali upang tingnan ang mga lokasyon"
        },
        events: {
            fourth_quarter_exams: "Ikaapat na Quarter na Pagsusulit",
            eosy_rites: "Seremonya ng Pagtatapos ng Taon",
            parent_teacher_conf: "Pulong ng Magulang at Guro",
            after_quarter_exams: "Pagkatapos ng Quarterly Exam"
        },
        announcements: {
            exams_scheduled: "Ikaapat na Quarter na Pagsusulit ay nakatakda sa Marso 19 at 20, 2026",
            eosy_march: "Seremonya ng Pagtatapos ng Taon sa Marso 30-31, 2026",
            ptc_after_exams: "Pulong ng Magulang at Guro pagkatapos ng quarterly exams",
            submit_clearance: "Ipasa ang lahat ng clearance requirements bago ang EOSY Rites",
            report_cards: "Ang mga report card ay ibibigay pagkatapos ng quarter exams",
            school_year_ends: "Ang Taong Paaralan 2025-2026 ay magtatapos sa Marso 31, 2026"
        },
        team: {
            our_research_team: "Ang Aming Koponan sa Pananaliksik",
            meet_team: "Kilalanin ang mga taong nagtrabaho sa proyektong ito",
            research_leader: "Pinuno ng Pananaliksik",
            co_researcher: "Kasamang Mananaliksik"
        },
        survey: {
            title: "Sarbey ng Feedback ng Gumagamit",
            question1: "Paano mo irerate ang iyong kabuuang karanasan sa kiosk?",
            question2: "Ang impormasyon na hinahanap mo ba ay madaling mahanap?",
            question3: "Gaano ka-helpful ang navigation system?",
            question4: "Irerekumenda mo ba ang kiosk na ito sa iba?",
            question5: "Pakibahagi ang anumang mungkahi para sa pagpapabuti:",
            very_poor: "Napakasama",
            poor: "Masama",
            average: "Katamtaman",
            good: "Mabuti",
            excellent: "Napakahusay",
            yes: "Oo",
            no: "Hindi",
            not_helpful: "Hindi Nakatulong",
            somewhat_helpful: "Medyo Nakatulong",
            very_helpful: "Napakatulong",
            your_suggestions: "Ang iyong mga mungkahi dito..."
        },
        help: {
            help_center_title: "Sentro ng Tulong",
            user_guide_title: "Gabay sa Paggamit",
            faq_title: "Mga Madalas Itanong",
            contact_support_title: "Makipag-ugnayan sa Support",
            guide_search: "Gamitin ang search bar sa itaas upang maghanap ng silid o pasilidad",
            guide_directory: "I-browse ang Campus Directory upang tuklasin ang lahat ng gusali",
            guide_language: "Magpalit sa pagitan ng English at Tagalog gamit ang language button",
            guide_voice: "I-click ang microphone icon para sa voice search",
            faq_q1: "T: Paano ako maghanap ng specific na silid?",
            faq_a1: "S: Gamitin ang search bar o voice search feature sa itaas ng screen.",
            faq_q2: "T: Maaari ko bang palitan ang wika?",
            faq_a2: "S: Oo! I-click ang globe icon sa kanang itaas upang magpalit sa pagitan ng English at Tagalog.",
            faq_q3: "T: Paano ako makakakuha ng directions papunta sa silid?",
            faq_a3: "S: Maghanap ng silid, pagkatapos pindutin ang 'Pindutin para sa Direksyon' upang tingnan ang ruta.",
            need_help: "Kailangan ng tulong? Makipag-ugnayan sa school office",
            phone: "Telepono",
            email: "Email",
            use_directory: "Gamitin ang \"Direktoryo ng Kampus\" o tanungin ang Assistant na \"Maghanap ng Silid\".",
            export_data: "Admin: I-export ang Data",
            upload_data: "Admin: Mag-upload ng Data"
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
    "Turn to your left, and you have arrived at the backstage door.": "Kumaliwa, at nasa backstage door ka na.",

    // Arrival / Destination
    "You have arrived at": "Nakarating ka na sa",
    "The first door you will see on the left is Room 101.": "Ang unang pinto sa kaliwa ay Room 101.",
    "Walk until you reach the Stockroom or \"Room 101\".": "Maglakad hanggang marating ang Stockroom o Room 101.",
    "Continue walking until you have reached the Standard Classroom or \"Room 102.\"": "Maglakad pa hanggang marating ang Room 102.",
    "Continue walking until you have reached the Standard Classroom or \"Room 103.\"": "Maglakad pa hanggang marating ang Room 103.",
    "Continue walking until you have reached the end then turn left.": "Maglakad hanggang dulo at kumaliwa.",
    "Continue walking until you have reached the main Staircase.": "Maglakad hanggang marating ang pangunahing hagdan.",
    "Continue going up until you have reached the second floor.": "Umakyat hanggang makarating sa ikalawang palapag.",
    "Turn to your right and walk until the end. You have reached the Classroom or \"Room 201.\"": "Kumanan at maglakad hanggang dulo. Nasa Room 201 ka na.",
    "Walk past all rooms on Floor 1 and continue straight to the stairs.": "Lagpasan ang mga silid sa 1st Floor at dumiretso sa hagdan.",
    "Turn to your right and walk until the end. You have reached the Classroom or \"Room 202.\"": "Kumanan at maglakad hanggang dulo. Nasa Room 202 ka na."
};

// Auto-translate direction text with natural grammar
function translateDirection(text) {
    if (currentLang === 'en') return text;
    if (!text) return "";

    // 1. Check Exact Sentence Match (Best for natural grammar)
    if (sentenceMap[text]) {
        return sentenceMap[text];
    }

    // 2. Fallback: Word replacements for unknown sentences
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
        { en: "and you have arrived at", tl: "at nasa" },
        { en: "Room", tl: "Room" }, // Keep "Room"
        { en: "Building", tl: "Building" } // Keep "Building"
    ];

    for (const phrase of phrases) {
        // Use a case-insensitive replacement
        // We use a regex safely by escaping special chars if needed, simplified here
        const regex = new RegExp(phrase.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
        translated = translated.replace(regex, phrase.tl);
    }

    return translated;
}

// Toggle language function
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'tl' : 'en';
    try {
        localStorage.setItem('kioskLanguage', currentLang);
    } catch (e) {
        console.warn('LocalStorage write failed.');
    }
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
