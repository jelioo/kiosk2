// Global Constants
const REFRESH_TIME = 300000; // 5 minutes auto-refresh
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
    roomList.forEach(room => {
        // Safe label for onclick
        const safeLabel = room.label.replace(/'/g, "\\'");
        // Use mapped room image or fallback
        const roomImg = room.img || 'placeholderimg.jpg';

        roomsHtml += `
            <div class="card" onclick="viewSpecificRoom('${buildingName}', '${safeLabel}', null)" style="cursor: pointer; padding: 0; overflow: hidden; transition: transform 0.2s;">
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
        "The AI-powered kiosk is easy to access when I need school information.",
        "The kiosk interface is easy to understand and use without assistance.",
        "The kiosk is convenient and available for students, staff, and visitors.",
        "The kiosk allows me to get school information faster than traditional methods.",
        "The search function helps me find information quickly.",
        "Using the kiosk saves me time when checking schedules, announcements, or events.",
        "The kiosk makes it easier to find rooms and school facilities.",
        "The interactive map helps me navigate the campus efficiently.",
        "The kiosk provides accurate and reliable school information.",
        "Overall, I am satisfied with the kiosk as a tool for information access and navigation."
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

                    <div class="scale-legend">
                        <span>5: Strongly Agree</span>
                        <span>4: Agree</span>
                        <span>3: Neutral</span>
                        <span>2: Disagree</span>
                        <span>1: Strongly Disagree</span>
                    </div>

                    ${questionsHtml}
                    
                    <div class="survey-question">
                        <h4>Additional Comments</h4>
                        <textarea id="survey-comments" style="width:100%; padding:10px; border-radius:5px; border:1px solid #ddd; min-height:100px;" placeholder="Any other feedback?"></textarea>
                    </div>

                    <button type="submit" class="assistant-btn" style="width:100%; font-size: 1.1rem; justify-content: center;">Submit Survey</button>
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
    for (let i = 0; i < 10; i++) {
        const qInput = document.querySelector(`input[name="q${i}"]:checked`);
        answers[`Q${i + 1}`] = qInput ? qInput.value : "";
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
    const cardGrid = document.getElementById('card-grid');

    // Default Events
    const defaultEvents = [
        { title: "Science Fair", date: "Feb 20, 9:00 AM" },
        { title: "Basketball Tournament", date: "Feb 25, 3:00 PM" },
        { title: "Parent-Teacher Conference", date: "Feb 28, 1:00 PM" },
        { title: "Math Olympiad", date: "Mar 5, 8:00 AM" },
        { title: "Arts Festival", date: "Mar 15, 10:00 AM" },
        { title: "Graduation Ceremony", date: "Mar 27, 2:00 PM" }
    ];

    let events = defaultEvents;
    try {
        const storedEvents = localStorage.getItem('kiosk_events');
        if (storedEvents) {
            events = JSON.parse(storedEvents);
        }
    } catch (e) {
        console.warn('Error loading events:', e);
    }

    let eventsHtml = '';
    events.forEach(event => {
        eventsHtml += `<li><span>${event.title}</span> <span class="event-date">${event.date}</span></li>`;
    });

    cardGrid.innerHTML =
        '<div class="card">' +
        '<h3><i class="fas fa-calendar-day"></i> Upcoming Events</h3>' +
        '<ul class="event-list">' +
        eventsHtml +
        '</ul>' +
        '</div>';
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}
function AboutUs() {
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = `
        <div class="card about-title-card">
            <h3><i class="fas fa-users"></i> ${translate('team.our_research_team')}</h3>
            <p>${translate('team.meet_team')}</p>
        </div>
        
        <div class="card member-card">
            <img src="https://i.pinimg.com/originals/9f/4c/f0/9f4cf0f24b376077a2fcdab2e85c3584.jpg" onerror="this.src='placeholderimg.jpg'" alt="Clarence Andrei B. Santelices" class="member-image">
            <div class="member-name">SANTELICES, CLARENCE ANDREI B.</div>
            <div class="member-role">${translate('team.research_leader')}</div>
        </div>

        <div class="card member-card">
            <img src="https://i.pinimg.com/originals/9f/4c/f0/9f4cf0f24b376077a2fcdab2e85c3584.jpg" onerror="this.src='placeholderimg.jpg'" alt="Christian Lloyd M. Aragon" class="member-image">
            <div class="member-name">ARAGON, CHRISTIAN LLOYD M.</div>
            <div class="member-role">${translate('team.co_researcher')}</div>
        </div>

        <div class="card member-card">
            <img src="libee.jpg" onerror="this.src='placeholderimg.jpg'" alt="John Libee L. Galano" class="member-image">
            <div class="member-name">GALANO, JOHN LIBEE L.</div>
            <div class="member-role">${translate('team.co_researcher')}</div>
        </div>

        <div class="card member-card">
            <img src="https://i.pinimg.com/originals/9f/4c/f0/9f4cf0f24b376077a2fcdab2e85c3584.jpg" onerror="this.src='placeholderimg.jpg'" alt="Mikeria Angela F. Morondos" class="member-image">
            <div class="member-name">MORONDOS, MIKERIA ANGELA F.</div>
            <div class="member-role">${translate('team.co_researcher')}</div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function readAnnouncements() {
    const cardGrid = document.getElementById('card-grid');

    // Default Announcements
    const defaultAnnouncements = [
        "Fourth Quarter Exams scheduled for March 19 and 20, 2026",
        "End-of-School-Year Rites on March 30-31, 2026",
        "Parent-Teacher Conference after quarterly exams",
        "Submit all clearance requirements before EOSY Rites",
        "Report cards will be distributed after quarter exams",
        "School Year 2025-2026 ends on March 31, 2026"
    ];

    let announcements = defaultAnnouncements;
    try {
        const storedAnnouncements = localStorage.getItem('kiosk_announcements');
        if (storedAnnouncements) {
            announcements = JSON.parse(storedAnnouncements);
        }
    } catch (e) {
        console.warn('Error loading announcements:', e);
    }

    let announcementsHtml = '';
    announcements.forEach(announcement => {
        announcementsHtml += `<li>${announcement}</li>`;
    });

    cardGrid.innerHTML =
        '<div class="card">' +
        '<h3><i class="fas fa-bullhorn"></i> School Announcements</h3>' +
        '<ul class="event-list">' +
        announcementsHtml +
        '</ul>' +
        '</div>';
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
    const cardGrid = document.getElementById('card-grid');

    // Check if online
    const isOnline = navigator.onLine;

    let embedContent = '';
    if (isOnline) {
        embedContent = `
            <!-- Facebook Page Plugin Iframe -->
            <!-- Note: Facebook Plugin max width is 500px. We center it here. Sandbox prevents redirection. -->
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FmakatiHS1968%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="500" 
                height="500" 
                style="border:none; overflow:hidden; max-width: 100%;" 
                scrolling="no" 
                frameborder="0" 
                allowfullscreen="true" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                sandbox="allow-scripts allow-same-origin allow-popups">
            </iframe>`;
    } else {
        embedContent = `
            <div style="padding: 40px; text-align: center; color: #666;">
                <div style="font-size: 3rem; margin-bottom: 20px;">📡</div>
                <h3 style="color: #e74c3c; margin-bottom: 10px;">Offline Mode</h3>
                <p style="margin-bottom: 10px;">The News section requires an internet connection.</p>
                <p style="font-size: 0.9rem;">Please connect to the internet to view the latest updates from Makati High School.</p>
            </div>`;
    }

    cardGrid.innerHTML = `
        <div class="card about-title-card">
            <h3><i class="fas fa-newspaper"></i> Campus News</h3>
            <p>Stay updated with our latest social media posts</p>
        </div>

        <div class="card" style="grid-column: 1 / -1; display: flex; justify-content: center; overflow: hidden;">
            ${embedContent}
            
            <div style="margin-top: 20px; text-align: center; color: #666; font-size: 0.9rem; width: 100%; display: none;">
                <p>To change the Facebook page, edit the <code>src</code> attribute in the <code>viewNews</code> function inside Kiosk.html</p>
            </div>
        </div>
    `;
    const modal = document.getElementById('assistant-modal');
    if (modal) modal.style.display = 'none';
}

function openChatbot() {
    document.getElementById('assistant-modal').style.display = 'none';
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = `
        <div class="card about-title-card">
            <h3><i class="fas fa-robot"></i> AI Assistant</h3>
            <p>Ask me anything about the school!</p>
        </div>
        
        <div class="card" style="grid-column: 1 / -1; min-height: 600px; padding: 0; overflow: hidden; display: flex; flex-direction: column;">
            <div style="padding: 10px; background: #f0f2f5; border-bottom: 2px solid #ddd; display: flex; justify-content: center;">
                <button onclick="toggleChatbotKeyboard()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-keyboard"></i> Show Keyboard
                </button>
            </div>
            <div class="chatbot-container" style="width: 100%; height: 550px; position: relative;">
                <iframe
                    src="https://www.chatbase.co/ONi3F76UOQ5dRrwX6NybY/help"
                    title="Jelioo Kiosk Chatbot"
                    style="width: 100%; height: 100%; border: none;"
                    frameborder="0">
                </iframe>
            </div>
        </div>
    `;
}

// Toggle keyboard for chatbot
function toggleChatbotKeyboard() {
    const keyboard = document.getElementById('virtual-keyboard');
    if (keyboard) {
        if (keyboard.style.display === 'block') {
            keyboard.style.display = 'none';
        } else {
            keyboard.style.display = 'block';
            // Create a hidden input to receive keyboard input
            let hiddenInput = document.getElementById('chatbot-hidden-input');
            if (!hiddenInput) {
                hiddenInput = document.createElement('input');
                hiddenInput.id = 'chatbot-hidden-input';
                hiddenInput.type = 'text';
                hiddenInput.style.position = 'absolute';
                hiddenInput.style.opacity = '0';
                hiddenInput.style.pointerEvents = 'none';
                document.body.appendChild(hiddenInput);
            }
            currentInput = hiddenInput;
            hiddenInput.focus();
        }
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

            <!-- Navigation Placeholder Card -->
            <div onclick="showNavigation('${buildingName}', '${label}')" style="margin-top: 20px; border: 2px dashed #4ca1af; border-radius: 10px; padding: 15px; background: #f9ffff; cursor: pointer; transition: background 0.3s; text-align: center;">
                <div style="font-size: 2rem; color: #4ca1af; margin-bottom: 10px;"><i class="fas fa-map-marked-alt"></i></div>
                <h4 style="color: #2c3e50; margin-bottom: 5px;">${translate('buttons.tap_directions')}</h4>
                <p style="color: #666; font-size: 0.9rem;">${translate('labels.show_path')} ${label}</p>
            </div>
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
        directionsHtml += '<ol style="padding-left: 20px; line-height: 1.6; color: #555;">';
        textDirections.forEach(step => {
            const translatedStep = translateDirection(step);
            directionsHtml += `<li>${translatedStep}</li>`;
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
            <ol style="padding-left: 20px; line-height: 1.6; color: #555;">
                <li>${translateDirection(directionsArray[0])}</li>
                <li>${translateDirection(directionsArray[1])}</li>
                <li>${translateDirection(directionsArray[2])}</li>
                <li>${translateDirection(directionsArray[3])}</li>
                <li>${translateDirection(directionsArray[4])}</li>
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
            <img src="${directionalImage}" onerror="this.src='placeholderimg.jpg'" alt="Navigation Map" style="max-width: 500px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            
            <div style="background: #e8f6f3; padding: 20px; border-radius: 10px; border-left: 5px solid #2ecc71; max-width: 600px; width: 100%; text-align: left;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;"><i class="fas fa-walking"></i> ${translate('headers.directions')}</h4>
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
