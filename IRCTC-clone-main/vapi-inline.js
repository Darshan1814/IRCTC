// DISHA Voice Assistant - Web Speech API Implementation
let isCallActive = false;
let recognition = null;
let audioStream = null;
let micPermissionGranted = false;

// Handle voice call
async function handleVoiceCall() {
    if (isCallActive) {
        stopVoiceCall();
        return;
    }
    
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showError('Voice not supported. Use Chrome/Edge browser.');
        return;
    }
    
    if (!navigator.mediaDevices?.getUserMedia) {
        showError('Microphone not supported in this browser.');
        return;
    }
    
    try {
        console.log('🎤 Starting microphone...');
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('✅ Microphone ready');
    } catch (error) {
        console.error('❌ Mic error:', error.name);
        handleMicError(error);
        return;
    }
    
    micPermissionGranted = true;
    isCallActive = true;
    updateUI(true);
    
    // Greet and start listening
    speakText('Hello! I am DISHA. How may I help you with railway booking?', () => {
        startListening();
    });
}

// Handle microphone errors
function handleMicError(error) {
    if (error.name === 'NotAllowedError') {
        showError('Please allow microphone permission:\n\n1. Click 🔒 in address bar\n2. Allow Microphone\n3. Try again');
    } else if (error.name === 'NotFoundError') {
        showError('No microphone found!\n\nConnect a microphone and refresh the page.\n\nOr use text chat below.');
    } else if (error.name === 'NotReadableError') {
        showError('Microphone busy!\n\nClose other apps using it and try again.');
    } else {
        showError('Voice unavailable. Use text chat instead.');
    }
}

// Show error message
function showError(msg) {
    alert(msg);
    stopVoiceCall();
}

// Start speech recognition
function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';
    
    recognition.onstart = () => {
        console.log('🎤 Listening...');
    };
    
    recognition.onresult = async (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('💬 You:', transcript);
        
        if (window.irctcChatbot) {
            try {
                const response = await window.irctcChatbot.callGeminiAPI(transcript);
                console.log('🤖 DISHA:', response);
                speakText(response);
            } catch (err) {
                console.error('❌ Error:', err);
                speakText('Sorry, I encountered an error. Please try again.');
            }
        }
    };
    
    recognition.onerror = (event) => {
        if (event.error !== 'no-speech') {
            console.error('❌ Recognition error:', event.error);
        }
    };
    
    recognition.onend = () => {
        if (isCallActive) {
            recognition.start();
        }
    };
    
    recognition.start();
}

// Stop voice call
function stopVoiceCall() {
    isCallActive = false;
    updateUI(false);
    
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
    }
    
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    console.log('📞 Call ended');
}

// Update UI
function updateUI(active) {
    const bubble = document.getElementById('dishaVoiceBubble');
    const indicator = document.getElementById('voiceIndicator');
    const voiceBtn = document.getElementById('voiceBtn');
    
    if (bubble) {
        bubble.classList.toggle('calling', active);
        bubble.title = active ? 'End Call' : 'Voice Call with DISHA';
    }
    
    if (indicator) {
        indicator.classList.toggle('active', active);
    }
    
    if (voiceBtn) {
        voiceBtn.classList.toggle('calling', active);
        voiceBtn.innerHTML = active ? '<i class="fa-solid fa-phone-slash"></i>' : '<i class="fa-solid fa-microphone"></i>';
    }
}

// Speak text with callback
function speakText(text, callback) {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => 
        v.name.includes('Female') || 
        v.name.includes('Samantha') ||
        (v.name.includes('Google') && v.lang.includes('en'))
    );
    
    if (voice) utterance.voice = voice;
    
    utterance.onend = () => {
        console.log('✅ Speech done');
        if (callback) callback();
    };
    
    utterance.onerror = (err) => {
        console.error('❌ Speech error:', err);
        if (callback) callback();
    };
    
    window.speechSynthesis.speak(utterance);
}

// Open DISHA (for bubble click)
function openDISHA() {
    handleVoiceCall();
}

// Initialize
window.addEventListener('load', () => {
    console.log('🚀 DISHA Voice Ready');
    console.log('💡 Click mic button or DISHA bubble to start');
    
    if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            console.log(`🎤 ${window.speechSynthesis.getVoices().length} voices loaded`);
        };
    }
});

window.handleVoiceCall = handleVoiceCall;
window.openDISHA = openDISHA;
