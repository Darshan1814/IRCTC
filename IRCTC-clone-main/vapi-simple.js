// Vapi Configuration
const VAPI_CONFIG = {
    publicKey: 'a4e52b1b-a945-4d62-92ba-69a11ee1e534',
    assistantId: '332aec6c-c0ba-4858-850b-aea343165fbd'
};

let vapiInstance = null;
let isCallActive = false;

// Initialize Vapi
function initVapi() {
    try {
        // Check for Vapi in window object
        const VapiConstructor = window.Vapi || window.vapi || (window.vapiSdk && window.vapiSdk.Vapi);
        
        if (!VapiConstructor) {
            console.error('❌ Vapi constructor not found');
            return false;
        }
        
        vapiInstance = new VapiConstructor(VAPI_CONFIG.publicKey);
        
        vapiInstance.on('call-start', () => {
            console.log('📞 Call started with DISHA');
            isCallActive = true;
            updateUI(true);
        });
        
        vapiInstance.on('call-end', () => {
            console.log('📞 Call ended');
            isCallActive = false;
            updateUI(false);
        });
        
        vapiInstance.on('error', (error) => {
            console.error('❌ Vapi error:', error);
            isCallActive = false;
            updateUI(false);
        });
        
        console.log('✅ Vapi Voice Assistant initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Vapi initialization failed:', error);
        return false;
    }
}

// Handle voice call
function handleVoiceCall() {
    if (!vapiInstance) {
        if (!initVapi()) {
            alert('Voice assistant not available. Please use text chat.');
            return;
        }
    }
    
    if (isCallActive) {
        vapiInstance.stop();
    } else {
        vapiInstance.start(VAPI_CONFIG.assistantId);
    }
}

// Update UI
function updateUI(active) {
    const bubble = document.getElementById('dishaVoiceBubble');
    const indicator = document.getElementById('voiceIndicator');
    const voiceBtn = document.getElementById('voiceBtn');
    
    if (bubble) {
        bubble.classList.toggle('calling', active);
        bubble.title = active ? 'End Call' : 'Talk to DISHA';
    }
    
    if (indicator) {
        indicator.classList.toggle('active', active);
    }
    
    if (voiceBtn) {
        voiceBtn.classList.toggle('calling', active);
        voiceBtn.innerHTML = active ? '<i class="fa-solid fa-phone-slash"></i>' : '<i class="fa-solid fa-microphone"></i>';
    }
}

// Initialize on load
window.addEventListener('load', () => {
    console.log('🚀 Initializing DISHA Voice Assistant...');
    
    // Wait for DOM and scripts to load
    setTimeout(() => {
        console.log('🔍 Checking for Vapi SDK...');
        console.log('Available:', {
            Vapi: typeof window.Vapi,
            vapi: typeof window.vapi,
            vapiSdk: typeof window.vapiSdk
        });
        
        // Try immediate initialization
        if (initVapi()) {
            return;
        }
        
        // Wait for SDK to load
        console.log('⏳ Waiting for Vapi SDK to load...');
        let attempts = 0;
        const maxAttempts = 30;
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            if (window.Vapi || window.vapi || (window.vapiSdk && window.vapiSdk.Vapi)) {
                console.log(`✅ Vapi SDK loaded after ${attempts} attempts`);
                if (initVapi()) {
                    clearInterval(checkInterval);
                }
            } else if (attempts >= maxAttempts) {
                console.error('❌ Vapi SDK failed to load after 15 seconds');
                console.log('💬 Voice features disabled - Text chat still available');
                const bubble = document.getElementById('dishaVoiceBubble');
                if (bubble) {
                    bubble.style.opacity = '0.3';
                    bubble.title = 'Voice assistant unavailable - Use text chat';
                }
                clearInterval(checkInterval);
            }
        }, 500);
    }, 500);
});

// Make function global
window.handleVoiceCall = handleVoiceCall;
