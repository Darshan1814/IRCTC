// Vapi Voice Assistant Integration for IRCTC DISHA
class VapiVoiceAssistant {
    constructor() {
        this.publicKey = 'a4e52b1b-a945-4d62-92ba-69a11ee1e534';
        this.assistantId = '332aec6c-c0ba-4858-850b-aea343165fbd';
        this.vapi = null;
        this.isCallActive = false;
        this.initializeVapi();
    }

    async initializeVapi() {
        try {
            // Wait for Vapi SDK to be available
            await this.waitForVapi();
            
            // Initialize Vapi
            this.vapi = new window.Vapi(this.publicKey);
            this.setupEventListeners();
            console.log('✅ Vapi Voice Assistant initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Vapi:', error);
            this.showVapiFallback();
        }
    }

    waitForVapi() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 20;
            
            const checkVapi = () => {
                if (window.Vapi) {
                    console.log('✅ Vapi SDK found');
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Vapi SDK not loaded'));
                } else {
                    attempts++;
                    setTimeout(checkVapi, 200);
                }
            };
            
            checkVapi();
        });
    }

    showVapiFallback() {
        // Show fallback message if Vapi fails
        const bubble = document.getElementById('dishaVoiceBubble');
        if (bubble) {
            bubble.title = 'Voice assistant temporarily unavailable';
            bubble.style.opacity = '0.5';
        }
    }

    setupEventListeners() {
        if (!this.vapi) return;

        this.vapi.on('call-start', () => {
            console.log('📞 Call started with DISHA');
            this.isCallActive = true;
            this.updateVoiceButton(true);
        });

        this.vapi.on('call-end', () => {
            console.log('📞 Call ended');
            this.isCallActive = false;
            this.updateVoiceButton(false);
        });

        this.vapi.on('speech-start', () => {
            console.log('🎤 User started speaking');
        });

        this.vapi.on('speech-end', () => {
            console.log('🎤 User stopped speaking');
        });

        this.vapi.on('message', (message) => {
            console.log('💬 Message:', message);
        });

        this.vapi.on('error', (error) => {
            console.error('❌ Vapi error:', error);
            this.isCallActive = false;
            this.updateVoiceButton(false);
        });
    }

    async startCall() {
        if (!this.vapi) {
            console.error('❌ Vapi not initialized');
            alert('Voice assistant is not available. Please try the text chat instead.');
            return;
        }

        if (this.isCallActive) {
            console.log('📞 Ending current call...');
            this.endCall();
            return;
        }

        try {
            console.log('📞 Starting call with DISHA...');
            await this.vapi.start(this.assistantId);
        } catch (error) {
            console.error('❌ Failed to start call:', error);
            alert('Failed to start voice call. Please check your microphone permissions.');
            this.updateVoiceButton(false);
        }
    }

    endCall() {
        if (this.vapi && this.isCallActive) {
            console.log('📞 Ending call...');
            this.vapi.stop();
        }
    }

    updateVoiceButton(isActive) {
        const voiceBtn = document.getElementById('voiceBtn');
        const dishaBubble = document.getElementById('dishaVoiceBubble');
        const voiceIndicator = document.getElementById('voiceIndicator');
        
        if (voiceBtn) {
            if (isActive) {
                voiceBtn.classList.add('calling');
                voiceBtn.innerHTML = '<i class="fa-solid fa-phone-slash"></i>';
                voiceBtn.title = 'End Call with DISHA';
            } else {
                voiceBtn.classList.remove('calling');
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
                voiceBtn.title = 'Call DISHA Voice Assistant';
            }
        }
        
        if (dishaBubble && voiceIndicator) {
            if (isActive) {
                dishaBubble.classList.add('calling');
                voiceIndicator.classList.add('active');
                dishaBubble.title = 'End Call with DISHA';
            } else {
                dishaBubble.classList.remove('calling');
                voiceIndicator.classList.remove('active');
                dishaBubble.title = 'Talk to DISHA';
            }
        }
    }
}

// Initialize Vapi Voice Assistant
let vapiAssistant = null;

document.addEventListener('DOMContentLoaded', () => {
    vapiAssistant = new VapiVoiceAssistant();
});

// Function to handle voice button click
function handleVoiceCall() {
    if (vapiAssistant && vapiAssistant.vapi) {
        vapiAssistant.startCall();
    } else {
        console.error('❌ Vapi Assistant not initialized');
        // Fallback: try to reinitialize
        if (vapiAssistant) {
            vapiAssistant.initializeVapi();
        } else {
            alert('Voice assistant is loading. Please try again in a moment.');
        }
    }
}

// Global function for DISHA bubble
window.handleVoiceCall = handleVoiceCall;

// Don't retry - SDK is loaded from HTML