// 30+ Trains Data
const allTrains = [
    { number: '12951', name: 'Mumbai Rajdhani', dept: '16:55', arr: '08:35', duration: '15h 40m', from: 'MMCT', to: 'NDLS', classes: ['3A', '2A', '1A'] },
    { number: '12953', name: 'August Kranti Rajdhani', dept: '17:25', arr: '09:25', duration: '16h', from: 'MMCT', to: 'NDLS', classes: ['3A', '2A', '1A'] },
    { number: '12137', name: 'Punjab Mail', dept: '19:40', arr: '13:30', duration: '17h 50m', from: 'CSTM', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12909', name: 'Bandra Garib Rath', dept: '14:40', arr: '06:50', duration: '16h 10m', from: 'BDTS', to: 'NDLS', classes: ['3A', 'SL'] },
    { number: '12263', name: 'Duronto Express', dept: '22:25', arr: '12:25', duration: '14h', from: 'MMCT', to: 'NDLS', classes: ['3A', '2A', 'SL'] },
    { number: '12925', name: 'Paschim Express', dept: '06:05', arr: '00:50', duration: '18h 45m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12217', name: 'Sampark Kranti', dept: '23:05', arr: '17:20', duration: '18h 15m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A', 'CC'] },
    { number: '12615', name: 'Grand Trunk Express', dept: '07:10', arr: '03:05', duration: '19h 55m', from: 'CSTM', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12471', name: 'Swaraj Express', dept: '18:50', arr: '14:35', duration: '19h 45m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12229', name: 'Lucknow Mail', dept: '23:00', arr: '19:15', duration: '20h 15m', from: 'CSTM', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12617', name: 'Mangala Express', dept: '22:00', arr: '18:40', duration: '20h 40m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12715', name: 'Sachkhand Express', dept: '20:15', arr: '17:30', duration: '21h 15m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12497', name: 'Shane Punjab', dept: '23:55', arr: '22:30', duration: '22h 35m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12903', name: 'Golden Temple Mail', dept: '22:30', arr: '20:15', duration: '21h 45m', from: 'MMCT', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12477', name: 'Jamnagar Express', dept: '20:50', arr: '18:45', duration: '21h 55m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12961', name: 'Avantika Express', dept: '06:25', arr: '23:50', duration: '17h 25m', from: 'MMCT', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12955', name: 'Jaipur Superfast', dept: '18:30', arr: '10:15', duration: '15h 45m', from: 'MMCT', to: 'NDLS', classes: ['3A', '2A', 'SL'] },
    { number: '12979', name: 'Jaipur Express', dept: '19:15', arr: '11:30', duration: '16h 15m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12481', name: 'Suryanagari Express', dept: '17:50', arr: '09:45', duration: '15h 55m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12473', name: 'Sarvodaya Express', dept: '05:50', arr: '01:15', duration: '19h 25m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12931', name: 'Rajdhani Express', dept: '16:30', arr: '08:15', duration: '15h 45m', from: 'MMCT', to: 'NDLS', classes: ['3A', '2A', '1A'] },
    { number: '12219', name: 'Dehradun Express', dept: '21:45', arr: '16:30', duration: '18h 45m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12475', name: 'Hapa Express', dept: '08:15', arr: '05:30', duration: '21h 15m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12957', name: 'Swarna Jayanti', dept: '11:45', arr: '04:30', duration: '16h 45m', from: 'MMCT', to: 'NDLS', classes: ['3A', '2A', 'SL'] },
    { number: '12959', name: 'Dadar Express', dept: '13:20', arr: '06:15', duration: '16h 55m', from: 'DR', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12479', name: 'Suryanagari SF', dept: '15:10', arr: '07:45', duration: '16h 35m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A', '2A'] },
    { number: '12483', name: 'Amritsar Express', dept: '10:30', arr: '05:15', duration: '18h 45m', from: 'BDTS', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12485', name: 'Nanded Express', dept: '04:45', arr: '23:30', duration: '18h 45m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12487', name: 'Seemanchal Express', dept: '02:30', arr: '21:15', duration: '18h 45m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12489', name: 'Dadar Express', dept: '01:15', arr: '19:45', duration: '18h 30m', from: 'DR', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12491', name: 'Mahuadanr Express', dept: '03:45', arr: '22:30', duration: '18h 45m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A'] },
    { number: '12493', name: 'Darjeeling Mail', dept: '21:30', arr: '18:15', duration: '20h 45m', from: 'LTT', to: 'NDLS', classes: ['SL', '3A', '2A'] }
];

