// Global Constants
const REFRESH_TIME = 600000; // 10 minutes auto-refresh
const RATING_TIME = 180000;  // 3 minutes before rating prompt

// Navigation Functions
function goHome() {
    location.reload();
}

// Navigate Rooms function - Shows campus directory for navigation
function navigateRooms() {
    // Simply call the campus directory function
    showCampusDirectory();
    // Close the assistant modal
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

// View Schedule function - scrolls to and highlights the schedule card
function viewSchedule() {
    // Close the assistant modal first
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';

    // If we're not on the home page, reload to home first
    const schedCard = document.getElementById('schedule-card');
    if (!schedCard) {
        location.reload();
        return;
    }

    // Scroll to schedule card smoothly
    schedCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Pulse highlight effect
    schedCard.style.transition = 'box-shadow 0.4s ease';
    schedCard.style.boxShadow = '0 0 0 4px #4ca1af, 0 10px 30px rgba(76,161,175,0.4)';
    setTimeout(() => { schedCard.style.boxShadow = ''; }, 1800);
}

// Switch schedule tab panels
function switchSchedTab(panel, btn) {
    // Deactivate all tabs and panels
    document.querySelectorAll('.sched-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sched-panel').forEach(p => p.classList.remove('active'));

    // Activate selected
    btn.classList.add('active');
    const target = document.getElementById('sched-' + panel);
    if (target) target.classList.add('active');
}

function showCampusDirectory() {
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = `
        <div class="card about-title-card">
            <h3><i class="fas fa-map-marked-alt"></i> ${translate('headers.campus_directory')}</h3>
            <p>${translate('labels.select_building')}</p>
        </div>

        <div class="building-card" onclick="viewBuilding('Building A')">
            <img src="BUILDING A.jpg" onerror="this.src='placeholderimg.jpg'" alt="Building A">
            <div class="building-overlay">
                <div class="building-title">Building A</div>
                <div class="building-desc">School Stage, Stockrooms, English Faculty</div>
            </div>
        </div>

        <div class="building-card" onclick="viewBuilding('Building B')">
            <img src="BUILDING B.jpg" onerror="this.src='placeholderimg.jpg'" alt="Building B">
            <div class="building-overlay">
                <div class="building-title">Building B</div>
                <div class="building-desc">Principal's Office, Clinic, Dental Office</div>
            </div>
        </div>

        <div class="building-card" onclick="viewBuilding('Building C')">
            <img src="BUILDING C.jpg" onerror="this.src='placeholderimg.jpg'" alt="Building C">
            <div class="building-overlay">
                <div class="building-title">Building C</div>
                <div class="building-desc">Cookery Lab, Computer Lab, E - Library</div>
            </div>
        </div>

        <div class="building-card" onclick="viewBuilding('Building D')">
             <img src="BUILDING D.jpg" onerror="this.src='placeholderimg.jpg'" alt="Building D">
            <div class="building-overlay">
                <div class="building-title">Building D</div>
                <div class="building-desc">Senior High School Wing</div>
            </div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function viewBuilding(buildingName) {
    const cardGrid = document.getElementById('card-grid');
    const bData = buildingImages[buildingName];

    if (!bData) {
        alert("Building data not found!");
        return;
    }

    let floorsHtml = '';
    // Assuming 2 floors as per previous context or data structure
    // We can derive floors from bData.floors keys
    const floors = Object.keys(bData.floors).sort();

    floors.forEach(floor => {
        const floorImg = bData.floors[floor] || 'placeholderimg.jpg';
        floorsHtml += `
            <div class="card" onclick="viewFloor('${buildingName}', ${floor})" style="cursor: pointer; transition: transform 0.2s; padding: 0; overflow: hidden;">
                <div style="height: 150px; overflow: hidden; position: relative;">
                     <img src="${floorImg}" onerror="this.src='placeholderimg.jpg'" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);">
                     <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 10px; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); color: white;">
                        <h3 style="margin: 0; border: none; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"><i class="fas fa-layer-group"></i> ${translate('labels.floor')} ${floor}</h3>
                     </div>
                </div>
                <div style="padding: 15px;">
                    <p style="margin: 0; color: #555;">${translate('labels.tap_to_view')} - ${translate('labels.floor')} ${floor}</p>
                </div>
            </div>
         `;
    });

    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #2980b9, #2c3e50); color:white;">
            <button onclick="showCampusDirectory()" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> ${translate('buttons.back_to_directory')}
            </button>
            <h3 style="margin:0; border:none; color:white;">${buildingName}</h3>
        </div>
        ${floorsHtml}
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

// Helper: when user clicks a room card from the directory, show its full details with correct label, img, and directions
function viewRoomFromDirectory(el) {
    const buildingName = el.dataset.building;
    const floor = el.dataset.floor;
    const roomIndex = parseInt(el.dataset.roomIndex, 10);
    if (!buildingName || floor === undefined || isNaN(roomIndex)) return;
    const bData = buildingImages[buildingName];
    if (!bData || !bData.floorData || !bData.floorData[floor]) return;
    const roomList = bData.floorData[floor];
    const room = roomList[roomIndex];
    if (!room) return;
    room.floor = floor;
    viewSpecificRoom(buildingName, room.label, room);
}

function viewFloor(buildingName, floor) {
    const cardGrid = document.getElementById('card-grid');
    const bData = buildingImages[buildingName];

    if (!bData || !bData.floors[floor]) {
        alert("Floor data not found!");
        return;
    }

    // const floorImg = bData.floors[floor]; // Removed as per request
    const roomList = bData.floorData && bData.floorData[floor] ? bData.floorData[floor] : [];

    let roomsHtml = '';
    roomList.forEach((room, index) => {
        const roomImg = room.img || 'placeholderimg.jpg';

        roomsHtml += `
            <div class="card" data-building="${buildingName}" data-floor="${floor}" data-room-index="${index}" onclick="viewRoomFromDirectory(this)" style="cursor: pointer; padding: 0; overflow: hidden; transition: transform 0.2s;">
                <div style="height: 180px; overflow: hidden; background: #eee;">
                    <img src="${roomImg}" onerror="this.src='placeholderimg.jpg'" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                <div style="padding: 15px;">
                    <h4 style="margin-top: 0; margin-bottom: 5px; color: #2c3e50; font-size: 1.1rem;">${room.label}</h4>
                    <p style="margin: 0; font-size: 0.9rem; color: #7f8c8d; line-height: 1.4;">${room.desc}</p>
                </div>
            </div>
        `;
    });

    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #2980b9, #2c3e50); color:white;">
            <button onclick="viewBuilding('${buildingName}')" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> ${translate('buttons.back_to')} ${buildingName}
            </button>
            <h3 style="margin:0; border:none; color:white;">${buildingName} - ${translate('labels.floor')} ${floor}</h3>
        </div>

        <div class="directory-list-grid" style="grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
            ${roomsHtml}
        </div>
    `;
}

// Auto Refresh and Rating Logic
setTimeout(() => {
    location.reload();
}, REFRESH_TIME);

setTimeout(() => {
    const ratingModal = document.getElementById('rating-modal');
    if (ratingModal) ratingModal.style.display = 'block';
}, RATING_TIME);

function closeRatingModal() {
    const ratingModal = document.getElementById('rating-modal');
    if (ratingModal) ratingModal.style.display = 'none';
}

function rate(stars) {
    const starElements = document.querySelectorAll('.rating-stars i');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.style.color = '#f1c40f';
        } else {
            star.style.color = '#ddd';
        }
    });

    const ratingData = {
        timestamp: new Date().toLocaleString(),
        type: 'Star Rating',
        rating: stars
    };
    // Save to LocalStorage
    try {
        let storedData = localStorage.getItem('survey_responses');
        let responses = storedData ? JSON.parse(storedData) : [];
        responses.push(ratingData);
        localStorage.setItem('survey_responses', JSON.stringify(responses));
    } catch (e) {
        console.warn('LocalStorage access denied.');
    }

    setTimeout(() => {
        alert('Thank you for your feedback! We appreciate your ' + stars + ' star rating.');
        closeRatingModal();
    }, 300);
}

// === ORIGINAL FUNCTIONS PRESERVED BELOW ===

