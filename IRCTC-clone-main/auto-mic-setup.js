// Auto Microphone Setup - Proactively requests permission
(function() {
    'use strict';
    
    let permissionRequested = false;
    
    // Check if we should auto-request permission
    function shouldAutoRequest() {
        // Only auto-request on HTTPS or localhost
        const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
        // Don't request if already requested in this session
        const alreadyRequested = sessionStorage.getItem('mic-permission-requested');
        
        return isSecure && !alreadyRequested && !permissionRequested;
    }
    
    // Auto-request microphone permission
    async function autoRequestMicrophone() {
        if (!shouldAutoRequest()) return;
        
        permissionRequested = true;
        sessionStorage.setItem('mic-permission-requested', 'true');
        
        try {
            console.log('🎤 Auto-requesting microphone permission...');
            
            // Request permission silently
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            
            // Stop immediately after getting permission
            stream.getTracks().forEach(track => track.stop());
            
            console.log('✅ Microphone permission granted automatically');
            
            // Update UI if permission manager exists
            if (window.micManager) {
                window.micManager.permissionStatus = 'granted';
                window.micManager.updateUI();
            }
            
            // Show success notification
            showPermissionSuccess();
            
        } catch (error) {
            console.log('ℹ️ Microphone permission not granted automatically');
            // Don't show error - user will be prompted when they try to use voice
        }
    }
    
    // Show success notification
    function showPermissionSuccess() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 1rem 1.5rem; border-radius: 10px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); z-index: 10000; font-size: 0.9rem; max-width: 300px;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.2rem;">🎤</span>
                    <div>
                        <strong>Voice Assistant Ready!</strong><br>
                        <small>Click the microphone button to talk to DISHA</small>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);
    }
    
    // Initialize when DOM is ready
    function initialize() {
        // Wait a bit for other scripts to load
        setTimeout(() => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                autoRequestMicrophone();
            }
        }, 1000);
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();