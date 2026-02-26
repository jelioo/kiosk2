const buildingImages = {
    'Building A': {
        floors: {
            1: 'Bldg. A 1F H1.jpg',
            2: 'Bldg. A 2F H1.jpg'
        },
        floorData: {
            1: [
                {
                    label: 'Room 101',
                    desc: 'Stockroom (SCHOOL PERSONNEL ONLY)',
                    img: 'Building A 1F Stockroom.jpg',
                    directions: 'Building A - 1st Floor Room 101 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the Stock Room or \"Room 101\""
                    ]
                },
                {
                    label: 'Room 102',
                    desc: 'Stockroom (SCHOOL PERSONNEL ONLY)',
                    img: 'Building A 1F 102.jpg',
                    directions: 'Building A - 1st Floor Room 102 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the Standard Classroom or \"Room 102.\""
                    ]
                },
                {
                    label: 'Room 103',
                    desc: 'Stockroom (SCHOOL PERSONEL ONLY)',
                    img: 'Building A 1F 103.jpg',
                    directions: 'Building A - 1st Floor Room 103 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the Standard Classroom or \"Room 103.\""
                    ]
                },
                {
                    label: 'Backstage',
                    desc: 'Backstage (SCHOOL PERSONNEL ONLY)',
                    img: 'Building A 1F Backstage.jpg',
                    directions: 'Building A - STAGE Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to your left, and you have arrived at the backstage door."
                    ]
                },
                {
                    label: 'Restrooms',
                    desc: 'Restrooms (FLOOR 1)',
                    img: 'Building A 1F Restrooms.jpg',
                    directions: 'Building A - 1st Floor Restroom Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the end then turn left."
                    ]
                }
            ],
            2: [
                {
                    label: 'Room 201',
                    desc: 'Classroom',
                    img: 'Building A 2F 201.jpg',
                    directions: 'Building A - 2nd Floor Room 201 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the main Staircase.",
                        "Continue going up until you have reached the second floor.",
                        "Turn to your right and walk until the end.",
                        "You have reached the Classroom or \"Room 201.\""
                    ]
                },
                {
                    label: 'Room 202',
                    desc: 'Stockroom (SCHOOL PERSONEL ONLY)',
                    img: 'Building A 2F 202.jpg',
                    directions: 'Building A - 2nd Floor Room 202 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the main Staircase.",
                        "Continue going up until you have reached the second floor.",
                        "Turn to your right and walk until you have reached the Stockroom or \"Room 202.\""
                    ]
                },
                {
                    label: 'Room 203',
                    desc: 'Classroom (PRACTICAL WORK AREA)',
                    img: 'Building A 2F 203.jpg',
                    directions: 'Building A - 2nd Floor Room 203 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the main Staircase.",
                        "Continue going up until you have reached the second floor.",
                        "Turn to your left and walk until you have reached the Classroom or \"Room 203.\""
                    ]
                },
                {
                    label: 'Room 204',
                    desc: 'Classroom (PRACTICAL WORK AREA)',
                    img: 'Building A 2F 204.jpg',
                    directions: 'Building A - 2nd Floor Room 204 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the main Staircase.",
                        "Continue going up until you have reached the second floor.",
                        "Turn to your left and walk until you have reached the Classroom or \"Room 204.\""
                    ]
                },
                {
                    label: 'Room 205',
                    desc: 'English Faculty (SCHOOL PERSONNEL ONLY)',
                    img: 'Building A 2F ENG FACULTY.jpg',
                    directions: 'Building A - 2nd Floor ENG Faculty Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the main Staircase.",
                        "Continue going up until you have reached the second floor.",
                        "Turn to your left and walk until you have reached the \"English Faculty\" or \"Room 205.\""
                    ]
                },
                {
                    label: 'Restrooms',
                    desc: 'Restrooms (FLOOR 2)',
                    img: 'Building A 2F Restrooms.jpg',
                    directions: 'Building A - 2nd Floor Restroom Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk straight ahead towards the quadrangle.",
                        "Turn towards Building A, coming from your right",
                        "Proceed to the designated floor.",
                        "Turn to the right after reaching the turning point.",
                        "Continue walking until you have reached the main Staircase.",
                        "Continue going up until you have reached the second floor.",
                        "Turn to your left and walk until you have reached the appropriate restroom."
                    ]
                }
            ]
        },
        rooms: {}
    },
    'Building B': {
        floors: {
            1: 'Bldg. B 1F H1.jpg',
            2: 'Bldg. B 2F H1.jpg'
        },
        floorData: {
            1: [
                {
                    label: 'Room 101',
                    desc: 'Standard Classroom',
                    img: 'Building B 1F 101.jpg',
                    directions: 'placeholderimg.jpg', // No specific found
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then turn left after reaching the end.",
                        "Walk along the hallway to find Room 101."
                    ]
                },
                {
                    label: 'Room 106',
                    desc: 'Prefect of Discipline (SCHOOL PERSONNEL ONLY)',
                    img: 'Building B 1F 106.jpg',
                    directions: 'Building B - 1st Floor Prefect of Discipline (Room 106) Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then turn left after reaching the end.",
                        "Walk until you have reached the \"Prefect of Discipline\" or \"Room 106.\""
                    ]
                },
                {
                    label: 'Room 111',
                    desc: 'Canteen Cook (SCHOOL PERSONNEL ONLY)',
                    img: 'Building B 1F 111.jpg',
                    directions: 'Building B - 1st Floor Food Room Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then turn left after reaching the end.",
                        "Walk until you have reached end of the hallway",
                        "Turn left then keep walking until you have reached the \"Canteen's Cook\" or \"Room 111.\""
                    ]
                },
                {
                    label: 'Room 112',
                    desc: 'TLE Faculty (SCHOOL PERSONNEL ONLY)',
                    img: 'Building B 1F 112.jpg',
                    directions: 'Building B - 1st Floor TLE Faculty (Room 112) Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then turn left after reaching the end.",
                        "Walk until you have reached the room in the end of the hallway.",
                        "You have arrived at the \"TLE Faculty\" or \"Room 112.\""
                    ]
                },
                {
                    label: 'Clinic',
                    desc: 'School Clinic',
                    img: 'Building B 1F Clinic.jpg',
                    directions: 'Building B - 1st Floor Medical Clinic Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then turn left after reaching the end.",
                        "Walk until you have reached the \"School Clinic.\""
                    ]
                },
                {
                    label: 'Conference Room',
                    desc: 'Conference Room (SCHOOL PERSONNEL ONLY)',
                    img: 'Building B 1F Conference Room.jpg',
                    directions: 'Building B - 1st Floor Conference Room Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right until you have reached the \"Conference Room.\""
                    ]
                },
                {
                    label: 'Dental Office',
                    desc: 'Dental Clinic',
                    img: 'Building B 1F Dental Office.jpg',
                    directions: 'Building B - 1st Floor Dental Office Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then turn left after reaching the end.",
                        "Walk until you have reached the \"Dental Clinic.\""
                    ]
                },
                {
                    label: 'Dept. Heads Office',
                    desc: 'Department Head\'s Office (SCHOOL PERSONNEL ONLY)',
                    img: 'Building B 1F Department Heads Office.jpg',
                    directions: 'Building B - 1st Floor Department Heads Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your left, then turn right after reaching the end.",
                        "Keep walking until you have reached the \"Department Head's Office.\""
                    ]
                },
                {
                    label: 'Open Court',
                    desc: 'Open Court',
                    img: 'Building B 1F Empty Grounds.jpg',
                    directions: 'Building B - 1st Floor Empty Grounds Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your left, then turn right after reaching the end.",
                        "Walk until you have reached end of the hallway.",
                        "Then walk right until you have reached the \"Open Court.\""
                    ]
                },
                {
                    label: 'Asst. Principal',
                    desc: 'Assistant Principal\'s Office (SCHOOL PERSONNEL ONLY)',
                    img: 'Building B 1F Office of the Assistant School Principal.jpg',
                    directions: 'Building B - 1st Floor Office of the Assistant Principal Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then turn left after reaching the end.",
                        "Walk until you have reached the \"Assistant Principal's Office.\""
                    ]
                },
                {
                    label: 'Registrar',
                    desc: 'Registrar/Record\'s Room',
                    img: 'Building B 1F Office of the Registrar.jpg',
                    directions: 'Building B - 1st Floor Office of the Registrar Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your left and you have reached the \"Registrar.\""
                    ]
                },
                {
                    label: 'School Canteen',
                    desc: 'School Canteen',
                    img: 'Building B 1F School Canteen.jpg',
                    directions: 'Building B - 1st Floor School Canteen Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your left, then turn right after reaching the end.",
                        "Walk until you have reached end of the hallway.",
                        "You have arrived at the School Canteen."
                    ]
                },
                {
                    label: 'Restrooms',
                    desc: 'Restroom (First Floor)',
                    img: 'Building B 1F Restrooms.jpg',
                    directions: 'placeholderimg.jpg', // No specific found
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your left, then turn right.",
                        "Keep walking until you have reached the restrooms"
                    ]
                }
            ],
            2: [
                {
                    label: 'Room 202',
                    desc: 'Korean Classroom',
                    img: 'Building B 2F 202.jpg',
                    directions: 'Building B - 2nd Floor Korean Class (Room 202) Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then proceed to the staircase.",
                        "Go up until you have reached your designated Floor.",
                        "Walk straight then turn right.",
                        "Keep walking until you have reached the \"Korean Classroom\" or \"Room 202.\""
                    ]
                },
                {
                    label: 'Room 205',
                    desc: 'Classroom',
                    img: 'Building B 2F 205.jpg',
                    directions: 'Building B - 2nd Floor Room 205 Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then proceed to the staircase.",
                        "Go up until you have reached your designated Floor.",
                        "Walk straight then turn right.",
                        "Keep walking until you have reached the end and turn left, keep walking.",
                        "Turn left and you have arrived at the Classroom or \"Room 205\""
                    ]
                },
                {
                    label: 'Journalism Room',
                    desc: 'Journalism Room (Authorized Personnel Only)',
                    img: 'Building B 2F Journalism Room.jpg',
                    directions: 'Building B - 2nd Floor Journalism Room Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then proceed to the staircase.",
                        "Go up until you have reached your designated Floor.",
                        "Walk straight then turn right.",
                        "Keep walking until you have reached the \"Journalism Room.\""
                    ]
                },
                {
                    label: 'Makerspace',
                    desc: 'Makerspace (Authorized Personnel Only)',
                    img: 'Building B 2F Makerspace.jpg',
                    directions: 'Building B - 2nd Floor Makerspace Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then proceed to the staircase.",
                        "Go up until you have reached your designated Floor.",
                        "Walk straight and you have arrived at the \"Maker Space\""
                    ]
                },
                {
                    label: 'RHS Hall',
                    desc: 'RHS Hall (Authorized Personnel Only)',
                    img: 'Building B 2F RHS Hall.jpg',
                    directions: 'Building B - 2nd Floor RHS Hall Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then proceed to the staircase.",
                        "Go up until you have reached your designated Floor.",
                        "Walk straight then turn right.",
                        "Keep walking until you have reached the \"RHS Hall.\""
                    ]
                },
                {
                    label: 'Restrooms',
                    desc: 'Restroom Floor 2',
                    img: 'Building B 2F Restrooms.jpg',
                    directions: 'Building B - 2nd Floor Restroom Directions.jpg',
                    textDirections: [
                        "Start at the Main Kiosk near the gate.",
                        "Walk to your right, then proceed to the staircase.",
                        "Go up until you have reached your designated Floor.",
                        "Walk straight then turn right.",
                        "Keep walking until you have reached the end and turn left, keep walking.",
                        "Turn left and you have arrived at the restroom."
                    ]
                }
            ]
        },
        rooms: {}
    },
    'Building C': {
        floors: {
            1: 'Bldg. C H1.jpg',
            2: 'Bldg. C 2F H1.jpg'
        },
        floorData: {
            1: [
                {
                    label: 'Room 101',
                    desc: 'Cookery Laboratory 9',
                    img: 'Building C 1F 101.jpg',
                    directions: 'Building C - 1st Floor Cookery Lab (Room 101) Directions.jpg',
                    textDirections: [
                        "Start at the kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Go straight until you reach the restrooms.",
                        "After reaching the restrooms, turn left.",
                        "Walk straight until you reach Cookery Lab 9 (Room 101)."
                    ]
                },
                {
                    label: 'Room 105',
                    desc: 'TVL - FBS Room',
                    img: 'Building C 1F 105 TVL - FBS Room.jpg',
                    directions: 'Building C - 1st Floor TVL-FBS Room Directions.jpg',
                    textDirections: [
                        "Start at the kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Walk straight until you see the TVL room on the right corner.",
                        "You will see Room 105."
                    ]
                },
                {
                    label: 'Room 106',
                    desc: 'Cookery Laboratory',
                    img: 'Building C 1F 106 Cookery Laboratory.jpg',
                    directions: 'Building C - 1st Floor Cookery Laboratory Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Walk straight until you see the Cookery Lab (Room 106) on the right corner."
                    ]
                },
                {
                    label: 'JHS Guidance Office',
                    desc: 'JHS Guidance Office',
                    img: 'Building C 1F JHS Guidance Office.jpg',
                    directions: 'Building C - 1st Floor JHS Guidance Office Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Walk straight ahead until you reach the JHS Guidance Office on the right corner."
                    ]
                },
                {
                    label: 'SHS Guidance Office',
                    desc: 'SHS Guidance Office',
                    img: 'Building C 1F SHS Guidance Office.jpg',
                    directions: 'Building C - 1st Floor SHS Guidance Office Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Walk straight ahead until you see the label “Guidance Office” on the right corner.",
                        "Walk a little past the JHS Guidance Office to reach the SHS Guidance Office."
                    ]
                },
                {
                    label: 'Restrooms',
                    desc: 'Comfort Rooms',
                    img: 'Building C 1F Restrooms.jpg',
                    directions: 'Building C - 1st Floor Restroom Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Walk straight ahead until you reach the restrooms at the end of the building."
                    ]
                },
                {
                    label: 'Garden Area 1',
                    desc: 'Outdoor Garden',
                    img: 'Bldg. A,B,C Garden.jpg',
                    directions: 'Building C - 1st Floor Teen Center Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Walk straight ahead until you reach the turning point.",
                        "Turn left and walk straight ahead.",
                        "You will see the stairs going down to Garden Area 1."
                    ]
                },
                {
                    label: 'Garden Area 2',
                    desc: 'Outdoor Garden',
                    img: 'Bldg. A,B,C Garden 2.jpg',
                    directions: 'Building C - 1st Floor Teen Center Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Turn toward Building C.",
                        "Walk straight ahead until you reach the turning point.",
                        "Turn left and walk straight ahead to the stairs going down to Garden Area 1.",
                        "From Garden Area 1, turn right to reach Garden Area 2."
                    ]
                },
                {
                    label: 'Reading Park',
                    desc: 'School Reading Park',
                    img: 'Bldg. C, D School Reading Park.jpg',
                    directions: 'Building C - 1st Floor Teen Center Directions.jpg'
                }
            ],
            2: [
                { label: 'Room 201', desc: 'SHS Computer Lab', img: 'Building C 2F 201 SHS Computer Lab.jpg', directions: 'Building C - 2nd Floor Computer Laboratory (Room 201 - 202) Directions.jpg' },
                { label: 'Room 202', desc: 'SHS Computer Lab', img: 'Building C 2F 202 SHS Computer Lab.jpg', directions: 'Building C - 2nd Floor Computer Laboratory (Room 201 - 202) Directions.jpg' },
                { label: 'Room 204', desc: 'E-Library', img: 'Building C 2F 204 E - Library.jpg', directions: 'Building C - 2nd Floor E - Library (Room 204) Directions.jpg' },
                { label: 'Room 205', desc: 'Standard Classroom', img: 'Building C 2F 205.jpg', directions: 'Building C - 2nd Floor Room 205 Directions.jpg' },
                { label: 'Room 206', desc: 'Standard Classroom', img: 'Building C 2F 206.jpg', directions: 'Building C - 2nd Floor Room 206 Directions.jpg' },
                { label: 'Finance Office', desc: 'School Finance', img: 'Building C 2F Finance Office.jpg', directions: 'Building C - 2nd Floor Finance Room (Room 207) Directions.jpg' },
                { label: 'Restrooms', desc: 'Comfort Rooms', img: 'Building C 2F Restrooms.jpg', directions: 'Building C - 2nd Floor Restroom Directions.jpg' }
            ]
        },
        rooms: {
            '101': 'Building C 1F 101.jpg',
            '105': 'Building C 1F 105 TVL - FBS Room.jpg',
            '106': 'Building C 1F 106 Cookery Laboratory.jpg',
            '201': 'Building C 2F 201 SHS Computer Lab.jpg',
            '202': 'Building C 2F 202 SHS Computer Lab.jpg',
            '204': 'Building C 2F 204 E - Library.jpg',
            '205': 'Building C 2F 205.jpg',
            '206': 'Building C 2F 206.jpg'
        }
    },
    'Building D': {
        floors: {
            1: 'Bldg. D 1F H1.jpg',
            2: 'Bldg. D 2F H1.jpg'
        },
        floorData: {
            1: [
                {
                    label: 'Room 101',
                    desc: 'Standard Classroom',
                    img: 'Building D 1F 101.jpg',
                    directions: 'Building D - 1st Floor Room 101 Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Walk toward Building D.",
                        "Go to the right corner where the stairs are located.",
                        "The first door you will see on the left is Room 101."
                    ]
                },
                {
                    label: 'Room 102',
                    desc: 'Standard Classroom',
                    img: 'Building D 1F 102.jpg',
                    directions: 'Building D - 1st Floor Room 102 Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Walk toward Building D.",
                        "Go to the right corner where the stairs are located.",
                        "Walk a little past Room 101 to reach Room 102."
                    ]
                },
                {
                    label: 'Girls\' Restroom',
                    desc: 'Restroom (Floor 1)',
                    img: 'Building D 1F Restrooms.jpg',
                    directions: 'placeholderimg.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Walk toward Building D.",
                        "Go to the right corner where the stairs are located.",
                        "Turn left and walk straight ahead.",
                        "Turn right to reach the girls’ restroom."
                    ]
                },
                {
                    label: 'Reading Park',
                    desc: 'School Reading Park',
                    img: 'Bldg. C, D School Reading Park.jpg',
                    directions: 'placeholderimg.jpg', // Placeholder directions
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Walk between Building C and D to find the Reading Park."
                    ]
                }
            ],
            2: [
                {
                    label: 'Room 201',
                    desc: 'Standard Classroom',
                    img: 'Building D 2F 201.jpg',
                    directions: 'Building D - 2nd Floor Room 201 Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Walk toward Building D.",
                        "Go to the right corner where the stairs are located.",
                        "Walk past all rooms on Floor 1 and continue straight to the stairs.",
                        "Walk up the stairs from Floor 1 to Floor 2.",
                        "Walk straight ahead on the left side until you reach the last room, Room 201."
                    ]
                },
                {
                    label: 'Room 202',
                    desc: 'Standard Classroom',
                    img: 'Building D 2F 202.jpg',
                    directions: 'Building D - 2nd Floor Room 202 Directions.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Walk toward Building D.",
                        "Go to the right corner where the stairs are located.",
                        "Walk past all rooms on Floor 1 and continue straight to the stairs.",
                        "Walk up the stairs from Floor 1 to Floor 2.",
                        "Turn left. The first room you will see is Room 202."
                    ]
                },
                {
                    label: 'Boys\' Restroom',
                    desc: 'Restroom (Floor 2)',
                    img: 'Building D 2F Restrooms.jpg',
                    directions: 'placeholderimg.jpg',
                    textDirections: [
                        "Start at the main kiosk near the gate.",
                        "Walk straight ahead toward the quadrangle.",
                        "Walk toward Building D.",
                        "Go to the right corner where the stairs are located.",
                        "Walk past all rooms on Floor 1 and continue straight to the stairs.",
                        "Walk up the stairs from Floor 1 to Floor 2.",
                        "Turn left. The boys’ restroom is on the left."
                    ]
                }
            ]
        },
        rooms: {
            '101': 'Building D 1F 101.jpg',
            '102': 'Building D 1F 102.jpg',
            '201': 'Building D 2F 201.jpg',
            '202': 'Building D 2F 202.jpg' // Filename as found in directory
        }
    }
};
