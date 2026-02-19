// Main Initialization and Event Handlers

// Date and Time Display
function updateDateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const philippineTime = new Intl.DateTimeFormat('en-US', options).format(now);
    const display = document.getElementById('date-time-display');
    if (display) display.textContent = 'Current Philippine Time: ' + philippineTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Assistant Modal Functions
document.addEventListener('DOMContentLoaded', function () {
    const miniAssistant = document.getElementById('mini-assistant');
    const assistantModal = document.getElementById('assistant-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Open modal when clicking the mini assistant button
    if (miniAssistant) {
        miniAssistant.addEventListener('click', function () {
            assistantModal.style.display = 'flex';
        });
    }

    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            assistantModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    if (assistantModal) {
        assistantModal.addEventListener('click', function (e) {
            if (e.target === assistantModal) {
                assistantModal.style.display = 'none';
            }
        });
    }
});

// Open Campus Map Modal
function openMapModal() {
    document.getElementById('map-modal').style.display = 'flex';
}

// Close Campus Map Modal
function closeMapModal() {
    document.getElementById('map-modal').style.display = 'none';
}

// Close map modal when clicking outside
const mapModal = document.getElementById('map-modal');
if (mapModal) {
    mapModal.addEventListener('click', function (e) {
        if (e.target === this) {
            closeMapModal();
        }
    });
}

// Active Navigation Helper
function setActiveNav(element) {
    // Remove active class from all links
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(link => link.classList.remove('active'));

    // Add active class to clicked element
    if (element) {
        element.classList.add('active');
    }
}

// Improved Search Function
function performSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    const query = input.value.trim().toLowerCase();

    // 1. Prevent empty searches
    if (!query) {
        input.focus();
        return;
    }

    // 2. Define keywords for manual mappings (e.g. facilities not in room list)
    const keywords = {
        'canteen': { building: 'Building B', floor: 1, label: 'School Canteen', img: 'Building B 1F School Canteen.jpg', desc: 'Main School Canteen' },
        'library': { building: 'Building C', floor: 2, label: 'E - Library', img: 'Building C 2F 204 E - Library.jpg', desc: 'Electronic Library' },
        'clinic': { building: 'Building B', floor: 1, label: 'Medical Clinic', img: 'Building B 1F Clinic.jpg', desc: 'Medical and Dental Clinic' },
        'principal': { building: 'Building B', floor: 1, label: "Office of the Principal", img: 'Building B 1F Office of the Principal.jpg', desc: "Principal's Office" },
        'gym': { building: 'Building D', floor: 1, label: 'Gymnasium', img: 'placeholderimg.jpg', desc: 'School Gym / Court' },
        'stage': { building: 'Building A', floor: 1, label: 'School Stage', img: 'Building A 1F Backstage.jpg', desc: 'Main Stage Area' },
        'registrar': { building: 'Building B', floor: 1, label: 'Office of the Registrar', img: 'Building B 1F Office of the Registrar.jpg', desc: 'Registrar Office' },
        'guidance': { building: 'Building C', floor: 1, label: 'JHS Guidance Office', img: 'Building C 1F JHS Guidance Office.jpg', desc: 'Guidance Office' },
        'computer lab': { building: 'Building C', floor: 2, label: 'SHS Computer Lab', img: 'Building C 2F 201 SHS Computer Lab.jpg', desc: 'Computer Laboratory' },
        'cookery': { building: 'Building C', floor: 1, label: 'Cookery Laboratory', img: 'Building C 1F 106 Cookery Laboratory.jpg', desc: 'Cookery Lab' }
    };

    // 3. Check Manual Keywords First
    for (const key in keywords) {
        if (query.includes(key)) {
            const match = keywords[key];
            if (typeof viewSpecificRoom === 'function') {
                viewSpecificRoom(match.building, match.label, match);
            }
            return; // Stop searching, we found a match
        }
    }

    // 4. Detect if the query is ONLY a room number (no building name specified).
    //    Patterns recognized: "101", "room 101", "room101", "rm 101"
    //    We check that no building name (A/B/C/D) is part of the query.
    const buildingKeywords = [
        'building a', 'building b', 'building c', 'building d',
        'bldg a', 'bldg b', 'bldg c', 'bldg d',
        'bldg. a', 'bldg. b', 'bldg. c', 'bldg. d'
    ];
    const buildingMentioned = buildingKeywords.some(b => query.includes(b));

    // Extract a 3-digit room number from the query
    const roomNumberMatch = query.match(/(?:room\s*|rm\s*)?(\d{3})/);

    if (roomNumberMatch && !buildingMentioned) {
        // Room-number-only search: collect ALL matching rooms across every building
        const roomNumber = roomNumberMatch[1]; // e.g. "101"
        const allMatches = [];

        if (typeof buildingImages !== 'undefined') {
            for (const buildingName in buildingImages) {
                const bData = buildingImages[buildingName];
                if (bData.floorData) {
                    for (const floor in bData.floorData) {
                        const rooms = bData.floorData[floor];
                        for (const room of rooms) {
                            // Match rooms whose label contains the exact room number
                            // e.g. "Room 101" contains "101"
                            if (room.label.toLowerCase().includes(roomNumber)) {
                                allMatches.push({
                                    building: buildingName,
                                    floor: floor,
                                    room: room
                                });
                            }
                        }
                    }
                }
            }
        }

        if (allMatches.length > 1) {
            // Multiple buildings have this room — show a directory grid
            if (typeof showMultipleRoomResults === 'function') {
                showMultipleRoomResults(roomNumber, allMatches);
            }
            return;
        } else if (allMatches.length === 1) {
            // Exactly one result — go straight to the single room view
            const m = allMatches[0];
            m.room.floor = m.floor;
            if (typeof viewSpecificRoom === 'function') {
                viewSpecificRoom(m.building, m.room.label, m.room);
            }
            return;
        }
        // Zero matches — fall through to no-results
    }

    // 5. Standard full-text search across building data (used when building is specified
    //    or when the query is not a plain room number)
    let found = false;

    if (typeof buildingImages !== 'undefined') {
        for (const buildingName in buildingImages) {
            const bData = buildingImages[buildingName];
            if (bData.floorData) {
                for (const floor in bData.floorData) {
                    const rooms = bData.floorData[floor];
                    for (const room of rooms) {
                        if (room.label.toLowerCase().includes(query) ||
                            room.desc.toLowerCase().includes(query) ||
                            buildingName.toLowerCase().includes(query)) {
                            room.floor = floor;
                            if (typeof viewSpecificRoom === 'function') {
                                viewSpecificRoom(buildingName, room.label, room);
                            }
                            found = true;
                            break;
                        }
                    }
                    if (found) break;
                }
            }
            if (found) break;
        }
    }

    // 6. "No Results" Fallback
    if (!found) {
        if (typeof showNoResults === 'function') {
            showNoResults(query);
        } else {
            alert('No results found for: ' + query);
        }
    }
}
