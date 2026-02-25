// ============================================================
// MHS SMART KIOSK - SERVICE WORKER
// Cache-first strategy for full offline availability
// ============================================================

const CACHE_NAME = 'mhs-kiosk-v1';

// All local assets to precache on install
const PRECACHE_URLS = [
    // Core pages & styles
    './',
    './index.html',
    './assistant.css',
    './css/styles.css',

    // Scripts
    './voice_search.js',
    './js/building-data.js',
    './js/language-tts.js',
    './js/keyboard.js',
    './js/navigation.js',
    './js/main.js',
    './js/intro.js',

    // Root images
    './Intelliguide.jpg',
    './placeholderimg.jpg',
    './libee.jpg',
    './589431807_815813444550227_3889086255111213921_n.jpg',
    './589285849_1378908313740486_2189791204943876101_n.jpg',

    // Building overview photos
    './BUILDING A.jpg',
    './BUILDING B.jpg',
    './BUILDING C.jpg',
    './BUILDING D.jpg',

    // Building A hallway photos
    './Bldg. A 1F H1.jpg',
    './Bldg. A 1F H2.jpg',
    './Bldg. A 1F H3.jpg',
    './Bldg. A 1F H4.jpg',
    './Bldg. A 1F H5.jpg',
    './Bldg. A 1F H6.jpg',
    './Bldg. A 1F H7.jpg',
    './Bldg. A 2F H1.jpg',
    './Bldg. A 2F H2.jpg',
    './Bldg. A 2F H3.jpg',
    './Bldg. A 2F H5.jpg',
    './Bldg. A 2F H6.jpg',

    // Building B hallway photos
    './Bldg. B 1F H1.jpg',
    './Bldg. B 1F H2.jpg',
    './Bldg. B 1F H3.jpg',
    './Bldg. B 1F H4.jpg',
    './Bldg. B 1F H5.jpg',
    './Bldg. B 1F H6.jpg',
    './Bldg. B 2F H1.jpg',
    './Bldg. B 2F H2.jpg',
    './Bldg. B 2F H3.jpg',

    // Building C hallway photos
    './Bldg. C 2F H1.jpg',
    './Bldg. C 2F H2.jpg',
    './Bldg. C 2F H3.jpg',
    './Bldg. C 2F H4.jpg',
    './Bldg. C H1.jpg',
    './Bldg. C H2.jpg',
    './Bldg. C H3.jpg',
    './Bldg. C H4.jpg',

    // Building D hallway photos
    './Bldg. D 1F H1.jpg',
    './Bldg. D 2F H1.jpg',
    './Bldg. D 2F H2.jpg',

    // Garden / area photos
    './Bldg. A,B,C Garden.jpg',
    './Bldg. A,B,C Garden 2.jpg',
    './Bldg. C, D School Reading Park.jpg',

    // Connecting hallway photos
    './1F Hallway connecting Bldg. B and Bldg. C.jpg',
    './2F Hallway connecting Bldg. A and Bldg. B.jpg',

    // Entering building photos
    './Entering BLDG. A.jpg',
    './Entering BLDG. B.jpg',
    './Entering BLDG. C.jpg',
    './Entering BLDG. D.jpg',

    // Building A room photos
    './Building A 1F 102.jpg',
    './Building A 1F 103.jpg',
    './Building A 1F Backstage.jpg',
    './Building A 1F Restrooms.jpg',
    './Building A 1F Stockroom.jpg',
    './Building A 2F 201.jpg',
    './Building A 2F 202.jpg',
    './Building A 2F 203.jpg',
    './Building A 2F 204.jpg',
    './Building A 2F ENG FACULTY.jpg',
    './Building A 2F Restrooms.jpg',

    // Building A direction images
    './Building A - 1st Floor Restroom Directions.jpg',
    './Building A - 1st Floor Room 101 Directions.jpg',
    './Building A - 1st Floor Room 102 Directions.jpg',
    './Building A - 1st Floor Room 103 Directions.jpg',
    './Building A - 1st to 2nd Floor Stair Directions.jpg',
    './Building A - 2nd Floor ENG Faculty Directions.jpg',
    './Building A - 2nd Floor Restroom Directions.jpg',
    './Building A - 2nd Floor Room 201 Directions.jpg',
    './Building A - 2nd Floor Room 202 Directions.jpg',
    './Building A - 2nd Floor Room 203 Directions.jpg',
    './Building A - 2nd Floor Room 204 Directions.jpg',
    './Building A - STAGE Directions.jpg',

    // Building B room photos
    './Building B 1F 101.jpg',
    './Building B 1F 106.jpg',
    './Building B 1F 111.jpg',
    './Building B 1F 112.jpg',
    './Building B 1F Clinic.jpg',
    './Building B 1F Conference Room.jpg',
    './Building B 1F Dental Office.jpg',
    './Building B 1F Department Heads Office.jpg',
    './Building B 1F Empty Grounds.jpg',
    './Building B 1F Office of the Assistant School Principal.jpg',
    './Building B 1F Office of the Principal.jpg',
    './Building B 1F Office of the Registrar.jpg',
    './Building B 1F School Canteen.jpg',
    './Building B 2F 202.jpg',
    './Building B 2F 205.jpg',
    './Building B 2F Journalism Room.jpg',
    './Building B 2F Makerspace.jpg',
    './Building B 2F RHS Hall.jpg',
    './Building B 2F Restrooms.jpg',

    // Building B direction images
    './Building B - 1st Floor Conference Room Directions.jpg',
    './Building B - 1st Floor Dental Office Directions.jpg',
    './Building B - 1st Floor Department Heads Directions.jpg',
    './Building B - 1st Floor Empty Grounds Directions.jpg',
    './Building B - 1st Floor Food Room Directions.jpg',
    './Building B - 1st Floor Medical Clinic Directions.jpg',
    './Building B - 1st Floor Office of the Assistant Principal Directions.jpg',
    './Building B - 1st Floor Office of the Registrar Directions.jpg',
    './Building B - 1st Floor Prefect of Discipline (Room 106) Directions.jpg',
    './Building B - 1st Floor Principal\'s Office Directions.jpg',
    './Building B - 1st Floor Restrooms.jpg',
    './Building B - 1st Floor School Canteen Directions.jpg',
    './Building B - 1st Floor TLE Faculty (Room 112) Directions.jpg',
    './Building B - 1st to 2nd Floor Stair Directions.jpg',
    './Building B - 2nd Floor Journalism Room Directions.jpg',
    './Building B - 2nd Floor Korean Class (Room 202) Directions.jpg',
    './Building B - 2nd Floor Makerspace Directions.jpg',
    './Building B - 2nd Floor RHS Hall Directions.jpg',
    './Building B - 2nd Floor Restroom Directions.jpg',
    './Building B - 2nd Floor Room 205 Directions.jpg',
    './Building B - 2nd Floor SHS Faculty Directions.jpg',

    // Building C room photos
    './Building C 1F 101.jpg',
    './Building C 1F 105 TVL - FBS Room.jpg',
    './Building C 1F 106 Cookery Laboratory.jpg',
    './Building C 1F JHS Guidance Office.jpg',
    './Building C 1F Restrooms.jpg',
    './Building C 1F SHS Guidance Office.jpg',
    './Building C 2F 201 SHS Computer Lab.jpg',
    './Building C 2F 202 SHS Computer Lab.jpg',
    './Building C 2F 204 E - Library.jpg',
    './Building C 2F 205.jpg',
    './Building C 2F 206.jpg',
    './Building C 2F Finance Office.jpg',
    './Building C 2F Restrooms.jpg',

    // Building C direction images
    './Building C - 1st Floor Cookery Lab (Room 101) Directions.jpg',
    './Building C - 1st Floor Cookery Laboratory Directions.jpg',
    './Building C - 1st Floor JHS Guidance Office Directions.jpg',
    './Building C - 1st Floor Restroom Directions.jpg',
    './Building C - 1st Floor SHS Guidance Office Directions.jpg',
    './Building C - 1st Floor TVL-FBS Room Directions.jpg',
    './Building C - 1st Floor Teen Center Directions.jpg',
    './Building C - 1st to 2nd Floor Stair Directions.jpg',
    './Building C - 2nd Floor Computer Laboratory (Room 201 - 202) Directions.jpg',
    './Building C - 2nd Floor E - Library (Room 204) Directions.jpg',
    './Building C - 2nd Floor Finance Room (Room 207) Directions.jpg',
    './Building C - 2nd Floor Restroom Directions.jpg',
    './Building C - 2nd Floor Room 205 Directions.jpg',
    './Building C - 2nd Floor Room 206 Directions.jpg',
    './Building C - 2nd Floor School Library (Room 203) Directions.jpg',

    // Building D room photos
    './Building D 1F 101.jpg',
    './Building D 1F 102.jpg',
    './Building D 2F 201.jpg',
    './Building D 2F 202.jpg',

    // Building D direction images
    './Building D - 1st Floor Room 101 Directions.jpg',
    './Building D - 1st Floor Room 102 Directions.jpg',
    './Building D - 1st to 2nd Floor Stair Directions.jpg',
    './Building D - 2nd Floor Room 201 Directions.jpg',
    './Building D - 2nd Floor Room 202 Directions.jpg',
];

// ── Install: cache all local assets ──────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Cache files individually so one bad filename doesn't break the whole install
            return Promise.allSettled(
                PRECACHE_URLS.map(url =>
                    cache.add(url).catch(err =>
                        console.warn('[SW] Failed to cache:', url, err)
                    )
                )
            );
        }).then(() => self.skipWaiting())
    );
});

// ── Activate: clean up old caches ────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        ).then(() => self.clients.claim())
    );
});

// ── Fetch: cache-first, network fallback ─────────────────────
self.addEventListener('fetch', event => {
    // Only handle GET requests for same-origin or local resources
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Skip cross-origin requests (maps, facebook, etc.) — let them fail naturally
    // so the JS online-check fallbacks can handle them gracefully
    if (url.origin !== self.location.origin &&
        !event.request.url.startsWith('file://')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            // Not in cache — try the network
            return fetch(event.request).then(response => {
                // Cache successful responses for local assets
                if (response && response.status === 200 && response.type !== 'opaque') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(() => {
                // Network failed — return offline fallback for HTML navigation
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
                // For images, return placeholder
                if (event.request.destination === 'image') {
                    return caches.match('./placeholderimg.jpg');
                }
            });
        })
    );
});
