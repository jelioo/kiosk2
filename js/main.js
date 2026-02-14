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
    document.getElementById('date-time-display').textContent = 'Current Philippine Time: ' + philippineTime;
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