let currentFilter = 'all';
let selectedClass = 'All Classes';

function getTimeCategory(time) {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 24) return 'evening';
    return 'night';
}

function filterByTime(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    displayTrains();
}

function displayTrains() {
    const trainList = document.getElementById('trainList');
    trainList.innerHTML = '';
    
    let filteredTrains = allTrains;
    
    // Filter by time
    if (currentFilter !== 'all') {
        filteredTrains = allTrains.filter(train => getTimeCategory(train.dept) === currentFilter);
    }
    
    // Filter by class if not "All Classes"
    if (selectedClass !== 'All Classes' && selectedClass !== 'all') {
        const classMap = {
            'Anubhuti Class (EA)': 'EA',
            'AC First Class (1A)': '1A',
            'AC 2 Tier (2A)': '2A',
            'AC 3 Tier (3A)': '3A',
            'Sleeper (SL)': 'SL',
            'AC Chair Car (CC)': 'CC'
        };
        const classCode = classMap[selectedClass] || selectedClass;
        filteredTrains = filteredTrains.filter(train => train.classes.includes(classCode));
    }
    
    filteredTrains.forEach((train, index) => {
        const seats = Math.floor(Math.random() * 100) + 20;
        const status = seats > 50 ? 'available' : 'waiting';
        
        const card = document.createElement('div');
        card.className = 'train-card';
        card.style.animationDelay = `${index * 0.03}s`;
        
        card.innerHTML = `
            <div class="train-header">
                <div class="train-number">${train.number}</div>
                <div class="train-name">${train.name}</div>
            </div>
            <div class="train-timing">
                <div class="time-box">
                    <div class="time">${train.dept}</div>
                    <div class="station">${train.from}</div>
                </div>
                <div class="duration">
                    <i class="fa-solid fa-arrow-right"></i>
                    <div>${train.duration}</div>
                </div>
                <div class="time-box">
                    <div class="time">${train.arr}</div>
                    <div class="station">${train.to}</div>
                </div>
            </div>
            <div class="train-details">
                <div class="availability">
                    ${train.classes.map(c => `
                        <div class="class-badge ${status}">
                            ${c}: ${Math.floor(Math.random() * 80) + 10}
                        </div>
                    `).join('')}
                </div>
                <button class="book-btn" onclick="bookTrain('${train.number}')">
                    <i class="fa-solid fa-ticket"></i> Book Now
                </button>
            </div>
        `;
        trainList.appendChild(card);
    });
    
    if (filteredTrains.length === 0) {
        trainList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748b;"><h3>No trains found for selected filters</h3></div>';
    }
}

function bookTrain(trainNumber) {
    window.open(`https://www.irctc.co.in/nget/train-search`, '_blank');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from')) document.getElementById('fromStation').textContent = decodeURIComponent(urlParams.get('from'));
    if (urlParams.get('to')) document.getElementById('toStation').textContent = decodeURIComponent(urlParams.get('to'));
    if (urlParams.get('date')) document.getElementById('travelDate').textContent = decodeURIComponent(urlParams.get('date'));
    if (urlParams.get('class')) {
        selectedClass = decodeURIComponent(urlParams.get('class'));
        document.getElementById('travelClass').textContent = selectedClass;
    }
    
    displayTrains();
});