// Chatbot JavaScript with Gemini API Integration
class IRCTCChatbot {
    constructor() {
        this.apiKey = 'AIzaSyAswBs9lfrNTH2SO_Aw75PjrW8ByFRVOgk';
        this.models = [
            'gemini-2.5-flash',
            'gemini-2.0-flash',
            'gemini-2.0-flash-exp',
            'gemini-2.5-pro'
        ];
        this.currentModelIndex = 0;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.isRecording = false;
        this.recognition = null;
        
        this.initializeEventListeners();
        this.initializeVoiceRecognition();
        this.systemPrompt = this.getSystemPrompt();
    }

    getSystemPrompt() {
        return `You are DISHA, an AI assistant specifically designed for the IRCTC (Indian Railway Catering and Tourism Corporation) website. You ONLY provide assistance related to:

1. Train booking and reservations
2. PNR status inquiries
3. Train schedules and routes
4. Railway fare information
5. IRCTC services (e-catering, hotels, tours)
6. Railway rules and regulations
7. Station information
8. Ticket cancellation and refund policies
9. Railway pass information
10. General railway travel guidance

IMPORTANT RESTRICTIONS:
- You ONLY respond to queries related to Indian Railways and IRCTC services
- If asked about anything unrelated to railways/IRCTC, politely redirect the conversation back to railway topics
- Do not provide information about other transportation modes unless comparing with railways
- Do not discuss topics outside of railway/travel domain
- Always maintain a helpful, professional tone
- Provide accurate, up-to-date information about IRCTC services
- If you don't know specific current information (like live PNR status), guide users to the appropriate IRCTC resources

Keep responses concise, helpful, and focused on railway-related assistance only.`;
    }

    initializeEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        // Voice button now handled by Vapi - see vapi-voice.js
        
        // Auto-resize input
        this.userInput.addEventListener('input', () => {
            this.sendBtn.disabled = this.userInput.value.trim() === '';
        });
    }

    initializeVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-IN';

            this.recognition.onstart = () => {
                this.isRecording = true;
                this.voiceBtn.classList.add('recording');
                this.voiceBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.userInput.value = transcript;
                this.sendBtn.disabled = false;
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                this.voiceBtn.classList.remove('recording');
                this.voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.showError('Voice recognition failed. Please try again.');
                this.isRecording = false;
                this.voiceBtn.classList.remove('recording');
                this.voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            };
        } else {
            this.voiceBtn.style.display = 'none';
        }
    }

    toggleVoiceRecording() {
        // Voice recording is now handled by Vapi
        // This method is kept for compatibility
        console.log('Voice input now handled by Vapi voice assistant');
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.userInput.value = '';
        this.sendBtn.disabled = true;

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await this.callGeminiAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.showError(`Sorry, I encountered an error: ${error.message}. Please try again.`);
            console.error('API Error:', error);
        }
    }

    async callGeminiAPI(message) {
        const requestBody = {
            contents: [{
                parts: [{
                    text: `${this.systemPrompt}\n\nUser: ${message}`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        // Try models in order until one works
        for (let i = 0; i < this.models.length; i++) {
            const modelIndex = (this.currentModelIndex + i) % this.models.length;
            const model = this.models[modelIndex];
            const apiUrl = `${this.baseUrl}/${model}:generateContent`;
            
            try {
                console.log(`🤖 Trying model: ${model}`);
                const response = await fetch(`${apiUrl}?key=${this.apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                        console.log(`✅ Success with model: ${model}`);
                        this.currentModelIndex = modelIndex; // Remember working model
                        return data.candidates[0].content.parts[0].text;
                    }
                }
                
                console.log(`❌ Model ${model} failed with status: ${response.status}`);
            } catch (error) {
                console.log(`❌ Model ${model} error:`, error.message);
            }
        }
        
        // If all models fail, throw error
        throw new Error('All Gemini models failed. Please try again later.');
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' 
            ? '<i class="fa-solid fa-robot"></i>' 
            : '<i class="fa-solid fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';
        
        // Convert markdown-like formatting to HTML
        const formattedMessage = this.formatMessage(message);
        content.innerHTML = formattedMessage;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    formatMessage(message) {
        // Basic markdown-like formatting
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/(\d+\.\s)/g, '<br>$1')
            .replace(/(-\s)/g, '<br>• ');
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="message-content">
                <span>DISHA is typing</span>
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    showError(errorMessage) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fa-solid fa-exclamation-triangle"></i>
            <span>${errorMessage}</span>
        `;
        
        this.chatMessages.appendChild(errorDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Quick message function
function sendQuickMessage(message) {
    const chatbot = window.irctcChatbot;
    if (chatbot) {
        chatbot.userInput.value = message;
        chatbot.sendBtn.disabled = false;
        chatbot.sendMessage();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.irctcChatbot = new IRCTCChatbot();
    
    // Update datetime
    function updateTime() {
        var dt = new Date();
        const datetimeElement = document.getElementById("datetime");
        if (datetimeElement) {
            datetimeElement.innerHTML = ((("0" + dt.getDate()).slice(-2)) + "-" + (("0" + (dt.getMonth() + 1)).slice(-2)) + "-" + (dt.getFullYear()) + " [" + (("0" + dt.getHours()).slice(-2)) + ":" + (("0" + dt.getMinutes()).slice(-2)) + ":" + (("0" + dt.getSeconds()).slice(-2)) +"]");
        }
    }
    updateTime();
    setInterval(updateTime, 1000);
});

// Font size functions
function increaseFontSize() {
    var rootElement = document.documentElement;
    var currentSize = parseFloat(window.getComputedStyle(rootElement, null).getPropertyValue('font-size'));
    rootElement.style.fontSize = (currentSize + 1) + "px";
}

function resetFontSize() {
    document.documentElement.style.fontSize = "16px";
}

function decreaseFontSize() {
    var rootElement = document.documentElement;
    var currentSize = parseFloat(window.getComputedStyle(rootElement, null).getPropertyValue('font-size'));
    rootElement.style.fontSize = (currentSize - 1) + "px";
}