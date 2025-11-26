// Dropdown positioning fix
(function() {
    'use strict';
    
    function positionDropdown(dropdown) {
        const trigger = dropdown.querySelector('span');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (!trigger || !content) return;
        
        const rect = trigger.getBoundingClientRect();
        
        // Position dropdown below trigger
        content.style.position = 'fixed';
        content.style.top = (rect.bottom + 5) + 'px';
        content.style.left = rect.left + 'px';
        content.style.zIndex = '2147483647';
    }
    
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('span');
            const content = dropdown.querySelector('.dropdown-content');
            
            if (!trigger || !content) return;
            
            // Position on hover
            dropdown.addEventListener('mouseenter', () => {
                positionDropdown(dropdown);
            });
            
            // Reposition on scroll/resize
            window.addEventListener('scroll', () => {
                if (dropdown.matches(':hover')) {
                    positionDropdown(dropdown);
                }
            });
            
            window.addEventListener('resize', () => {
                if (dropdown.matches(':hover')) {
                    positionDropdown(dropdown);
                }
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdowns);
    } else {
        initDropdowns();
    }
    
})();