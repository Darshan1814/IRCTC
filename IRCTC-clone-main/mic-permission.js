// Enhanced Microphone Permission Handler
class MicrophonePermissionManager {
    constructor() {
        this.permissionStatus = 'unknown';
        this.stream = null;
        this.checkPermissionStatus();
    }

    async checkPermissionStatus() {
        try {
            if (navigator.permissions) {
                const permission = await navigator.permissions.query({ name: 'microphone' });
                this.permissionStatus = permission.state;
                console.log(`🎤 Microphone permission: ${permission.state}`);
                
                permission.onchange = () => {
                    this.permissionStatus = permission.state;
                    this.updateUI();
                };
            }
        } catch (error) {
            console.log('Permission API not supported');
        }
        this.updateUI();
    }

    async requestPermission() {
        try {
            console.log('🎤 Requesting microphone permission...');
            
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            
            this.permissionStatus = 'granted';
            console.log('✅ Microphone permission granted');
            this.updateUI();
            
            // Stop the stream immediately after getting permission
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
            
            return true;
        } catch (error) {
            this.permissionStatus = 'denied';
            console.error('❌ Microphone permission denied:', error);
            this.handlePermissionError(error);
            return false;
        }
    }

    showPermissionModal() {
        // Remove existing modal if any
        const existingModal = document.getElementById('mic-permission-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'mic-permission-modal';
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 100000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 450px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎤</div>
                    <h3 style="color: #1e40af; margin-bottom: 1rem;">Enable Voice Assistant</h3>
                    <p style="color: #64748b; margin-bottom: 1.5rem;">Click "Allow" when your browser asks for microphone permission to use DISHA voice assistant.</p>
                    <div style="background: #f0f9ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: left; font-size: 0.9rem;">
                        <strong>Steps:</strong><br>
                        1. Browser will show permission popup<br>
                        2. Click "Allow" or "Yes"<br>
                        3. Voice assistant will start automatically
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="micManager.hidePermissionModal()" style="padding: 0.75rem 1.5rem; border: 1px solid #e2e8f0; background: white; border-radius: 8px; cursor: pointer;">Use Text Chat Instead</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    hidePermissionModal() {
        const modal = document.getElementById('mic-permission-modal');
        if (modal) modal.remove();
    }

    handlePermissionError(error) {
        this.hidePermissionModal();
        
        let message = '';
        let instructions = '';
        
        switch (error.name) {
            case 'NotAllowedError':
                message = 'Microphone Access Blocked';
                instructions = `
                    <div style="text-align: left; margin: 1rem 0;">
                        <strong>To enable microphone:</strong><br>
                        1. Click the 🔒 or 🎤 icon in your address bar<br>
                        2. Select "Allow" for microphone<br>
                        3. Refresh the page and try again<br><br>
                        <strong>Or use text chat below instead!</strong>
                    </div>
                `;
                break;
            case 'NotFoundError':
                message = 'No Microphone Found';
                instructions = `
                    <div style="text-align: left; margin: 1rem 0;">
                        <strong>Solutions:</strong><br>
                        • Connect a microphone or headset<br>
                        • Check your device settings<br>
                        • Use text chat instead<br>
                    </div>
                `;
                break;
            case 'NotReadableError':
                message = 'Microphone Busy';
                instructions = `
                    <div style="text-align: left; margin: 1rem 0;">
                        <strong>Try this:</strong><br>
                        • Close other apps using microphone<br>
                        • Restart your browser<br>
                        • Use text chat instead<br>
                    </div>
                `;
                break;
            default:
                message = 'Voice Not Available';
                instructions = `
                    <div style="text-align: left; margin: 1rem 0;">
                        <strong>Alternatives:</strong><br>
                        • Use Chrome or Edge browser<br>
                        • Try text chat below<br>
                        • Check browser settings<br>
                    </div>
                `;
        }

        this.showErrorModal(message, instructions);
    }

    showErrorModal(title, content) {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 100000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 450px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h3 style="color: #dc2626; margin-bottom: 1rem;">${title}</h3>
                    ${content}
                    <button onclick="this.closest('div').parentElement.remove()" style="padding: 0.75rem 2rem; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Got It</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    updateUI() {
        const voiceBtn = document.getElementById('voiceBtn');
        const dishaVoiceBubble = document.getElementById('dishaVoiceBubble');
        
        if (voiceBtn) {
            switch (this.permissionStatus) {
                case 'granted':
                    voiceBtn.style.opacity = '1';
                    voiceBtn.title = 'Voice Assistant (Click to start)';
                    voiceBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    break;
                case 'denied':
                    voiceBtn.style.opacity = '0.5';
                    voiceBtn.title = 'Microphone access denied - Use text chat';
                    voiceBtn.style.background = '#9ca3af';
                    break;
                default:
                    voiceBtn.style.opacity = '0.8';
                    voiceBtn.title = 'Click to enable voice assistant';
                    voiceBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            }
        }

        if (dishaVoiceBubble) {
            switch (this.permissionStatus) {
                case 'granted':
                    dishaVoiceBubble.style.opacity = '1';
                    dishaVoiceBubble.title = 'DISHA Voice Assistant (Ready)';
                    break;
                case 'denied':
                    dishaVoiceBubble.style.opacity = '0.7';
                    dishaVoiceBubble.title = 'DISHA Assistant (Text only - Mic blocked)';
                    break;
                default:
                    dishaVoiceBubble.style.opacity = '0.9';
                    dishaVoiceBubble.title = 'DISHA Assistant (Click to enable voice)';
            }
        }
    }

    stopStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    async hasPermission() {
        if (this.permissionStatus === 'granted') return true;
        return await this.requestPermission();
    }
}

// Initialize microphone manager
window.micManager = new MicrophonePermissionManager();

// Enhanced voice call handler
async function handleVoiceCallWithPermission() {
    // Show permission modal first
    if (window.micManager.permissionStatus !== 'granted') {
        window.micManager.showPermissionModal();
    }
    
    const hasPermission = await window.micManager.hasPermission();
    if (hasPermission) {
        window.micManager.hidePermissionModal();
        // Call the original voice handler
        if (window.handleVoiceCall) {
            window.handleVoiceCall();
        }
    }
}

// Override the original function
window.addEventListener('load', () => {
    // Replace voice button handler
    const voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.onclick = handleVoiceCallWithPermission;
    }
    
    // Replace DISHA bubble handler  
    const dishaVoiceBubble = document.getElementById('dishaVoiceBubble');
    if (dishaVoiceBubble) {
        dishaVoiceBubble.onclick = handleVoiceCallWithPermission;
    }
    
    console.log('🎤 Enhanced microphone permission manager loaded');
});