function viewSurvey() {
    const cardGrid = document.getElementById('card-grid');
    const questions = [
        "The kiosk helped me find information faster than the bulletin board.",
        "Searching for multiple pieces of information was quicker on the kiosk.",
        "The information on the kiosk seemed more accurate and up-to-date.",
        "I trust the information on the kiosk more than the bulletin board.",
        "The kiosk made it easier to find specific rooms and locations.",
        "The interactive map was helpful for navigation.",
        "The search function helped me find information quickly.",
        "The kiosk provided more detailed information than the bulletin board.",
        "The real-time updates on the kiosk are valuable.",
        "Overall, the kiosk enhances speed, accuracy, and ease of navigation compared to the bulletin board.",
        "I prefer using the kiosk over the traditional bulletin board.",
        "The school should install more kiosks in other locations."
    ];

    let questionsHtml = '';
    questions.forEach((q, index) => {
        questionsHtml += `
            <div class="survey-question">
                <h4>${index + 1}. ${q}</h4>
                <div class="likert-scale">
                    <div class="likert-option"><input type="radio" name="q${index}" value="5" required><label>Strongly Agree</label></div>
                    <div class="likert-option"><input type="radio" name="q${index}" value="4"><label>Agree</label></div>
                    <div class="likert-option"><input type="radio" name="q${index}" value="3"><label>Neutral</label></div>
                    <div class="likert-option"><input type="radio" name="q${index}" value="2"><label>Disagree</label></div>
                    <div class="likert-option"><input type="radio" name="q${index}" value="1"><label>Strongly Disagree</label></div>
                </div>
            </div>
        `;
    });

    cardGrid.innerHTML = `
        <div class="card about-title-card">
            <h3><i class="fas fa-poll"></i> User Feedback Survey</h3>
            <p>Help us improve with your responses</p>
        </div>
        
        <div class="card" style="grid-column: 1 / -1;">
            <div class="survey-container">
                <form onsubmit="submitSurvey(event)">
                    <!-- Demographics -->
                    <div class="survey-question">
                        <h4>Respondent Information</h4>
                        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 200px;">
                                <label style="display:block; margin-bottom:5px; font-weight:bold;">Name:</label>
                                <input type="text" id="survey-name" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                            </div>
                            <div style="width: 100px;">
                                <label style="display:block; margin-bottom:5px; font-weight:bold;">Age:</label>
                                <input type="number" id="survey-age" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                            </div>
                        </div>
                    </div>

                    <div class="survey-question">
                        <h4>Familiarity with Technology</h4>
                        <p style="font-size:0.9rem; margin-bottom:10px; color:#666;">Rate your comfort level with using technology.</p>
                        <div class="likert-scale">
                            <div class="likert-option"><input type="radio" name="tech-familiarity" value="5" required><label>Very Familiar</label></div>
                            <div class="likert-option"><input type="radio" name="tech-familiarity" value="4"><label>Familiar</label></div>
                            <div class="likert-option"><input type="radio" name="tech-familiarity" value="3"><label>Neutral</label></div>
                            <div class="likert-option"><input type="radio" name="tech-familiarity" value="2"><label>Unfamiliar</label></div>
                            <div class="likert-option"><input type="radio" name="tech-familiarity" value="1"><label>Very Unfamiliar</label></div>
                        </div>
                    </div>

                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

                    ${questionsHtml}
                    
                    <div class="survey-question">
                        <h4>Additional Comments</h4>
                        <textarea id="survey-comments" style="width:100%; padding:10px; border-radius:5px; border:1px solid #ddd; min-height:100px;" placeholder="Any other feedback?"></textarea>
                    </div>

                    <button type="submit" class="assistant-btn" style="width:100%; font-size: 1.1rem; justify-content: center; margin-top:20px;">Submit Survey</button>
                </form>
            </div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function submitSurvey(e) {
    e.preventDefault();

    // Gather data
    const name = document.getElementById('survey-name').value;
    const age = document.getElementById('survey-age').value;
    const techFamInput = document.querySelector('input[name="tech-familiarity"]:checked');
    const techFam = techFamInput ? techFamInput.value : "";
    const comments = document.getElementById('survey-comments').value;

    // Gather question answers
    const answers = {};
    let allAnswered = true;
    for (let i = 0; i < 12; i++) {
        const qInput = document.querySelector(`input[name="q${i}"]:checked`);
        if (qInput) {
            answers[`Q${i + 1}`] = qInput.value;
        } else {
            allAnswered = false;
        }
    }

    if (!allAnswered) {
        alert("Please answer all questions before submitting.");
        return;
    }

    const responseData = {
        timestamp: new Date().toLocaleString(),
        name: name,
        age: age,
        tech_familiarity: techFam,
        ...answers,
        comments: comments,
        type: 'Survey Response'
    };

    // Save to LocalStorage
    try {
        let storedData = localStorage.getItem('survey_responses');
        let responses = storedData ? JSON.parse(storedData) : [];
        responses.push(responseData);
        localStorage.setItem('survey_responses', JSON.stringify(responses));
    } catch (e) {
        console.warn('LocalStorage access denied.');
    }

    alert("Thank you for your feedback! Your responses have been saved.");
    location.reload();
}

function exportData() {
    let storedData = null;
    try {
        storedData = localStorage.getItem('survey_responses');
    } catch (e) {
        alert("Cannot export data: Storage access denied (file:// protocol restrictions).");
        return;
    }

    if (!storedData) {
        alert("No data to export.");
        return;
    }
    const responses = JSON.parse(storedData);

    // Convert to CSV
    if (responses.length === 0) {
        alert("No data to export.");
        return;
    }

    // Collect all unique keys from all objects to ensure all columns (survey + ratings) are included
    const headersSet = new Set();
    responses.forEach(obj => Object.keys(obj).forEach(key => headersSet.add(key)));

    // Convert Set to Array and sort, putting timestamp/type/name first if they exist
    let headers = Array.from(headersSet);
    const priorityKeys = ['timestamp', 'type', 'rating', 'name', 'age', 'tech_familiarity'];
    headers.sort((a, b) => {
        const aIndex = priorityKeys.indexOf(a);
        const bIndex = priorityKeys.indexOf(b);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.localeCompare(b);
    });

    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of responses) {
        const values = headers.map(header => {
            const val = row[header] !== undefined ? row[header] : "";
            const escaped = ('' + val).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'survey_responses.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// View Events function
function viewEvents() {
    window.currentView = 'events';
    const cardGrid = document.getElementById('card-grid');

    // Default events — images: 1.png, 3.png, exams placeholder, graduation rites placeholder
    const defaultEvents = [
        {
            title: 'NAT Exams',
            date: 'Mar. 9-11, 2026',
            tag: 'Academic',
            img: '1.png',
            desc: 'National Achievement Test for Grade 12 students.'
        },
        {
            title: 'Prototype Exhibition',
            date: 'March 9, 2026',
            tag: 'Academic',
            img: '3.png',
            desc: 'Showcase of STEM students prototype projects and innovations.'
        },
        {
            title: '4th Quarter Examinations',
            date: 'Mar. 12-13, 2026',
            tag: 'Academic',
            img: 'exams placeholder.jpg',
            desc: 'Fourth Quarter periodic examinations for all grade levels.'
        },
        {
            title: 'EOSY Rites',
            date: 'March 30-31, 2026',
            tag: 'Ceremony',
            img: 'graduation rites placeholder.jpg',
            desc: 'End-of-school-year rites and graduation ceremony for graduating students.'
        }
    ];

    let events = defaultEvents;
    try {
        const stored = localStorage.getItem('kiosk_events');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                events = parsed.map((ev, i) => ({
                    ...ev,
                    img: ev.img && ev.img !== 'placeholderimg.jpg' ? ev.img : (defaultEvents[i] ? defaultEvents[i].img : 'placeholderimg.jpg')
                }));
            }
        }
    } catch (e) { console.warn('Error loading events:', e); }

    let cardsHtml = '';
    events.forEach(ev => {
        cardsHtml += `
            <div class="card" style="padding:0; overflow:hidden;">
                <div style="height:150px; position:relative;">
                    <img src="${ev.img || 'placeholderimg.jpg'}" onerror="this.src='placeholderimg.jpg'" style="width:100%; height:100%; object-fit:cover;">
                    <span style="position:absolute; top:10px; right:10px; background:#e74c3c; color:white; padding:3px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
                        ${ev.tag || 'Event'}
                    </span>
                </div>
                <div style="padding:15px;">
                    <span style="color:#e67e22; font-size:0.85rem; font-weight:bold;">${ev.date}</span>
                    <h4 style="margin:5px 0; color:#2c3e50;">${ev.title}</h4>
                    <p style="color:#666; font-size:0.88rem; line-height:1.4; margin:0;">${ev.desc || ''}</p>
                </div>
            </div>
        `;
    });

    cardGrid.innerHTML = `
        <div class="card about-title-card" style="grid-column: 1 / -1;">
            <h3><i class="fas fa-calendar-day"></i> Upcoming Events</h3>
            <p>School events and activities this semester</p>
        </div>
        <div style="grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px;">
            ${cardsHtml}
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}
function AboutUs() {
    const cardGrid = document.getElementById('card-grid');

    cardGrid.innerHTML = `
        <div class="card about-title-card" style="grid-column: 1 / -1;">
            <h3><i class="fas fa-building"></i> MAKATI HIGH SCHOOL</h3>
            <p>Select a section to explore</p>
        </div>

        <div class="about-section-card" onclick="showHistorySection()" style="
            grid-column: span 1;
            cursor: pointer;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(44,62,80,0.13);
            border: 2px solid rgba(76,161,175,0.25);
            transition: transform 0.18s, box-shadow 0.18s;
            background: white;
        "
        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 32px rgba(76,161,175,0.22)'"
        onmouseout="this.style.transform=''; this.style.boxShadow='0 6px 24px rgba(44,62,80,0.13)'">
            <div style="background: linear-gradient(135deg, #2c3e50, #4ca1af); padding: 30px 24px; color: white; text-align: center;">
                <div style="font-size: 2.8rem; margin-bottom: 12px;">🏛️</div>
                <h3 style="margin: 0; color: white; border: none; font-size: 1.25rem; font-weight: 700;">History, Mission,<br>Vision &amp; Values</h3>
            </div>
            <div style="padding: 18px 22px; background: linear-gradient(to bottom, rgba(76,161,175,0.06), transparent);">
                <p style="margin: 0; color: #546e7a; font-size: 0.93rem; line-height: 1.6; text-align: center;">
                    Learn about our school's rich history, guiding mission, inspiring vision, and the core values that define us.
                </p>
                <div style="margin-top: 14px; text-align: center;">
                    <span style="display: inline-block; background: linear-gradient(90deg, #2c3e50, #4ca1af); color: white; padding: 8px 22px; border-radius: 20px; font-size: 0.88rem; font-weight: 600; letter-spacing: 0.4px;">
                        <i class="fas fa-arrow-right"></i> View Section
                    </span>
                </div>
            </div>
        </div>

        <div class="about-section-card" onclick="showOrgChart()" style="
            grid-column: span 1;
            cursor: pointer;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(44,62,80,0.13);
            border: 2px solid rgba(41,128,185,0.25);
            transition: transform 0.18s, box-shadow 0.18s;
            background: white;
        "
        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 32px rgba(41,128,185,0.22)'"
        onmouseout="this.style.transform=''; this.style.boxShadow='0 6px 24px rgba(44,62,80,0.13)'">
            <div style="background: linear-gradient(135deg, #1f6dad, #2980b9); padding: 30px 24px; color: white; text-align: center;">
                <div style="font-size: 2.8rem; margin-bottom: 12px;">🏫</div>
                <h3 style="margin: 0; color: white; border: none; font-size: 1.25rem; font-weight: 700;">School<br>Organizational Chart</h3>
            </div>
            <div style="padding: 18px 22px; background: linear-gradient(to bottom, rgba(41,128,185,0.06), transparent);">
                <p style="margin: 0; color: #546e7a; font-size: 0.93rem; line-height: 1.6; text-align: center;">
                    View the organizational structure of Makati High School, including administration, faculty, and staff.
                </p>
                <div style="margin-top: 14px; text-align: center;">
                    <span style="display: inline-block; background: linear-gradient(90deg, #1f6dad, #2980b9); color: white; padding: 8px 22px; border-radius: 20px; font-size: 0.88rem; font-weight: 600; letter-spacing: 0.4px;">
                        <i class="fas fa-arrow-right"></i> View Chart
                    </span>
                </div>
            </div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function showHistorySection() {
    const cardGrid = document.getElementById('card-grid');

    const modeBtn = document.getElementById('mode-toggle-btn');
    const online = modeBtn ? !modeBtn.classList.contains('mode-offline') : true;

    let historyContent = '';
    if (online) {
        historyContent = `
            <div style="padding: 20px;">
                <div style="width:100%; height: 550px; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 12px rgba(0,0,0,0.06); border: 1px solid #e0e8ec;">
                    <embed src="MHS_History.pdf.pdf" type="application/pdf" width="100%" height="100%" style="min-height: 500px;" />
                </div>
            </div>
        `;
    } else {
        historyContent = `
            <div style="padding: 20px;">
                <div style="
                    background: linear-gradient(135deg, #2c3e50, #4ca1af);
                    color: white; border-radius: 10px; padding: 40px 20px;
                    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
                    text-align: center; height: 300px; box-shadow: 0 3px 12px rgba(0,0,0,0.1);
                ">
                    <span style="font-size:3rem;">📵</span>
                    <h4 style="margin:0; font-size:1.4rem;">Offline Mode</h4>
                    <p style="margin:0; font-size:1rem; opacity:0.9;">The history document requires an online connection.<br>Please switch to <strong>Online Mode</strong> to view the history of Makati High School.</p>
                </div>
            </div>
        `;
    }

    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #2c3e50, #4ca1af); color:white; border-radius:12px;">
            <button onclick="AboutUs()" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            <h3 style="margin:0; border:none; color:white;"><i class="fas fa-building"></i> History, Mission, Vision &amp; Values</h3>
        </div>

        <div class="card" style="grid-column: 1 / -1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid rgba(76,161,175,0.2);">
            <div style="background: linear-gradient(90deg, #2c3e50, #4ca1af); padding: 18px 22px; color: white;">
                <h3 style="margin: 0; color: white; border: none; font-size: 1.2rem;"><i class="fas fa-landmark"></i> ${translate('about.history') || 'History'}</h3>
                <p style="margin: 8px 0 0; font-size: 0.92rem; opacity: 0.95;">Scroll through the document below to read the true history of Makati High School</p>
            </div>
            ${historyContent}
        </div>

        <div class="card" style="grid-column: 1 / -1; border-radius: 12px; border-left: 5px solid #4ca1af; background: linear-gradient(to right, rgba(76,161,175,0.06), transparent);">
            <div style="padding: 24px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #4ca1af; padding-bottom: 12px; margin-bottom: 16px; font-size: 1.15rem;"><i class="fas fa-bullseye"></i> MAKATI HIGH SCHOOL — OUR MISSION</h3>
                <p style="color:#37474f; line-height: 1.85; margin: 0;">To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:</p>
                <ul style="color:#37474f; line-height: 1.85; margin: 16px 0 0 24px; padding: 0;">
                    <li>Students learn in a child-friendly, gender-sensitive, safe, and motivating environment.</li>
                    <li>Teachers facilitate learning and constantly nurture every learner.</li>
                    <li>Administrators and staff, as stewards of the institution, ensure an enabling and supportive environment for effective learning to happen.</li>
                    <li>Family, community, and other stakeholders are actively engaged and share responsibility for developing life-long learners.</li>
                </ul>
            </div>
        </div>

        <div class="card" style="grid-column: 1 / -1; border-radius: 12px; border-left: 5px solid #2980b9; background: linear-gradient(to right, rgba(41,128,185,0.06), transparent);">
            <div style="padding: 24px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #2980b9; padding-bottom: 12px; margin-bottom: 16px; font-size: 1.15rem;"><i class="fas fa-eye"></i> MAKATI HIGH SCHOOL — OUR VISION</h3>
                <p style="color:#37474f; line-height: 1.85; margin: 0;">We dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation.</p>
                <p style="color:#546e7a; line-height: 1.85; margin-top: 16px;">As a learner-centered public institution, the Department of Education continuously improves itself to better serve its stakeholders.</p>
            </div>
        </div>

        <div class="card" style="grid-column: 1 / -1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid rgba(76,161,175,0.2);">
            <div style="padding: 24px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #4ca1af; padding-bottom: 12px; margin-bottom: 20px; font-size: 1.15rem;"><i class="fas fa-heart"></i> OUR CORE VALUES</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
                    <div style="background: linear-gradient(145deg, #4ca1af, #3d8b96); color: white; padding: 20px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 1.05rem; box-shadow: 0 4px 12px rgba(76,161,175,0.3);">Maka-Diyos</div>
                    <div style="background: linear-gradient(145deg, #3498db, #2980b9); color: white; padding: 20px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 1.05rem; box-shadow: 0 4px 12px rgba(52,152,219,0.3);">Maka-tao</div>
                    <div style="background: linear-gradient(145deg, #2c3e50, #1a252f); color: white; padding: 20px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 1.05rem; box-shadow: 0 4px 12px rgba(44,62,80,0.3);">Makakalikasan</div>
                    <div style="background: linear-gradient(145deg, #2980b9, #1f6dad); color: white; padding: 20px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 1.05rem; box-shadow: 0 4px 12px rgba(41,128,185,0.3);">Makabansa</div>
                </div>
            </div>
        </div>

        <div class="card" style="grid-column: 1 / -1; background: linear-gradient(135deg, rgba(76,161,175,0.08), rgba(44,62,80,0.05)); padding: 20px 24px; margin-top: 8px; border-radius: 12px; border: 1px solid rgba(76,161,175,0.2);">
            <h4 style="color: #2c3e50; margin: 0 0 12px; font-size: 0.98rem;"><i class="fas fa-users"></i> ${translate('team.our_research_team')}</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; font-size: 0.9rem; color: #546e7a;">
                <span>Santelices, Clarence Andrei B. (${translate('team.research_leader')})</span>
                <span style="color: #4ca1af;">•</span>
                <span>Aragon, Christian Lloyd M.</span>
                <span style="color: #4ca1af;">•</span>
                <span>Galano, John Libee L.</span>
                <span style="color: #4ca1af;">•</span>
                <span>Morondos, Mikeria Angela F.</span>
            </div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

// ─── Department data for org chart ───────────────────────────────────────────
const ORG_DEPARTMENTS = [
    {
        label: 'Administration',
        icon: '👨‍💼',
        color: '#2c3e50',
        folder: null,  // uses placeholder principal card
        members: []    // populated by principal card only
    },
    {
        label: 'Non-Teaching',
        icon: '🗂️',
        color: '#e67e22',
        folder: 'Non - Teaching Personnel [r',
        members: ['ABAD', 'AGUILAR', 'ALCANTARA', 'ANCOG', 'APOLINAR', 'BAILON', 'CARIASA', 'DALIGUES', 'DOMINGO-1', 'FELIX-T.-BUNAGAN', 'HEYRES', 'JAVIER', 'MAGALONA', 'MICABALO', 'PADUA2-1', 'PAEZ', 'PALMAN', 'REYES', 'ROLDAN', 'SACLOTE', 'SANTOS-1', 'SANTOS-O', 'SUMALBAG', 'VENTURA-1']
    },
    {
        label: 'Senior High School',
        icon: '🎓',
        color: '#8e44ad',
        folder: 'Senior High School org chart',
        members: ['2-FLORES-1', '2-LAUD', 'ABRAZALDO', 'ADDATU', 'ARGUELLES', 'BARACEROS', 'BEDON', 'BULAN', 'BURAGA', 'CERVANTES', 'CHAN', 'CRUZ', 'DAMASCO', 'DIZON', 'DOLATRE', 'ESPIRITU', 'GALLETA', 'GERUNDIO', 'IRLANDEZ-D', 'IRLANDEZ-MC', 'LEONES', 'LORENZO', 'LUNA', 'MAMAUAG', 'MARIANO', 'MOSADA', 'NOCELO', 'PAREDES', 'PEPITO', 'RAYMUNDO', 'SALAS', 'SANCHEZ', 'SANTOS', 'SAULON', 'SAYSON', 'SUAVILLO', 'SUGBO', 'TONGCO']
    },
    {
        label: 'Math',
        icon: '📐',
        color: '#27ae60',
        folder: 'Math department org chart',
        members: ['2-AGUILAN', 'ADRIAS', 'ALETA', 'BONDOC', 'CLORES', 'CUEVAS', 'DACECO', 'DAGOOC', 'DECANO', 'DOMINGO', 'MABBORANG', 'MORLA', 'PILI', 'PUNONGBAYAN', 'QUINTUA', 'RESULTO', 'SABADO', 'SUMPAY', 'VILLAMER']
    },
    {
        label: 'Science',
        icon: '🔬',
        color: '#16a085',
        folder: 'Science Department org chart',
        members: ['2-PENULIAR', 'ABARIENTOS', 'ALCALA', 'ANIS', 'ANONUEVO', 'ARELLANO', 'CALIBOSO', 'COLCOL', 'MAGSISI', 'MENDE', 'MESA', 'PILITINA', 'ROSALES', 'SAMANIEGO', 'SANCHEZ-1', 'SANGDAAN', 'VARGAS', 'VENTURA', 'VINELES']
    },
    {
        label: 'English',
        icon: '📖',
        color: '#2980b9',
        folder: 'English department org chart',
        members: ['2-CADUHADA', 'AGUSTIN', 'APOSTOL', 'CARREON', 'DADERO', 'DANAO', 'DEL-ROSARIO', 'IGHARAS', 'MAMBA', 'MANIEGO', 'MARTINEZ', 'MESINA', 'MINGASCA', 'PACNIS', 'RAMOS', 'SABURNIDO', 'VILLANUEVA']
    },
    {
        label: 'Filipino',
        icon: '📜',
        color: '#c0392b',
        folder: 'Filipino department org chart',
        members: ['2-VALENCIA', 'ABRENICA', 'ATAIZA', 'DAG-O', 'ECO', 'ENRIJO', 'FERNANDEZ', 'FRANCISCO', 'LUNDAG', 'MANLONGAT', 'MARTINEZ', 'MATITU', 'MAURICIO', 'PONTILLAS', 'REGALADO', 'SAN-PEDRO', 'SEBASTIAN', 'SOHAL']
    },
    {
        label: 'Araling Panlipunan',
        icon: '🌏',
        color: '#d35400',
        folder: 'Araling panlipunan department org chart',
        members: ['2-AMARANTE', 'ABAD', 'ALDE', 'ANONUEVO', 'BALOLOY', 'BARTOLOME', 'CANCERAN', 'DACANAY', 'DELA-CERNA', 'ESTACIO', 'OREGAS', 'PUSA', 'QUIAEM', 'RODRIGUEZ', 'TERCE']
    },
    {
        label: 'MAPEH',
        icon: '🎨',
        color: '#e91e63',
        folder: 'Mapeh department org chart',
        members: ['2-PAYUMO', 'ANDES', 'CASTRO', 'CUSIPAG', 'ESCASINAS', 'GACIAS', 'GARCIA', 'GAVINO', 'MACABADBAD', 'MICLAT', 'NAYVE', 'OSMENA', 'REEDYK', 'SANTIAGO', 'TALLO', 'TIPON', 'TORRES-768x576']
    },
    {
        label: 'TLE',
        icon: '🔧',
        color: '#795548',
        folder: 'TLE department org chart',
        members: ['2-FLORES', 'ANGELES', 'ANTOLIN', 'ARIAS', 'AUDAL', 'BAYLOSIS', 'BOLANIO', 'BORROMEO', 'BUENA', 'CANCAN', 'DAULONG', 'DIAMSE', 'LAPUT', 'LLABORE', 'MAGTARAYO', 'PEREZ', 'TUGANO', 'VICEDOR']
    },
    {
        label: 'ESP',
        icon: '🌱',
        color: '#00897b',
        folder: 'ESP department org chart',
        members: ['2-MAYBITUIN', 'ABAD-1', 'ANDICOY-1', 'BANDONG', 'BIAGTAN', 'FRANCO', 'JOAQUIN', 'MACABEO', 'MEMPIN', 'OSERA-1', 'RACINES', 'RIVERA', 'ROSE-1', 'SUZUKI', 'TORRES-1', 'TUNGCUL']
    },
    {
        label: 'Guidance',
        icon: '💬',
        color: '#5c6bc0',
        folder: 'Guidance and Counseling org chart',
        members: ['2-VALENCIA', 'ANDICOY', 'BOBILES', 'MENDE-1', 'OSERA', 'ROSE']
    }
];

function getOrgMemberImg(folder, memberName) {
    // Try .png first, then .jpg
    const base = folder + '/' + memberName;
    return base + '.png'; // onerror will try .jpg fallback
}

function renderOrgDepartment(deptIndex) {
    const dept = ORG_DEPARTMENTS[deptIndex];
    const panel = document.getElementById('org-dept-panel');
    if (!panel) return;

    // Update active tab style
    document.querySelectorAll('.org-dept-tab').forEach((t, i) => {
        t.style.background = i === deptIndex ? dept.color : 'rgba(255,255,255,0.12)';
        t.style.fontWeight = i === deptIndex ? '700' : '500';
        t.style.transform = i === deptIndex ? 'scale(1.04)' : '';
    });

    if (dept.folder === null) {
        // Administration tab — show principal photo
        panel.innerHTML = `
            <div style="text-align:center; padding: 30px 20px;">
                <div style="
                    width: 160px; height: 200px; margin: 0 auto 18px;
                    border-radius: 16px; overflow: hidden;
                    box-shadow: 0 6px 24px rgba(0,0,0,0.13);
                    border: 3px solid #4ca1af;
                ">
                    <img src="Principal.jpg" onerror="this.src='placeholderimg.jpg'" alt="School Principal"
                         style="width:100%; height:100%; object-fit:cover; object-position:top;">
                </div>
                <h3 style="color:#2c3e50; margin:0 0 4px; font-size:1.1rem;">G. Noly B. Francisco</h3>
                <p style="color:#546e7a; font-size:0.85rem; margin:0 0 2px; font-weight:600;">School Principal</p>
                <p style="color:#546e7a; font-size:0.83rem; margin:0;">Makati High School</p>
            </div>
        `;
        return;
    }

    // Determine image extension per member (try .png, onerror .jpg)
    const knownJpg = ['CERVANTES', 'PADUA2-1', 'ANGELES'];
    let cards = dept.members.map(name => {
        const displayName = name
            .replace(/^2-/, '')
            .replace(/-\d+$/, '')
            .replace(/-768x576$/, '')
            .replace(/-[A-Z]$/, m => ' ' + m.slice(1))
            .replace(/-/g, ' ');
        const enc = s => s.replace(/ /g, '%20').replace(/\[/g, '%5B').replace(/\]/g, '%5D');
        const ext = knownJpg.includes(name) ? '.jpg' : '.png';
        const src = enc(dept.folder + '/' + name + ext);
        const fallbackPng = enc(dept.folder + '/' + name + '.png');
        const fallbackJpg = enc(dept.folder + '/' + name + '.jpg');
        return `
            <div style="
                background: white; border-radius: 12px; overflow: hidden;
                box-shadow: 0 3px 12px rgba(0,0,0,0.09);
                border: 1px solid #ecf0f1;
                transition: transform 0.18s, box-shadow 0.18s;
            "
            onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'"
            onmouseout="this.style.transform=''; this.style.boxShadow='0 3px 12px rgba(0,0,0,0.09)'">
                <div style="height:160px; overflow:hidden; background:#ecf0f1;">
                    <img src="${src}"
                         data-fallback1="${fallbackPng}"
                         data-fallback2="${fallbackJpg}"
                         onerror="if(this.src!==this.dataset.fallback1&&this.src!==this.dataset.fallback2){this.src=this.src.endsWith('.png')?this.dataset.fallback2:this.dataset.fallback1}else{this.src='placeholderimg.jpg';this.onerror=null}"
                         alt="${displayName}"
                         style="width:100%; height:100%; object-fit:cover; object-position:top;">
                </div>
                <div style="padding:10px 12px; text-align:center;">
                    <div style="font-weight:700; color:#2c3e50; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.3px;">${displayName}</div>
                </div>
            </div>
        `;
    }).join('');

    panel.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:14px; padding:20px;">
            ${cards}
        </div>
    `;
}

function showOrgChart() {
    const cardGrid = document.getElementById('card-grid');

    // Build department tab buttons
    const tabsHtml = ORG_DEPARTMENTS.map((dept, i) => `
        <button class="org-dept-tab" onclick="renderOrgDepartment(${i})" style="
            background: rgba(255,255,255,0.12);
            border: none; color: white;
            padding: 8px 14px; border-radius: 20px;
            cursor: pointer; font-size: 0.82rem; font-weight: 500;
            transition: transform 0.15s, background 0.15s;
            white-space: nowrap;
        ">${dept.icon} ${dept.label}</button>
    `).join('');

    cardGrid.innerHTML = `
        <!-- Back bar -->
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #1f6dad, #2980b9); color:white; border-radius:12px;">
            <button onclick="AboutUs()" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            <h3 style="margin:0; border:none; color:white;"><i class="fas fa-sitemap"></i> School Organizational Chart</h3>
        </div>

        <!-- Principal highlight card -->
        <div class="card" style="grid-column: 1 / -1; border-radius:14px; overflow:hidden; box-shadow:0 6px 24px rgba(0,0,0,0.10); border:1px solid rgba(76,161,175,0.22);">
            <div style="background:linear-gradient(90deg,#2c3e50,#4ca1af); padding:16px 22px; color:white;">
                <h3 style="margin:0; border:none; color:white; font-size:1.15rem;"><i class="fas fa-user-tie"></i> School Principal</h3>
            </div>
            <div style="padding:28px 24px; display:flex; align-items:center; gap:28px; flex-wrap:wrap;">
                <!-- Principal photo -->
                <div style="
                    flex-shrink:0; width:180px; height:220px;
                    border-radius:16px; overflow:hidden;
                    box-shadow:0 8px 28px rgba(0,0,0,0.18);
                    border:4px solid #4ca1af;
                ">
                    <img src="Principal.jpg" onerror="this.src='placeholderimg.jpg'" alt="School Principal"
                         style="width:100%; height:100%; object-fit:cover; object-position:top;">
                </div>
                <div style="flex:1; min-width:200px;">
                    <h3 style="margin:0 0 4px; color:#2c3e50; font-size:1.3rem;">G. Noly B. Francisco</h3>
                    <p style="margin:0 0 4px; color:#546e7a; font-size:0.95rem; font-weight:600;">School Principal</p>
                    <p style="margin:0 0 14px; color:#546e7a; font-size:0.9rem;">Makati High School — Makati City</p>
                </div>
            </div>
        </div>

        <!-- Accuracy warning banner -->
        <div class="card" style="grid-column: 1 / -1; background:linear-gradient(135deg,#fff3cd,#ffeeba); border-radius:12px; border-left:6px solid #f39c12; padding:18px 22px;">
            <div style="display:flex; align-items:flex-start; gap:14px;">
                <span style="font-size:2rem; flex-shrink:0;">⚠️</span>
                <div>
                    <h4 style="margin:0 0 6px; color:#856404; font-size:1rem;"><strong>Accuracy Notice</strong></h4>
                    <p style="margin:0; font-size:0.88rem; color:#7d5e00; line-height:1.65;">
                        The photos and names shown below are sourced from the official Makati High School website. Since the website has not been updated recently, some information — including staff assignments, photos, and names — <strong>may no longer be accurate or current</strong>. Please verify with the school administration for the most up-to-date information.
                    </p>
                </div>
            </div>
        </div>

        <!-- Department tabs + photo panel -->
        <div class="card" style="grid-column: 1 / -1; border-radius:14px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.08); padding:0;">
            <!-- Tab bar -->
            <div style="background:linear-gradient(90deg,#1f6dad,#2980b9); padding:16px 18px; display:flex; flex-wrap:wrap; gap:8px;">
                ${tabsHtml}
            </div>
            <!-- Staff photo grid (populated by renderOrgDepartment) -->
            <div id="org-dept-panel" style="background:#f8fafc; min-height:200px;"></div>
        </div>
    `;

    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';

    // Default to Administration tab
    renderOrgDepartment(0);
}

function readAnnouncements() {
    const cardGrid = document.getElementById('card-grid');

    // Default Announcements (school announcements)
    const defaultAnnouncements = [
        "Fourth Quarter Exams scheduled for March 12 and 13, 2026",
        "End-of-School-Year Rites on March 30-31, 2026",
        "Parent-Teacher Conference after quarterly exams",
        "Submit all clearance requirements before EOSY Rites",
        "Report cards will be distributed after quarter exams",
        "School Year 2025-2026 ends on March 31, 2026"
    ];

    let announcements = defaultAnnouncements;
    try {
        const stored = localStorage.getItem('kiosk_announcements');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                announcements = parsed.map(a => typeof a === 'string' ? a : (a.content || a.title || ''));
            }
        }
    } catch (e) { console.warn('Error loading announcements:', e); }

    let announcementsHtml = '';
    announcements.forEach(a => {
        const text = typeof a === 'string' ? a : (a.content || a.title || '');
        if (text) announcementsHtml += `<li>${text}</li>`;
    });

    cardGrid.innerHTML = `
        <div class="card about-title-card" style="grid-column: 1 / -1;">
            <h3><i class="fas fa-bullhorn"></i> School Announcements</h3>
            <p>Latest updates and important notices</p>
        </div>
        <div class="card" style="grid-column: 1 / -1;">
            <ul class="event-list">${announcementsHtml}</ul>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}


function getDirections() {
    document.getElementById('assistant-modal').style.display = 'none';
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) mapContainer.scrollIntoView({ behavior: 'smooth' });
}


function callSchool() {
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
    alert('School Contact Numbers:\n\nPrincipal\'s Office: 890-8320\nMain Office: 890-5938\n\nYou can call during office hours (7:00 AM - 5:00 PM)');
}

function showDirectory() {
    const cardGrid = document.getElementById('card-grid');

    // Generate directory items dynamically from buildingImages
    let directoryItems = '';
    const buildings = Object.keys(buildingImages).sort();

    buildings.forEach(bName => {
        const bData = buildingImages[bName];
        if (bData && bData.floorData) {
            Object.keys(bData.floorData).sort().forEach(floor => {
                const rooms = bData.floorData[floor];
                rooms.forEach(room => {
                    // Create list item for each room
                    // Escape single quotes in label for onclick
                    const safeLabel = room.label.replace(/'/g, "\\'");
                    const safeBuilding = bName.replace(/'/g, "\\'");

                    directoryItems += `
                        <li onclick="locateRoom('${safeBuilding}', '${safeLabel}')" style="cursor:pointer;" class="clickable-row">
                            <span>${room.label}</span> 
                            <span>${bName}, Floor ${floor}</span>
                        </li>
                    `;
                });
            });
        }
    });

    cardGrid.innerHTML =
        '<div class="card">' +
        `<h3><i class="fas fa-users"></i> ${translate('headers.staff_directory')}</h3>` +
        `<p style="text-align: center; color: #666; font-size: 0.9rem;">${translate('labels.tap_office')}</p>` +
        '<ul class="directory-list">' +
        directoryItems +
        '</ul>' +
        '</div>';
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function viewNews() {
    window.currentView = 'news';
    const cardGrid = document.getElementById('card-grid');

    // Read mode directly from the toggle button's class — always accurate
    const modeBtn = document.getElementById('mode-toggle-btn');
    const online = modeBtn ? !modeBtn.classList.contains('mode-offline') : true;

    let embedContent = '';
    if (online) {
        embedContent = `
            <!-- Facebook Page Plugin Iframe (max plugin width is 500px) -->
            <div style="width:100%; display:flex; justify-content:center; align-items:flex-start; padding:16px 0;">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FmakatiHS1968%2F&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="500"
                    height="700"
                    style="border:none; display:block; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.15);"
                    scrolling="yes"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    sandbox="allow-scripts allow-same-origin allow-popups">
                </iframe>
            </div>`;
    } else {
        embedContent = `
            <div style="width:100%; padding: 10px 0;">
                <!-- Offline notice banner -->
                <div style="
                    background: linear-gradient(135deg, #2c3e50, #4ca1af);
                    color: white; border-radius: 10px; padding: 14px 20px;
                    display: flex; align-items: center; gap: 14px;
                    margin-bottom: 20px; font-size: 0.9rem;
                ">
                    <span style="font-size:1.8rem;">📵</span>
                    <span>You're in <strong>Offline Mode</strong>. Showing saved highlights — switch to Online for the live feed.</span>
                </div>

                <!-- Placeholder news cards using local images -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;">

                    <div style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 3px 12px rgba(0,0,0,0.1);">
                        <img src="589431807_815813444550227_3889086255111213921_n.jpg"
                             onerror="this.src='placeholderimg.jpg'"
                             alt="MHS Event" style="width:100%; height:160px; object-fit:cover;">
                        <div style="padding:14px;">
                            <span style="font-size:0.75rem; color:#4ca1af; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">School Event</span>
                            <h4 style="margin:6px 0 6px; color:#2c3e50; font-size:0.95rem;">Makati High School Highlights</h4>
                            <p style="font-size:0.82rem; color:#666; margin:0; line-height:1.5;">Celebrating milestones and achievements at MHS. Follow the official Facebook page for the latest updates.</p>
                        </div>
                    </div>

                    <div style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 3px 12px rgba(0,0,0,0.1);">
                        <img src="589285849_1378908313740486_2189791204943876101_n.jpg"
                             onerror="this.src='placeholderimg.jpg'"
                             alt="MHS News" style="width:100%; height:160px; object-fit:cover;">
                        <div style="padding:14px;">
                            <span style="font-size:0.75rem; color:#4ca1af; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Campus News</span>
                            <h4 style="margin:6px 0 6px; color:#2c3e50; font-size:0.95rem;">Campus Life &amp; Activities</h4>
                            <p style="font-size:0.82rem; color:#666; margin:0; line-height:1.5;">Stay connected with the MHS community. Visit <strong>facebook.com/makatiHS1968</strong> when online for more.</p>
                        </div>
                    </div>

                    <div style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 3px 12px rgba(0,0,0,0.1);">
                        <img src="placeholderimg.jpg"
                             alt="More News" style="width:100%; height:160px; object-fit:cover;">
                        <div style="padding:14px;">
                            <span style="font-size:0.75rem; color:#4ca1af; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Announcements</span>
                            <h4 style="margin:6px 0 6px; color:#2c3e50; font-size:0.95rem;">Fourth Quarter Updates</h4>
                            <p style="font-size:0.82rem; color:#666; margin:0; line-height:1.5;">Fourth Quarter Exams: <strong>March 19–20, 2026</strong>. End-of-School-Year Rites: <strong>March 30–31, 2026</strong>.</p>
                        </div>
                    </div>

                </div>
            </div>`;
    }

    cardGrid.innerHTML = `
        <div class="card about-title-card">
            <h3><i class="fas fa-newspaper"></i> Campus News</h3>
            <p>Stay updated with our latest social media posts</p>
        </div>

        <div class="card" style="grid-column: 1 / -1; padding: 0; overflow: hidden;">
            ${embedContent}
            
            <div style="margin-top: 20px; text-align: center; color: #666; font-size: 0.9rem; width: 100%; display: none;">
                <p>To change the Facebook page, edit the <code>src</code> attribute in the <code>viewNews</code> function inside Kiosk.html</p>
            </div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

// Chatbot message history for display
let chatHistory = [];

// Helper to find room locations across all buildings
function findRoomLocations(roomNumber) {
    const results = [];
    if (typeof buildingImages === 'undefined') return results;

    for (const [bldgName, bldgData] of Object.entries(buildingImages)) {
        if (!bldgData.floorData) continue;
        for (const [floor, rooms] of Object.entries(bldgData.floorData)) {
            for (const room of rooms) {
                // Check if label contains the room number (e.g., "Room 101", "101")
                // strict check usually better: includes " " + number or ends with number
                if (room.label.includes(roomNumber) || room.label.endsWith(' ' + roomNumber)) {
                    results.push({
                        building: bldgName,
                        floor: floor,
                        room: room
                    });
                }
            }
        }
    }
    return results;
}

// Function to view a specific room directly
// Function to view a specific room directly
function viewSpecificRoom(buildingName, roomName, roomData, floor) {
    // 1. Open the directory
    showCampusDirectory();

    // 2. Select the building after a short delay to allow transition
    setTimeout(() => {
        if (floor) {
            viewFloor(buildingName, floor);
        } else {
            viewBuilding(buildingName);
        }
    }, 300);
}

function openChatbot() {
    document.getElementById('assistant-modal').style.display = 'none';
    chatHistory = [];
    const cardGrid = document.getElementById('card-grid');

    // Quick Prompts Data
    const quickPrompts = [
        { label: "📍 Where is the Clinic?", query: "Where is the clinic?" },
        { label: "📅 School Events", query: "Show me school events" },
        { label: "⏰ Bell Schedule", query: "What is the school schedule?" },
        { label: "👮 Principal's Office", query: "Where is the principal?" },
        { label: "📞 Contact Numbers", query: "School contact numbers" },
        { label: "🚻 Comfort Rooms", query: "Where are the comfort rooms?" }
    ];

    const promptsHtml = quickPrompts.map(p => `
        <button onclick="sendQuickPrompt('${p.query}')" style="
            background: #fff; border: 1px solid #e0e0e0; border-radius: 20px;
            padding: 8px 14px; font-size: 0.9rem; color: #555; cursor: pointer;
            transition: all 0.2s; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        " onmouseover="this.style.background='#f0f4f8'; this.style.color='#2c3e50'; this.style.transform='translateY(-2px)'"
          onmouseout="this.style.background='#fff'; this.style.color='#555'; this.style.transform='translateY(0)'">
            ${p.label}
        </button>
    `).join('');

    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; background: linear-gradient(135deg, #2c3e50, #4ca1af); color: white; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px;">
            <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 50%;">
                <i class="fas fa-robot" style="font-size: 2rem;"></i>
            </div>
            <div>
                <h2 style="margin: 0; font-size: 1.5rem;">AI School Assistant</h2>
                <p style="margin: 5px 0 0; opacity: 0.9;">Ask me anything about rooms, schedules, or events!</p>
            </div>
        </div>

        <div class="card" id="chatbot-card" style="grid-column: 1 / -1; padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 60vh; max-height: 700px; min-height: 500px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">

            <!-- Chat message history -->
            <div id="chatbot-messages" style="
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f4f6f9;
                display: flex;
                flex-direction: column;
                gap: 15px;
            ">
                <div style="text-align:center; margin: 20px 0;">
                    <div style="width: 60px; height: 60px; background: #fff; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        <i class="fas fa-robot" style="font-size: 1.8rem; color: #4ca1af;"></i>
                    </div>
                    <p style="color: #7f8c8d; font-size: 0.95rem;">Hello! I'm your virtual guide.<br>Tap a quick topic below or type your question.</p>
                </div>

                <!-- Quick Prompts Container -->
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 20px;">
                    ${promptsHtml}
                </div>
            </div>

            <!-- Composer bar -->
            <div id="chatbot-composer" style="
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px;
                background: #fff;
                border-top: 1px solid #eee;
            ">
                <div style="flex: 1; position: relative;">
                    <input
                        type="text"
                        id="chatbot-input"
                        placeholder="Type your question..."
                        autocomplete="off"
                        style="
                            width: 100%;
                            padding: 14px 20px;
                            padding-right: 50px;
                            border: 2px solid #e0e0e0;
                            border-radius: 30px;
                            font-size: 1rem;
                            outline: none;
                            transition: border-color 0.2s;
                            background: #f9f9f9;
                        "
                        onfocus="this.style.borderColor='#4ca1af'; this.style.background='#fff';"
                        onblur="this.style.borderColor='#e0e0e0'; this.style.background='#f9f9f9';"
                        onkeydown="if(event.key==='Enter'){ sendChatbotMessage(); }"
                    >
                </div>
                
                <button onclick="sendChatbotMessage()" style="
                    background: linear-gradient(135deg, #4ca1af, #2c3e50);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 54px;
                    height: 54px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 4px 10px rgba(76,161,175,0.3);
                    transition: transform 0.2s;
                " onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'" title="Send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            
             <div style="background: #eee; padding: 8px; text-align: center;">
                <button onclick="toggleChatbotKeyboard()" style="
                    background: #fff;
                    color: #555;
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    padding: 8px 20px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                ">
                    <i class="fas fa-keyboard"></i> Toggle Virtual Keyboard
                </button>
            </div>
        </div>
    `;

    // Focus the input and show keyboard automatically
    setTimeout(function () {
        const inp = document.getElementById('chatbot-input');
        if (inp) {
            inp.focus();
            currentInput = inp;
        }
        const keyboard = document.getElementById('virtual-keyboard');
        if (keyboard) keyboard.style.display = 'block';
    }, 200);
}

// Helper to send quick prompt
function sendQuickPrompt(query) {
    const inp = document.getElementById('chatbot-input');
    if (inp) {
        inp.value = query;
        sendChatbotMessage();
    }
}

// Append a message bubble to the chat history display
// Append a message bubble to the chat history display
function appendChatMessage(sender, text, actions = []) {
    const messagesEl = document.getElementById('chatbot-messages');
    if (!messagesEl) return;

    chatHistory.push({ sender, text });

    const isUser = sender === 'user';
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        justify-content: ${isUser ? 'flex-end' : 'flex-start'};
        align-items: flex-start;
        gap: 10px;
        animation: fadeIn 0.3s ease;
    `;

    // Avatar
    const avatar = document.createElement('div');
    if (!isUser) {
        avatar.innerHTML = `<i class="fas fa-robot" style="color: white; font-size: 0.9rem;"></i>`;
        avatar.style.cssText = `
            width: 36px; height: 36px; border-radius: 50%; 
            background: linear-gradient(135deg, #4ca1af, #2c3e50);
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
    }

    // Message Bubble
    const bubble = document.createElement('div');
    const bubbleStyle = isUser
        ? 'background: linear-gradient(135deg, #4ca1af, #2c3e50); color: white; border-radius: 18px 18px 4px 18px;'
        : 'background: #fff; color: #2c3e50; border-radius: 18px 18px 18px 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #eff2f5;';

    bubble.innerHTML = `
        <div style="${bubbleStyle} padding: 12px 18px; max-width: 100%; font-size: 0.95rem; line-height: 1.5;">
            ${text.replace(/\n/g, '<br>')}
        </div>
    `;

    // Add Actions (Buttons) if present
    if (actions && actions.length > 0 && !isUser) {
        const actionContainer = document.createElement('div');
        actionContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;';

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.innerHTML = action.label;
            btn.setAttribute('onclick', action.onclick); // Ensure exact string is used
            btn.style.cssText = `
                background: #eaf4fb; color: #2980b9; border: 1px solid #d6eaf8;
                border-radius: 15px; padding: 6px 14px; font-size: 0.85rem; cursor: pointer;
                transition: all 0.2s; font-weight: 500;
            `;
            btn.onmouseover = function () { this.style.background = '#d6eaf8'; };
            btn.onmouseout = function () { this.style.background = '#eaf4fb'; };
            actionContainer.appendChild(btn);
        });
        bubble.appendChild(actionContainer);
    }

    // Assemble
    if (!isUser) container.appendChild(avatar);
    container.appendChild(bubble);

    messagesEl.appendChild(container);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

// ─── Offline FAQ Engine ────────────────────────────────────────────────────────

const FAQ_DATA = [
    // Greetings
    {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good day', 'kumusta', 'kamusta'],
        response: 'Hello! 👋 Welcome to Makati High School. I\'m here to help you find rooms, offices, schedules, and more. What would you like to know?',
        actions: []
    },
    // Thanks
    {
        patterns: ['thank', 'thanks', 'salamat', 'maraming salamat'],
        response: 'You\'re welcome! 😊 Feel free to ask me anything else about Makati High School.',
        actions: []
    },
    // Who are you / What can you do
    {
        patterns: ['who are you', 'what can you do', 'what do you know', 'help me', 'how do you work', 'ano kaya mo'],
        response: 'I\'m the Makati High School Kiosk Assistant! 🤖\n\nI can help you with:\n• 📍 Finding rooms and offices\n• 📅 School events and schedules\n• 📞 Contact numbers\n• 🏫 Building locations (A, B, C, D)\n• 📋 Announcements\n• 🎓 General school information',
        actions: [
            { label: '📍 View Map', onclick: "showCampusDirectory()" },
            { label: '📅 View Events', onclick: "viewEvents()" },
            { label: '📰 View News', onclick: "viewNews()" }
        ]
    },
    // Principal's Office
    {
        patterns: ['principal', 'principal office', 'opisina ng principal', 'head'],
        response: '🏫 The Principal\'s Office is located in Building B (Second Floor).\n\n📞 Contact: 890-8320\n⏰ Office Hours: 7:00 AM – 5:00 PM, Monday to Friday',
        actions: [
            { label: '📍 Show Location', onclick: "viewSpecificRoom('Building B', 'Principal Office', { label: 'Principal Office', desc: 'Main Office of the School Principal', img: 'placeholderimg.jpg' })" },
            { label: '📞 Call Now', onclick: "callSchool()" }
        ]
    },
    // Guidance / Counselor
    {
        patterns: ['guidance', 'counselor', 'counseling', 'gabay'],
        response: '💙 The Guidance & Counseling Office is located in Building C, Floor 1.\n\nThe guidance counselors are available to help students with academic, personal, and career concerns.\n⏰ Office Hours: 7:00 AM – 5:00 PM',
        actions: [
            { label: '📍 Show Location', onclick: "viewSpecificRoom('Building C', 'Guidance Office', { label: 'Guidance Office', desc: 'Student Counseling and Support', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Library
    {
        patterns: ['library', 'libro', 'aklatan', 'books', 'reading', 'read', 'magbasa', 'research', 'internet'],
        response: '📚 The School Library is located in Building B.\n\n⏰ Library Hours: 7:00 AM – 5:00 PM\nStudents may borrow books with a valid library card. Silence is required inside the library.',
        actions: [
            { label: '📍 View Building B', onclick: "viewBuilding('Building B')" }
        ]
    },
    // Clinic / Nurse
    {
        patterns: ['clinic', 'nurse', 'health', 'sick', 'may sakit', 'medical', 'first aid', 'doctor', 'gamot', 'medicine', 'emergency', 'injury', 'blood pressure'],
        response: '🏥 The School Clinic (Health Office) is located in Building A, Ground Floor.\n\nA school nurse is available for first aid and minor medical concerns.\n⏰ Available: 7:00 AM – 5:00 PM',
        actions: [
            { label: '📍 Show Clinic', onclick: "viewSpecificRoom('Building A', 'School Clinic', { label: 'School Clinic', desc: 'Medical and Health Services', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Canteen / Cafeteria
    {
        patterns: ['canteen', 'cafeteria', 'food', 'kumain', 'lunch', 'meal', 'tindahan', 'gutom', 'hungry', 'snack', 'drinks', 'tubig', 'water'],
        response: '🍽️ The School Canteen is located near the ground floor between Buildings B and D.\n\n⏰ Open Hours:\n• Breakfast: 6:30 AM – 7:30 AM\n• Recess: 10:00 AM – 10:30 AM\n• Lunch: 11:30 AM – 1:00 PM',
        actions: [
            { label: '📍 View Map', onclick: "showCampusDirectory()" }
        ]
    },
    // Registrar
    {
        patterns: ['registrar', 'registration', 'enrollment', 'record', 'tor', 'transcript', 'form 137'],
        response: '📋 The Registrar\'s Office is located in Building C, Floor 1.\n\nFor student records, TOR, Form 137, and enrollment concerns.\n⏰ Office Hours: 7:00 AM – 5:00 PM\n📞 Contact: 890-5938',
        actions: [
            { label: '📍 Show Location', onclick: "viewSpecificRoom('Building C', 'Registrar Office', { label: 'Registrar Office', desc: 'Student Records and Enrollment', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Comfort Room / Restroom
    {
        patterns: ['comfort room', 'cr', 'restroom', 'bathroom', 'toilet', 'banyo', 'comfort'],
        response: '🚻 Comfort rooms are available on every floor of all buildings (A, B, C, D).\n\nPlease keep them clean for everyone. Report any maintenance issues to the Building Administrator.',
        actions: [
            { label: '📍 View Campus Map', onclick: "showCampusDirectory()" }
        ]
    },
    // Gymnasium / Gym
    {
        patterns: ['gym', 'gymnasium', 'pe', 'physical education', 'sports', 'palakasan'],
        response: '🏋️ The Gymnasium / PE Area is located at the back of the campus, near Building D.\n\nUsed for Physical Education classes, sports events, and school assemblies.',
        actions: [
            { label: '📍 View Building D', onclick: "viewBuilding('Building D')" }
        ]
    },
    // Building A
    {
        patterns: ['building a', 'bldg a', 'bldg. a', 'building a'],
        response: '🏢 Building A (Cyan/Teal Building) — Left side of campus\n\n📍 Contains: Classrooms on Floor 1 & 2\n• Floor 1: Rooms 101, 102\n• Floor 2: Rooms 201, 202\n\nClick below to explore!',
        actions: [
            { label: '🏢 View Building A', onclick: "viewBuilding('Building A')" }
        ]
    },
    // Building B
    {
        patterns: ['building b', 'bldg b', 'bldg. b'],
        response: '🏢 Building B (Yellow Building) — Center-left of campus\n\n📍 Contains: Classrooms, Computer Lab, Library\n• Floor 1: Rooms 101, 102\n• Floor 2: Rooms 201, 202\n\nClick below to explore!',
        actions: [
            { label: '🏢 View Building B', onclick: "viewBuilding('Building B')" }
        ]
    },
    // Building C
    {
        patterns: ['building c', 'bldg c', 'bldg. c'],
        response: '🏢 Building C (Purple Building) — Right side of campus\n\n📍 Contains: Admin Offices, Principal, Registrar, Guidance\n• Floor 1: Room 101\n• Floor 2: Room 201\n\nClick below to explore!',
        actions: [
            { label: '🏢 View Building C', onclick: "viewBuilding('Building C')" }
        ]
    },
    // Building D
    {
        patterns: ['building d', 'bldg d', 'bldg. d'],
        response: '🏢 Building D (Red Building) — Bottom-center of campus\n\n📍 Contains: Classrooms, PE/Science Area\n• Floor 1: Rooms 101, 102\n• Floor 2: Rooms 201, 202\n\nClick below to explore!',
        actions: [
            { label: '🏢 View Building D', onclick: "viewBuilding('Building D')" }
        ]
    },
    // Events
    {
        patterns: ['event', 'events', 'activity', 'activities', 'upcoming', 'schedule', 'palakasan'],
        response: '📅 Upcoming Events at Makati High School:\n\n• 📝 Fourth Quarter Exams — March 19–20, 2026\n• 🎓 End-of-School-Year Rites — March 30–31, 2026\n• 👨‍👩‍👧 Parent-Teacher Conference — After Quarter Exams\n• 🏀 Basketball Tournament — Feb 25, 3:00 PM\n• 🔬 Science Fair — Feb 20, 9:00 AM\n\nCheck the Events section for more details!',
        actions: [
            { label: '📅 View All Events', onclick: "viewEvents()" }
        ]
    },
    // Announcements
    {
        patterns: ['announcement', 'announcements', 'anunsyo', 'news', 'balita', 'update'],
        response: '📣 Latest Announcements:\n\n• Fourth Quarter Exams: March 19–20, 2026\n• End-of-School-Year Rites: March 30–31, 2026\n• Submit clearance requirements before EOSY Rites\n• Report cards distributed after quarter exams\n• School Year 2025–2026 ends March 31, 2026\n\nStay tuned to the Announcements section for updates!',
        actions: [
            { label: '📢 Read Announcements', onclick: "readAnnouncements()" },
            { label: '📰 Social Media News', onclick: "viewNews()" }
        ]
    },
    // Exam / Quarter Exams
    {
        patterns: ['exam', 'exams', 'test', 'quarter exam', 'fourth quarter', '4th quarter', 'pagsusulit'],
        response: '📝 Fourth Quarter Examinations\n\n📅 Date: March 19–20, 2026\n\nMake sure to review your subjects and prepare your requirements. Good luck! 🍀\n\nFor concerns about exams, visit the Registrar\'s Office in Building C.',
        actions: [
            { label: '📅 Check Schedule', onclick: "viewEvents()" }
        ]
    },
    // Graduation / EOSY
    {
        patterns: ['graduation', 'eosy', 'end of school year', 'moving up', 'commencement', 'graduate'],
        response: '🎓 End-of-School-Year Rites (Graduation)\n\n📅 Date: March 30–31, 2026\n📍 Venue: School Gymnasium\n\nStudents must complete all clearance requirements before the EOSY Rites. Congratulations in advance! 🎉',
        actions: [
            { label: '📅 Check Events', onclick: "viewEvents()" }
        ]
    },
    // Clearance
    {
        patterns: ['clearance', 'requirements', 'submit clearance'],
        response: '📋 School Clearance\n\nAll students must submit clearance requirements before the EOSY Rites (March 30–31, 2026).\n\nVisit the Registrar\'s Office (Building C, Floor 1) for your clearance form and instructions.',
        actions: [
            { label: '📍 Go to Registrar', onclick: "viewSpecificRoom('Building C', 'Registrar Office', { label: 'Registrar Office', desc: 'Student Records and Enrollment', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Contact numbers
    {
        patterns: ['contact', 'phone', 'call', 'number', 'telepono', 'hotline'],
        response: '📞 Makati High School Contact Numbers:\n\n• Principal\'s Office: 890-8320\n• Main Office: 890-5938\n\n📍 Address: Gen. Luna Street Poblacion, Makati City\n⏰ Office Hours: 7:00 AM – 5:00 PM, Monday to Friday',
        actions: [
            { label: '📞 Call Now', onclick: "callSchool()" }
        ]
    },
    // Address / Location
    {
        patterns: ['address', 'location', 'where', 'saan', 'makati', 'lugar'],
        response: '📍 Makati High School\nGen. Luna Street Poblacion, Makati City\n\nThe school is accessible via public transport. Use the Campus Map in the main screen for directions!',
        actions: [
            { label: '🗺️ Open Map', onclick: "showCampusDirectory()" }
        ]
    },
    // Class schedule / School hours
    {
        patterns: ['class', 'schedule', 'school hours', 'time', 'start', 'dismiss', 'klase', 'oras'],
        response: '⏰ School Schedule:\n\n• School Gates Open: 6:00 AM\n• Classes Start: 7:00 AM\n• Dismissal (AM): 12:00 PM\n• Dismissal (PM): 5:00 PM\n\n📅 School days: Monday – Friday\n(Subject to change based on school announcements)',
        actions: []
    },
    // Flag ceremony / Flag raising
    {
        patterns: ['flag', 'ceremony', 'flag ceremony', 'flag raising', 'lunes', 'monday'],
        response: '🏳️ Flag Raising Ceremony\n\nEvery Monday morning before classes begin.\n\nAll students, teachers, and staff are expected to attend in proper school uniform.',
        actions: []
    },
    // Uniform
    {
        patterns: ['uniform', 'damit', 'dress code', 'attire'],
        response: '👕 School Uniform Policy:\n\n• Monday–Friday: Complete school uniform required\n• PE Days: PE uniform allowed during PE class only\n• ID must be worn at all times inside the campus\n\nFor uniform violations, report to the Discipline Office in Building C.',
        actions: [
            { label: '📍 Discipline Office', onclick: "viewSpecificRoom('Building C', 'Discipline Office', { label: 'Discipline Office', desc: 'Student Discipline and Conduct', img: 'placeholderimg.jpg' })" }
        ]
    },
    // ID
    {
        patterns: ['id', 'identification', 'school id', 'lose id', 'lost id'],
        response: '🪪 School ID\n\nAll students must wear their school ID at all times inside the campus.\n\nFor lost IDs or replacement:\n📍 Visit the Registrar\'s Office — Building C, Floor 1\n📞 Contact: 890-5938',
        actions: [
            { label: '📍 Go to Registrar', onclick: "viewSpecificRoom('Building C', 'Registrar Office', { label: 'Registrar Office', desc: 'Student Records and Enrollment', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Wifi / Internet
    {
        patterns: ['wifi', 'internet', 'connection', 'network'],
        response: '📡 School WiFi\n\nMakati High School has WiFi access in selected areas (library, admin offices).\n\nFor WiFi access issues, contact the ICT Office in Building B.',
        actions: [
            { label: '📍 View Building B', onclick: "viewBuilding('Building B')" }
        ]
    },
    // About the school
    {
        patterns: ['about', 'history', 'school', 'makati high', 'mhs', 'about school'],
        response: '🏫 About Makati High School\n\nMakati High School (MHS) is one of the premier public high schools in Makati City. Founded in 1968, it has been providing quality education to thousands of students.\n\n📍 Gen. Luna Street Poblacion, Makati City\n📞 890-8320 / 890-5938\n\nThe school has 4 buildings (A, B, C, D) with various classrooms, labs, offices, and facilities.',
        actions: [
            { label: '👥 Meet the Team', onclick: "AboutUs()" }
        ]
    },
    // How to find a room
    {
        patterns: ['how to find', 'find room', 'where is room', 'locate', 'hanap', 'hanapin'],
        response: '🗺️ How to Find a Room:\n\n1️⃣ Use the **Search Bar** at the top-left — type the room number or name\n2️⃣ Go to **Campus Directory** in the sidebar — click a building to see all rooms\n3️⃣ Ask me! Just type something like "Where is Room 101?" and I\'ll help!\n\nEach room has a "Tap for Directions" button that shows the path to get there.',
        actions: [
            { label: '🗺️ Go to Directory', onclick: "showCampusDirectory()" }
        ]
    },
    // Goodbye
    {
        patterns: ['bye', 'goodbye', 'paalam', 'see you', 'exit', 'close', 'quit'],
        response: 'Thank you for using the Makati High School Kiosk! 👋\n\nHave a great day and good luck with your classes! 🎓',
        actions: []
    },
    // Social Media / Facebook
    {
        patterns: ['facebook', 'fb', 'page', 'social media', 'online', 'post'],
        response: '📱 **Official Social Media**\n\nStay updated with our latest news and announcements!\n\nYou can view the latest posts from our Facebook Page right here.',
        actions: [
            { label: '📰 View News Feed', onclick: "viewNews()" },
            { label: '📅 View Events', onclick: "viewEvents()" }
        ]
    },
    // Mission and Vision
    {
        patterns: ['mission', 'vision', 'goal', 'objective', 'layunin'],
        response: '📜 **DepEd Mission**:\nTo protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:\nStudents learn in a child-friendly, gender-sensitive, safe, and motivating environment.\nTeachers facilitate learning and constantly nurture every learner.\n\n👁️ **DepEd Vision**:\nWe dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation.',
        actions: []
    },
    // School Hymn
    {
        patterns: ['hymn', 'song', 'kanta', 'awit', 'school hymn'],
        response: '🎵 **Makati High School Hymn**\n\n(Verse)\nWithin the heart of Makati City\nStands a school of loyalty\nAlma Mater dear, we sing to thee\nA song of love and memory...\n\n(Chorus)\nMakati High, Makati High\nThy banner waves up high...',
        actions: []
    },
    // Science Lab
    {
        patterns: ['science lab', 'laboratory', 'chemistry', 'biology', 'physics'],
        response: '🔬 **Science Laboratories** are located in **Building D** (4th Floor).\n\nStrict safety protocols must be observed at all times. Lab gowns are required during experiments.',
        actions: [
            { label: '📍 View Building D', onclick: "viewBuilding('Building D')" }
        ]
    },
    // Computer Lab
    {
        patterns: ['computer lab', 'comlab', 'ict room'],
        response: '💻 **Computer Laboratories** are located in **Building B** (3rd Floor) and **Building D**.\n\nStudents are allowed to use the lab during scheduled classes or with a teacher\'s permit.',
        actions: [
            { label: '📍 View Building B', onclick: "viewBuilding('Building B')" }
        ]
    },
    // TLE Rooms
    {
        patterns: ['tle', 'cookery', 'he', 'home economics', 'industrial arts'],
        response: '🍳 **TLE Rooms** (Cookery, Dressmaking, Drafting) are located in **Building A** and **Building D**.\n\nCheck your schedule for the specific room assignment.',
        actions: [
            { label: '📍 View Building A', onclick: "viewBuilding('Building A')" }
        ]
    },
    // Lost and Found
    {
        patterns: ['lost', 'found', 'nawala', 'nawawala', 'missing item'],
        response: '🛑 **Lost & Found**\n\nIf you lost an item, please check with the **Guidance Office** or **Discipline Office** in Building C.\n\nIf you found an item, please turn it over to any guard or teacher.',
        actions: [
            { label: '📍 Go to Guidance', onclick: "viewSpecificRoom('Building C', 'Guidance Office', { label: 'Guidance Office', desc: 'Student Counseling and Support', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Good Moral
    {
        patterns: ['good moral', 'certificate', 'moral character'],
        response: '📄 **Certificate of Good Moral Character**\n\nRequest at the **Guidance Office** (Building C).\n\n**Requirements:**\n1. School ID\n2. Receipt of Payment (if applicable)\n3. Request Form',
        actions: [
            { label: '📍 Go to Guidance', onclick: "viewSpecificRoom('Building C', 'Guidance Office', { label: 'Guidance Office', desc: 'Student Counseling and Support', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Form 137
    {
        patterns: ['form 137', 'f137', 'permanent record', 'sf10'],
        response: '📄 **Form 137 / SF10 Request**\n\nRequest at the **Registrar\'s Office** (Building C).\n\n**Note:** This document is usually school-to-school transaction. Personal requests may require a valid reason and ID.',
        actions: [
            { label: '📍 Go to Registrar', onclick: "viewSpecificRoom('Building C', 'Registrar Office', { label: 'Registrar Office', desc: 'Student Records and Enrollment', img: 'placeholderimg.jpg' })" }
        ]
    },
    // Grading System
    {
        patterns: ['grade', 'grading', 'compute', 'passing'],
        response: '📊 **K-12 Grading System**\n\nYour grade is composed of:\n1. **Written Work** (Quizzes, Long Tests)\n2. **Performance Tasks** (Projects, Reporting)\n3. **Quarterly Assessment** (Periodical Exams)\n\nPassing grade is **75%**.',
        actions: []
    },
    // Clubs
    {
        patterns: ['club', 'org', 'organization', 'join', 'sali', 'extra curricular', 'interest', 'group'],
        response: '🤝 **Student Organizations**\n\nJoin a club to develop your skills!\n• **SSG** (Supreme Student Government)\n• **Science Club**\n• **Math Club**\n• **English Club**\n• **Filipino Club**\n• **Glee Club**\n• **Dance Troupe**\n\nVisit the **SSG Office** in Building C for more info.',
        actions: [
            { label: '📍 View Building C', onclick: "viewBuilding('Building C')" }
        ]
    },
    // Disaster / Earthquake
    {
        patterns: ['earthquake', 'fire', 'drill', 'emergency', 'evacuation', 'lindol', 'sunog', 'safety'],
        response: '🚨 **Emergency Protocols**\n\n**Earthquake:** DUCK, COVER, and HOLD. Wait for the shaking to stop before evacuating to the open grounds (Oval).\n\n**Fire:** Evacuate calmly using the nearest exit. Do not run.\n\nFollow your teacher\'s instructions at all times.',
        actions: [
            { label: '📍 View Map', onclick: "showCampusDirectory()" }
        ]
    },
    // Washday / Uniform Schedule
    {
        patterns: ['wash day', 'washday', 'civilian', 'what to wear', 'suot'],
        response: '👕 **Wash Day Schedule**\n\nThere is usually no designated "Wash Day" for students unless announced.\n\nPlease wear your complete school uniform from Monday to Friday.',
        actions: []
    },
    // Supreme Student Government (SSG)
    {
        patterns: ['ssg', 'student government', 'officers', 'student council'],
        response: '🗳️ **Supreme Student Government (SSG)**\n\nThe SSG Office is located in **Building C**.\n\nThey handle student activities, concerns, and wider school programs.',
        actions: [
            { label: '📍 View Building C', onclick: "viewBuilding('Building C')" }
        ]
    }
];

// Match user input against FAQ patterns
// Match user input against FAQ patterns
function getOfflineBotReply(userText) {
    const input = userText.toLowerCase().trim();

    // Try to find a matching FAQ entry
    for (const faq of FAQ_DATA) {
        for (const pattern of faq.patterns) {
            if (input.includes(pattern)) {
                return { text: faq.response, actions: faq.actions || [] };
            }
        }
    }

    // Check if user is asking about a room number generically
    // Matches "Room 101", "Rm 101", "101", "Room 405"
    const roomMatch = input.match(/(?:room|rm\.?|kwarto)\s*(\d+)|(\b\d{3}\b)/i);
    if (roomMatch) {
        const num = roomMatch[1] || roomMatch[2];
        // Use the helper to find exact locations
        const locations = findRoomLocations(num);

        if (locations.length > 0) {
            let responseText = `I found **Room ${num}** in the following location(s):\n\n`;
            let actions = [];

            locations.forEach(loc => {
                const floorLabel = loc.floor == 1 ? '1st Floor' : loc.floor == 2 ? '2nd Floor' : loc.floor + 'th Floor';
                responseText += `• **${loc.building}** (${floorLabel}) — ${loc.room.desc}\n`;

                // Construct a safe onclick handler
                // We use viewBuilding as a fallback if viewSpecificRoom isn't robust, but let's try to be specific
                // Simplest is to just show the building map, but user wants specific navigation.
                // We need to ensure we can pass the room object.
                // Let's use a global temporary storage or just simpler arguments.

                // For now, let's just use viewBuilding but maybe we can trigger the specific room highlight?
                // Actually, let's just use viewBuilding with the room name if possible, or just the building.
                // The most reliable way without complex escaping is to just view the building.
                // But the user asked for "specific navigation".
                // I will add a helper "navigateToRoom(bldg, floor, roomLabel)" if needed.

                // Let's try to pass the arguments cleanly.
                // Since we have the data, we can just say "View Building X" and maybe the user can find it?
                // No, "Tap for Directions" is what they want.
                // If I use `viewSpecificRoom`, I need to make sure the arguments are valid JS.
                const safeLabel = loc.room.label.replace(/'/g, "\\'");
                const safeDesc = loc.room.desc.replace(/'/g, "\\'");
                const safeImg = loc.room.img;

                actions.push({
                    label: `📍 Show ${loc.building} (${floorLabel})`,
                    onclick: `viewSpecificRoom('${loc.building}', '${safeLabel}', { label: '${safeLabel}', desc: '${safeDesc}', img: '${safeImg}' }, ${loc.floor})`
                });
            });

            responseText += `\nClick a button to see the map!`;
            return { text: responseText, actions: actions };
        } else {
            return {
                text: `I couldn't find "Room ${num}" in my directory. It might be a new room or I might need an update.\n\nTry using the **Search Bar** to double check!`,
                actions: [
                    { label: '🔍 Search Now', onclick: "document.getElementById('search-input').focus()" }
                ]
            };
        }
    }

    // Check if asking about a building generically
    const buildingMatch = input.match(/building\s*([abcd])/i);
    if (buildingMatch) {
        const letter = buildingMatch[1].toUpperCase();
        return {
            text: `🏢 Building ${letter} is one of the main buildings on campus. Click on it in the **Campus Directory** map to explore its floors and rooms!`,
            actions: [
                { label: `View Building ${letter}`, onclick: `viewBuilding('Building ${letter}')` }
            ]
        };
    }

    // Default fallback
    return {
        text: `I'm not sure about that, but I can help you with:\n\n• 📍 Room & office locations\n• 📅 Events and schedules\n• 📞 Contact numbers\n• 🏫 Buildings A, B, C, D\n• 📋 Announcements & clearance\n\nTry rephrasing your question, or use the **Search Bar** to find rooms directly!`,
        actions: [
            { label: '🗺️ Campus Map', onclick: "showCampusDirectory()" },
            { label: '📅 School Events', onclick: "viewEvents()" }
        ]
    };
}

// Send message and get offline bot reply
// Send message and get offline bot reply
function sendChatbotMessage() {
    const inp = document.getElementById('chatbot-input');
    if (!inp) return;
    const text = inp.value.trim();
    if (!text) return;

    appendChatMessage('user', text);
    inp.value = '';

    // Keep keyboard linked to input
    inp.focus();
    currentInput = inp;

    // Show typing indicator with slight delay for natural feel
    const messagesEl = document.getElementById('chatbot-messages');
    const typingId = 'chatbot-typing-' + Date.now();
    if (messagesEl) {
        const typing = document.createElement('div');
        typing.id = typingId;
        typing.style.cssText = 'display:flex; align-items:center; gap:8px; animation: fadeIn 0.3s ease;';
        typing.innerHTML = `
            <div style="width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#4ca1af,#2c3e50);
                 display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <i class="fas fa-robot" style="color:white; font-size:0.8rem;"></i>
            </div>
            <div style="background:#fff; border:1px solid #e0e4e8; border-radius:18px 18px 18px 4px; padding:10px 18px; font-size:0.9rem; color:#999; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <i class="fas fa-circle" style="font-size:0.4rem; animation: pulse 1s infinite;"></i>
                <i class="fas fa-circle" style="font-size:0.4rem; animation: pulse 1s 0.2s infinite;"></i>
                <i class="fas fa-circle" style="font-size:0.4rem; animation: pulse 1s 0.4s infinite;"></i>
                &nbsp;Typing...
            </div>
        `;
        messagesEl.appendChild(typing);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // Simulate a short thinking delay then respond
    setTimeout(function () {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        const replyData = getOfflineBotReply(text);
        appendChatMessage('bot', replyData.text, replyData.actions);
    }, 700);
}

// Toggle keyboard for chatbot — focuses the chatbot input
function toggleChatbotKeyboard() {
    const keyboard = document.getElementById('virtual-keyboard');
    const inp = document.getElementById('chatbot-input');

    if (keyboard) {
        if (keyboard.style.display === 'block') {
            keyboard.style.display = 'none';
        } else {
            keyboard.style.display = 'block';
        }
    }

    // Always point the virtual keyboard to the chatbot text input
    if (inp) {
        inp.focus();
        currentInput = inp;
    }
}

function checkSearchEnter(event) {
    if (event.key === "Enter") {
        performSearch();
    }
}

// Specific Room Search Functions
function viewSpecificRoom(buildingName, roomCode, roomData) {
    const cardGrid = document.getElementById('card-grid');

    // Construct image path if not directly provided in data
    let imgSrc = roomData ? roomData.img : `${buildingName} Room ${roomCode}.jpg`;
    // Fallback for simple room number mapping if roomData is null but code exists
    if (!roomData && buildingImages[buildingName] && buildingImages[buildingName].rooms && buildingImages[buildingName].rooms[roomCode]) {
        imgSrc = buildingImages[buildingName].rooms[roomCode];
    }

    const label = roomData ? roomData.label : (roomCode.startsWith('Room ') ? roomCode : `Room ${roomCode}`);
    const desc = roomData ? roomData.desc : 'Standard Classroom';

    // Determine floor display safely
    let floorDisplay = "Unknown Floor";
    if (roomData && roomData.floor) {
        floorDisplay = `${translate('labels.floor')} ${roomData.floor}`;
    } else if (roomCode && !isNaN(roomCode.charAt(0))) {
        floorDisplay = `${translate('labels.floor')} ${roomCode.charAt(0)}`;
    } else {
        // Fallback if we can't determine floor from code or data
        floorDisplay = "See Directory";
    }

    // Create TTS content for the room description
    const ttsContent = [
        `${label}`,
        `Located in ${buildingName}, ${floorDisplay}`,
        `${desc}`
    ];
    const ttsJSON = JSON.stringify(ttsContent).replace(/"/g, '&quot;');
    const safeLabelForNav = (label || '').replace(/'/g, "\\'");

    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #4ca1af, #2c3e50); color:white;">
            <button onclick="viewBuilding('${buildingName}')" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> ${translate('buttons.see_all')} ${buildingName}
            </button>
            <h3 style="margin:0; border:none; color:white;">${translate('headers.search_results')}: ${label}</h3>
        </div>
        
        <div class="card" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto; transform: none;">
            <img src="${imgSrc}" onerror="this.src='placeholderimg.jpg'" style="width:100%; height:300px; object-fit:cover; border-radius:8px; margin-bottom:15px;" alt="${label}">
            <h3 style="color:#2c3e50; text-align:center; border-bottom:1px solid #eee;">${label}</h3>
            <div style="margin-top:10px; text-align:center;">
                <span style="background:#f0f2f5; color:#555; padding:5px 10px; border-radius:15px; font-size:0.9rem; margin-right:10px;">
                    <i class="fas fa-building"></i> ${buildingName}
                </span>
                <span style="background:#f0f2f5; color:#555; padding:5px 10px; border-radius:15px; font-size:0.9rem;">
                    <i class="fas fa-layer-group"></i> ${floorDisplay}
                </span>
            </div>
            <p style="text-align:center; color:#666; margin-top:15px;">${desc}</p>

            <!-- TTS Button -->
            <div class="tts-controls" style="text-align: center; margin: 15px 0;">
                <button class="tts-btn" id="room-tts-btn" onclick='toggleTTS(${ttsJSON}, "room-tts-btn")' style="background:#3498db; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; font-size:0.9rem;">
                    <i class="fas fa-volume-up"></i> ${translate('buttons.play_audio')}
                </button>
            </div>

            <!-- Navigation / Full Directions Card -->
            <div onclick="showNavigation('${buildingName}', '${safeLabelForNav}')" style="margin-top: 30px; border: 3px dashed #3498db; border-radius: 12px; padding: 25px; background: #eaf4fb; cursor: pointer; transition: all 0.3s ease; text-align: center; box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);" onmouseover="this.style.background='#d4eaf7'; this.style.transform='translateY(-5px)';" onmouseout="this.style.background='#eaf4fb'; this.style.transform='translateY(0)';">
                <div style="font-size: 3rem; color: #2980b9; margin-bottom: 15px;"><i class="fas fa-map-marked-alt"></i></div>
                <h4 style="color: #2c3e50; margin-bottom: 8px; font-size: 1.5rem; font-weight: bold;">${translate('buttons.tap_directions')}</h4>
                <p style="color: #555; font-size: 1.1rem; margin: 0;">${translate('labels.show_path')} <strong style="color: #e67e22;">${label}</strong></p>
            </div>
        </div>
    `;

    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

// Show all rooms matching a given room number across all buildings (room directory view)
function showMultipleRoomResults(roomNumber, matches) {
    const cardGrid = document.getElementById('card-grid');

    let cardsHtml = '';
    matches.forEach(function (m) {
        const room = m.room;
        const buildingName = m.building;
        const floor = m.floor;
        const safeLabel = room.label.replace(/'/g, "\\'");
        const safeBuilding = buildingName.replace(/'/g, "\\'");
        const roomImg = room.img || 'placeholderimg.jpg';

        cardsHtml += `
            <div class="card" onclick="locateRoom('${safeBuilding}', '${safeLabel}')"
                 style="cursor: pointer; padding: 0; overflow: hidden; transition: transform 0.2s;"
                 onmouseover="this.style.transform='translateY(-4px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                <div style="height: 180px; overflow: hidden; background: #eee;">
                    <img src="${roomImg}" onerror="this.src='placeholderimg.jpg'"
                         style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;"
                         onmouseover="this.style.transform='scale(1.08)'"
                         onmouseout="this.style.transform='scale(1)'">
                </div>
                <div style="padding: 15px;">
                    <h4 style="margin-top: 0; margin-bottom: 5px; color: #2c3e50; font-size: 1.1rem;">
                        <i class="fas fa-door-open" style="color: #4ca1af;"></i> ${room.label}
                    </h4>
                    <p style="margin: 0 0 8px; font-size: 0.9rem; color: #7f8c8d;">${room.desc}</p>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <span style="background: #eaf4fb; color: #2980b9; padding: 3px 10px; border-radius: 12px; font-size: 0.82rem;">
                            <i class="fas fa-building"></i> ${buildingName}
                        </span>
                        <span style="background: #eaf4fb; color: #2980b9; padding: 3px 10px; border-radius: 12px; font-size: 0.82rem;">
                            <i class="fas fa-layer-group"></i> Floor ${floor}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });

    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #4ca1af, #2c3e50); color:white;">
            <button onclick="showCampusDirectory()" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> Back to Directory
            </button>
            <div>
                <h3 style="margin:0; border:none; color:white;">Room ${roomNumber} — All Locations</h3>
                <p style="margin:4px 0 0; font-size:0.85rem; opacity:0.85;">Found in ${matches.length} building(s) — tap a card to see details</p>
            </div>
        </div>

        <div style="grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px;">
            ${cardsHtml}
        </div>
    `;

    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function showNoResults(query) {
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #e74c3c, #c0392b); color:white;">
            <button onclick="showCampusDirectory()" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> ${translate('buttons.specific_rooms')}
            </button>
            <h3 style="margin:0; border:none; color:white;">${translate('headers.no_results')}</h3>
        </div>

        <div class="card" style="grid-column: 1 / -1; min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <div style="font-size: 4rem; color: #ecf0f1; margin-bottom: 20px;"><i class="fas fa-search-minus"></i></div>
            <h4 style="color: #7f8c8d; margin-bottom: 10px;">${translate('labels.we_could_not_find')} "${query}"</h4>
            <p style="color: #95a5a6; max-width: 400px; margin-bottom: 20px;">
                ${translate('labels.search_tips')}
            </p>
            <button onclick="document.getElementById('search-input').focus()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-search"></i> ${translate('buttons.search_again')}
            </button>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

// Helper to locate room data from directory click
function locateRoom(buildingName, roomLabel) {
    let foundRoomData = null;
    let foundFloor = null;
    const bData = buildingImages[buildingName];

    if (bData && bData.floorData) {
        for (let floor in bData.floorData) {
            const rooms = bData.floorData[floor];
            // Exact match or contains
            const match = rooms.find(r => r.label === roomLabel || r.label.includes(roomLabel));
            if (match) {
                foundRoomData = match;
                foundFloor = floor;
                break;
            }
        }
    }

    if (foundRoomData) {
        // Pass found floor explicitly since label might not have numbers (e.g. Principal's Office)
        foundRoomData.floor = foundFloor;
        viewSpecificRoom(buildingName, roomLabel, foundRoomData);
    } else {
        // Fallback if data structure mismatch, try to show something reasonable or just navigation
        // If we have building name and label, we can at least show navigation
        showNavigation(buildingName, roomLabel);
    }
}

function showNavigation(buildingName, destinationLabel) {
    const cardGrid = document.getElementById('card-grid');

    // Try to find the room data to get the directional image and text directions
    let directionalImage = 'placeholderimg.jpg'; // Better local fallback
    let textDirections = null;
    let roomFound = false;

    // Search through building data for the room
    const bData = buildingImages[buildingName];
    if (bData && bData.floorData) {
        for (let floor in bData.floorData) {
            const rooms = bData.floorData[floor];
            const match = rooms.find(r => r.label === destinationLabel || r.label.includes(destinationLabel));
            if (match) {
                if (match.directions) {
                    directionalImage = match.directions;
                } else if (match.img) {
                    // Fallback to room image if no specific direction map
                    directionalImage = match.img;
                } else if (bData.floors[floor]) {
                    // Fallback to floor plan if no room image
                    directionalImage = bData.floors[floor];
                }

                if (match.textDirections) {
                    textDirections = match.textDirections;
                }
                roomFound = true;
                break;
            }
        }
    }

    // Generate HTML for directions list with translation support
    let directionsHtml = '';
    let directionsArray = [];

    if (textDirections && textDirections.length > 0) {
        directionsArray = textDirections;
        directionsHtml += '<ol style="padding-left: 30px; line-height: 1.8; color: #333; font-size: 1.2rem; font-weight: 500;">';
        textDirections.forEach(step => {
            const translatedStep = translateDirection(step);
            directionsHtml += `<li style="margin-bottom: 8px;">${translatedStep}</li>`;
        });
        directionsHtml += '</ol>';
    } else {
        // Default generic directions if no specific ones exist
        directionsArray = [
            "Start at the Main Kiosk near the gate.",
            "Walk straight ahead towards the quadrangle.",
            `Turn towards ${buildingName}.`,
            "Proceed to the designated floor.",
            `Look for ${destinationLabel}.`
        ];
        directionsHtml = `
            <ol style="padding-left: 30px; line-height: 1.8; color: #333; font-size: 1.2rem; font-weight: 500;">
                <li style="margin-bottom: 8px;">${translateDirection(directionsArray[0])}</li>
                <li style="margin-bottom: 8px;">${translateDirection(directionsArray[1])}</li>
                <li style="margin-bottom: 8px;">${translateDirection(directionsArray[2])}</li>
                <li style="margin-bottom: 8px;">${translateDirection(directionsArray[3])}</li>
                <li style="margin-bottom: 8px;">${translateDirection(directionsArray[4])}</li>
            </ol>
        `;
    }

    // Store directions for TTS button
    const directionsJSON = JSON.stringify(directionsArray).replace(/"/g, '&quot;');

    cardGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; display:flex; align-items:center; gap:15px; background:linear-gradient(to right, #3498db, #2c3e50); color:white;">
            <button onclick="window.history.back(); location.reload();" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> ${translate('buttons.back')}
            </button>
            <h3 style="margin:0; border:none; color:white;">${translate('headers.navigation')}: Routing ${destinationLabel}</h3>
        </div>

        <div class="card" style="grid-column: 1 / -1; min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <img src="${directionalImage}" onerror="this.src='placeholderimg.jpg'" alt="Navigation Map" style="max-width: 800px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); margin-bottom: 30px;">
            
            <div style="background: #e8f6f3; padding: 25px 35px; border-radius: 12px; border-left: 8px solid #2ecc71; max-width: 800px; width: 100%; text-align: left; box-shadow: 0 4px 20px rgba(46, 204, 113, 0.15);">
                <h4 style="color: #2c3e50; margin-bottom: 20px; font-size: 1.5rem;"><i class="fas fa-walking"></i> ${translate('headers.directions')}</h4>
                ${directionsHtml}
            </div>

            <div class="tts-controls">
                <button class="tts-btn" id="tts-play-btn" onclick='toggleTTS(${directionsJSON}, "tts-play-btn")'>
                    <i class="fas fa-volume-up"></i> ${translate('buttons.play_audio')}
                </button>
            </div>
            
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #2c3e50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-check"></i> ${translate('buttons.done')}
            </button>
            <button onclick="document.getElementById('search-input').focus()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-search"></i> ${translate('buttons.search_again')}
            </button>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function viewHelp() {
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = `
        <div class="card about-title-card">
            <h3><i class="fas fa-question-circle"></i> ${translate('headers.help_center')}</h3>
            <p>Frequently Asked Questions and Support</p>
        </div>

        <div class="card">
            <h3><i class="fas fa-book"></i> ${translate('headers.user_guide')}</h3>
            <p style="margin-bottom: 15px; color: #555;">Learn how to use the Smart Kiosk effectively.</p>
            <ul class="directory-list">
                <li><span>Searching</span> <span>Use sidebar search</span></li>
                <li><span>Navigation</span> <span>Click Map for directions</span></li>
                <li><span>Assistant</span> <span>Click the logo icon</span></li>
            </ul>
        </div>

        <div class="card">
            <h3><i class="fas fa-comments"></i> ${translate('headers.faq')}</h3>
            <ul class="directory-list">
                <li>
                    <div style="width: 100%">
                        <strong style="display:block; color:#2c3e50; margin-bottom:5px;">How do I find a room?</strong>
                        <span style="font-size: 0.9rem; color: #666;">Use the "Campus Directory" or ask the Assistant to "Navigate Rooms".</span>
                    </div>
                </li>
                <li>
                    <div style="width: 100%">
                        <strong style="display:block; color:#2c3e50; margin-bottom:5px;">Where is the clinic?</strong>
                        <span style="font-size: 0.9rem; color: #666;">The clinic is located in Building A, Room 115.</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="card">
            <h3><i class="fas fa-headset"></i> Contact Support</h3>
            <p style="margin-bottom: 15px; color: #555;">Need immediate assistance?</p>
            <div style="text-align: center;">
                <button class="assistant-btn" onclick="callSchool()" style="width: 100%; margin-bottom: 10px;"><i class="fas fa-phone"></i> Call Admin Office</button>
                <p style="font-size: 0.85rem; color: #888;">Available 7:00 AM - 5:00 PM</p>
            </div>
            <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
                <input type="file" id="admin-upload" style="display: none;" accept=".json,.txt,.pdf,.docx" onchange="handleFileUpload(this)">
                <button onclick="document.getElementById('admin-upload').click()" style="background: none; border: none; font-size: 0.8rem; color: #999; cursor: pointer; margin-right: 10px;">
                    <i class="fas fa-upload"></i> Admin: Upload Data
                </button>
                <button onclick="exportData()" style="background: none; border: none; font-size: 0.8rem; color: #999; cursor: pointer;">
                    <i class="fas fa-download"></i> Admin: Export Data
                </button>
            </div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function handleFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);

                if (data.events && Array.isArray(data.events)) {
                    localStorage.setItem('kiosk_events', JSON.stringify(data.events));
                }

                if (data.announcements && Array.isArray(data.announcements)) {
                    localStorage.setItem('kiosk_announcements', JSON.stringify(data.announcements));
                }

                alert('Kiosk data updated successfully!');
                location.reload(); // Reload to show changes
            } catch (error) {
                alert('Error parsing JSON file. Please ensure it is a valid JSON format.');
                console.error(error);
            }
        };
        reader.readAsText(file);
    } else {
        // For PDF, DOCX, etc. - simulate upload for now as we can't parse them client-side easily without libs
        alert(`File "${file.name}" uploaded! \n\nNote: Automatic parsing for non-JSON files (PDF/DOCX) requires a backend server. \n\nFor this local version, please use the provided JSON template for immediate updates.`);
    }

    // Reset input
    input.value = '';
}

