// Error Handler for IRCTC Application
// Prevents undefined variable errors and handles common issues

(function() {
    'use strict';
    
    // Prevent WAP plat undefined errors
    if (typeof window.WAP === 'undefined') {
        window.WAP = {
            plat: 'web',
            version: '1.0.0',
            init: function() { return true; },
            track: function() { return true; }
        };
    }
    
    // Handle undefined tracking variables
    if (typeof window.zybTracker === 'undefined') {
        window.zybTracker = {
            track: function() { return true; },
            init: function() { return true; }
        };
    }
    
    // Prevent console errors for missing functions
    const noOpFunctions = [
        'hybridaction',
        'zybTrackerStatistics', 
        'analytics',
        'tracking',
        'metrics'
    ];
    
    noOpFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'undefined') {
            window[funcName] = function() { return true; };
        }
    });
    
    // Global error handler
    window.addEventListener('error', function(event) {
        // Suppress tracking and analytics errors
        const suppressedErrors = [
            'zybTracker',
            'hybridaction', 
            'WAP',
            'analytics',
            'tracking',
            'copilot'
        ];
        
        if (suppressedErrors.some(error => event.message.includes(error))) {
            event.preventDefault();
            return false;
        }
        
        // Log other errors for debugging
        console.warn('Application Error:', event.message);
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        console.warn('Unhandled Promise Rejection:', event.reason);
        event.preventDefault();
    });
    
    // Ensure DOM is ready before initializing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
    
    function initializeApp() {
        // Initialize any required components
        console.log('✅ IRCTC Application initialized successfully');
        
        // Ensure date input has today's date as minimum
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            if (!dateInput.value) {
                dateInput.value = today;
            }
        }
    }
    
})();