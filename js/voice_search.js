
        // Voice Search Functionality
        function startVoiceSearch() {
            const searchInput = document.getElementById('search-input');
            const voiceBtn = document.getElementById('voice-search-btn');

            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                alert("Voice search is not supported in this browser. Please use Google Chrome or Edge.");
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = function () {
                voiceBtn.classList.add('listening');
                searchInput.placeholder = "Listening...";
            };

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                setTimeout(() => {
                    performSearch();
                }, 500);
            };

            recognition.onspeechend = function () {
                recognition.stop();
                voiceBtn.classList.remove('listening');
                searchInput.placeholder = "Search for rooms, people...";
            };

            recognition.onerror = function (event) {
                console.error('Speech recognition error', event.error);
                voiceBtn.classList.remove('listening');
                searchInput.placeholder = "Search for rooms, people...";
                if (event.error === 'no-speech') {
                    // alert("No speech was detected. Please try again.");
                } else if (event.error === 'not-allowed') {
                    alert("Microphone access is blocked. Please allow microphone access to use voice search.");
                }
            };

            recognition.start();
        }
