// Mobile Navigation JavaScript
(function() {
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    const mobileNavHTML = `
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
            <i class="fa-solid fa-bars"></i>
        </button>
        
        <div class="mobile-overlay" id="mobileOverlay"></div>
        
        <nav class="mobile-sidebar" id="mobileSidebar">
            <div class="mobile-nav-section">
                <h3>Account</h3>
                <a href="https://www.irctc.co.in/nget/profile/user-login" class="mobile-nav-item">
                    <i class="fa-solid fa-right-to-bracket"></i> LOGIN
                </a>
                <a href="https://www.irctc.co.in/nget/profile/user-registration" class="mobile-nav-item">
                    <i class="fa-solid fa-user-plus"></i> REGISTER
                </a>
                <a href="https://agent.irctc.co.in/nget/train-search" class="mobile-nav-item">
                    <i class="fa-solid fa-user-tie"></i> AGENT LOGIN
                </a>
                <a href="https://www.irctc.co.in/nget/feedback" class="mobile-nav-item">
                    <i class="fa-solid fa-envelope"></i> CONTACT US
                </a>
                <a href="./ask-disha.html" class="mobile-nav-item">
                    <i class="fa-solid fa-robot"></i> ASK DISHA
                </a>
                <a href="https://www.irctc.co.in/nget/enquiry/alerts" class="mobile-nav-item">
                    <i class="fa-solid fa-bell"></i> ALERTS
                </a>
            </div>
            
            <div class="mobile-nav-section">
                <h3>Services</h3>
                <div class="mobile-nav-expandable" onclick="toggleMobileSubmenu('exclusive')">
                    <span><i class="fa-solid fa-star"></i> IRCTC EXCLUSIVE</span>
                    <i class="fa-solid fa-chevron-down arrow"></i>
                </div>
                <div class="mobile-submenu" id="exclusive-submenu">
                    <a href="https://www.irctc.co.in/nget/profile/user-registration">IRCTC eWallet</a>
                    <a href="https://www.irctcpay.com/">IRCTC-iPAY</a>
                    <a href="https://www.irctc.co.in/nget/gift-voucher">e-Gift Vouchers</a>
                </div>
                
                <div class="mobile-nav-expandable" onclick="toggleMobileSubmenu('trains')">
                    <span><i class="fa-solid fa-train"></i> TRAINS</span>
                    <i class="fa-solid fa-chevron-down arrow"></i>
                </div>
                <div class="mobile-submenu" id="trains-submenu">
                    <a href="https://www.irctc.co.in/nget/train-search">Book Ticket</a>
                    <a href="https://www.irctc.co.in/nget/booking/foreign-tourist">Foreign Tourist Booking</a>
                    <a href="https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html">PNR Enquiry</a>
                    <a href="https://www.indianrail.gov.in/enquiry/TrainRoute/TrainRoute.html">Train Schedule</a>
                    <a href="https://www.irctc.co.in/nget/booking/cancel-ticket">Cancel Ticket</a>
                    <a href="https://www.indianrail.gov.in/enquiry/LiveStation/LiveStation.html">Track Your Train</a>
                </div>
                
                <a href="https://www.bus.irctc.co.in/home" class="mobile-nav-item">
                    <i class="fa-solid fa-bus"></i> BUSES
                </a>
                <a href="https://www.air.irctc.co.in/" class="mobile-nav-item">
                    <i class="fa-solid fa-plane"></i> FLIGHTS
                </a>
                <a href="https://www.hotel.irctctourism.com/hotel" class="mobile-nav-item">
                    <i class="fa-solid fa-hotel"></i> HOTELS
                </a>
            </div>
            
            <div class="mobile-nav-section">
                <h3>Packages</h3>
                <div class="mobile-nav-expandable" onclick="toggleMobileSubmenu('holidays')">
                    <span><i class="fa-solid fa-umbrella-beach"></i> HOLIDAYS</span>
                    <i class="fa-solid fa-chevron-down arrow"></i>
                </div>
                <div class="mobile-submenu" id="holidays-submenu">
                    <a href="https://www.irctctourism.com/bharatgaurav">Tourist Trains</a>
                    <a href="https://www.irctctourism.com/tourpacakage_search">Tour Packages</a>
                    <a href="https://www.hotel.irctctourism.com/hotel">Stays</a>
                </div>
                
                <div class="mobile-nav-expandable" onclick="toggleMobileSubmenu('loyalty')">
                    <span><i class="fa-solid fa-credit-card"></i> LOYALTY</span>
                    <i class="fa-solid fa-chevron-down arrow"></i>
                </div>
                <div class="mobile-submenu" id="loyalty-submenu">
                    <a href="https://www.sbicard.com/en/personal/credit-cards/lifestyle/irctc-sbi-card.page">IRCTC SBI Card</a>
                    <a href="https://www.bobfinancial.com/credit-card/irctc-bob-rupay-credit-card.html">IRCTC BOB Card</a>
                    <a href="https://www.hdfcbank.com/personal/pay/cards/credit-cards/irctc-hdfc-bank-credit-card">IRCTC HDFC Card</a>
                </div>
                
                <div class="mobile-nav-expandable" onclick="toggleMobileSubmenu('meals')">
                    <span><i class="fa-solid fa-utensils"></i> MEALS</span>
                    <i class="fa-solid fa-chevron-down arrow"></i>
                </div>
                <div class="mobile-submenu" id="meals-submenu">
                    <a href="https://www.ecatering.irctc.co.in/">Order Food</a>
                    <a href="https://www.ecatering.irctc.co.in/menu">Food Menu</a>
                </div>
                
                <div class="mobile-nav-expandable" onclick="toggleMobileSubmenu('promotions')">
                    <span><i class="fa-solid fa-tags"></i> PROMOTIONS</span>
                    <i class="fa-solid fa-chevron-down arrow"></i>
                </div>
                <div class="mobile-submenu" id="promotions-submenu">
                    <a href="https://www.irctc.co.in/nget/offers">Current Offers</a>
                    <a href="https://www.irctc.co.in/nget/seasonal-offers">Seasonal Offers</a>
                    <a href="https://www.irctc.co.in/nget/bank-offers">Bank Offers</a>
                </div>
                
                <div class="mobile-nav-expandable" onclick="toggleMobileSubmenu('more')">
                    <span><i class="fa-solid fa-ellipsis"></i> MORE</span>
                    <i class="fa-solid fa-chevron-down arrow"></i>
                </div>
                <div class="mobile-submenu" id="more-submenu">
                    <a href="https://www.irctc.co.in/nget/train-between-stations">Trains Between Stations</a>
                    <a href="https://www.indianrail.gov.in/enquiry/Fare/Fare.html">Fare Enquiry</a>
                    <a href="https://www.irctc.co.in/nget/booking-history">Booking History</a>
                    <a href="https://www.irctc.co.in/nget/refund-status">Refund Status</a>
                </div>
            </div>
        </nav>
    `;
    
    document.addEventListener('DOMContentLoaded', function() {
        if (!isMobile()) return;
        
        // Remove existing mobile nav if any
        const existing = document.getElementById('mobileMenuBtn');
        if (existing) existing.remove();
        
        const header = document.getElementById('main-header');
        if (header) {
            header.insertAdjacentHTML('afterbegin', mobileNavHTML);
            initMobileNav();
        }
    });
    
    window.addEventListener('resize', function() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('mobileSidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        if (!isMobile() && sidebar) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            if (menuBtn) menuBtn.querySelector('i').className = 'fa-solid fa-bars';
        }
    });
    
    function initMobileNav() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('mobileSidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        if (!menuBtn || !sidebar || !overlay) return;
        
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.className = sidebar.classList.contains('active') ? 'fa-solid fa-times' : 'fa-solid fa-bars';
        });
        
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
        
        sidebar.querySelectorAll('.mobile-nav-item').forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                menuBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
    
    window.toggleMobileSubmenu = function(id) {
        const submenu = document.getElementById(id + '-submenu');
        if (!submenu) return;
        
        const expandable = submenu.previousElementSibling;
        
        submenu.classList.toggle('active');
        if (expandable) expandable.classList.toggle('active');
    };
    
    console.log('Mobile nav loaded - v2');
})();