// ─── Events & News Implementation ─────────────────────────────────────────────

function getDefaultEvents() {
    return [
        {
            title: "Science Fair 2026",
            date: "Feb 20, 2026 • 8:00 AM - 4:00 PM",
            desc: "Showcasing student innovations and experiments. Venue: School Gymnasium.",
            img: "1.png",
            tag: "Academic"
        },
        {
            title: "Basketball Championship",
            date: "Feb 25, 2026 • 3:00 PM",
            desc: "Makati High vs. Rizal High. Come and support our team! Venue: Covered Court.",
            img: "3.png",
            tag: "Sports"
        },
        {
            title: "Fourth Quarter Exams",
            date: "March 19–20, 2026",
            desc: "Please settle all accountabilities before the examination dates.",
            img: "exams placeholder.jpg",
            tag: "Exams"
        },
        {
            title: "EOSY Graduation Rites",
            date: "March 30, 2026 • 1:00 PM",
            desc: "Celebrating the Class of 2026. Theme: 'Kabataang Pilipino: Tanglaw ng Kinabukasan'.",
            img: "graduation rites placeholder.jpg",
            tag: "Event"
        }
    ];
}

function getDefaultAnnouncements() {
    return [
        {
            title: "No Classes - Cityhood Anniversary",
            date: "Feb 28, 2026",
            content: "Please be informed that there will be no classes on February 28 in celebration of Makati Cityhood.",
            source: "Makati High School - Official FB Page",
            img: "placeholderimg.jpg"
        },
        {
            title: "School ID Verification",
            date: "Feb 15, 2026",
            content: "All students are required to validate their School IDs at the Registrar's Office before March 1.",
            source: "Registrar's Office",
            img: "placeholderimg.jpg"
        },
        {
            title: "Club Registration Extended",
            date: "Feb 10, 2026",
            content: "SSG has extended the club membership registration until next Friday. Join now!",
            source: "SSG FB Page",
            img: "placeholderimg.jpg"
        }
    ];
}



