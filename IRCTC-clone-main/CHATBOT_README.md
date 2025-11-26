# IRCTC Ask DISHA Chatbot

An AI-powered chatbot for the IRCTC website using Google's Gemini API with voice recognition capabilities.

## Features

- 🤖 **AI-Powered Responses**: Uses Google Gemini API for intelligent responses
- 🎤 **Voice Assistant**: Real voice calls with DISHA using Vapi AI
- 🚂 **Railway-Focused**: Only responds to IRCTC and railway-related queries
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Quick Actions**: Pre-defined buttons for common queries
- 🔒 **Secure**: API keys are configured for this website only

## Setup Instructions

### 1. API Configuration
The chatbot is already configured with the Gemini API key: `AIzaSyAswBs9lfrNTH2SO_Aw75PjrW8ByFRVOgk`

### 2. Local Testing
To test the chatbot locally:

```bash
# Navigate to the project directory
cd IRCTC-clone-main

# Run the development server
python3 server.py
```

The server will automatically open your browser to `http://localhost:8000`

### 3. Access the Chatbot
- Click "ASK DISHA" in the header navigation
- Or click "🤖 Ask DISHA 2.0" button in the booking form
- Or directly visit: `http://localhost:8000/ask-disha.html`

## File Structure

```
IRCTC-clone-main/
├── index.html          # Main IRCTC homepage
├── ask-disha.html      # Chatbot page
├── chatbot.css         # Chatbot styles
├── chatbot.js          # Chatbot functionality with Gemini API
├── server.py           # Development server
├── style.css           # Main website styles
├── javas.js            # Main website JavaScript
└── images/             # Website images
```

## Chatbot Capabilities

The DISHA chatbot can help with:

- ✅ Train booking information
- ✅ PNR status queries
- ✅ Train schedules and routes
- ✅ Railway fare information
- ✅ IRCTC services (e-catering, hotels, tours)
- ✅ Railway rules and regulations
- ✅ Station information
- ✅ Ticket cancellation and refund policies
- ✅ Railway pass information
- ✅ General railway travel guidance

## Voice Features

- 🎤 **Voice Calls**: Click the microphone button to start a voice call with DISHA
- 📞 **Real-time Conversation**: Full duplex voice conversation with AI assistant
- 🔴 **Call Indicator**: Button turns red during active calls
- 🗣️ **Natural Speech**: Powered by Vapi AI with natural voice synthesis
- 🌍 **Multi-language**: Supports English with Indian accent

## Security Features

- 🔒 **Domain Restriction**: Chatbot only works for IRCTC-related queries
- 🛡️ **Content Filtering**: Built-in safety settings prevent harmful content
- 🚫 **Topic Restriction**: Automatically redirects non-railway queries

## Browser Compatibility

- ✅ Chrome (recommended for voice features)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- 📱 Mobile browsers

## Troubleshooting

### Voice Recognition Not Working
- Ensure you're using HTTPS or localhost
- Grant microphone permissions when prompted
- Use Chrome for best voice recognition support

### API Errors
- Check internet connection
- Verify the API key is correctly configured
- Check browser console for detailed error messages

### CORS Issues
- Use the provided `server.py` for local testing
- Don't open HTML files directly in browser

## Development Notes

### Customizing the Chatbot
To modify the chatbot behavior, edit the `systemPrompt` in `chatbot.js`:

```javascript
getSystemPrompt() {
    return `You are DISHA, an AI assistant specifically designed for...`;
}
```

### Adding New Quick Actions
Add new quick action buttons in `ask-disha.html`:

```html
<button class="quick-btn" onclick="sendQuickMessage('Your query here')">
    <i class="fa-solid fa-icon"></i> Button Text
</button>
```

### Styling Modifications
Customize the appearance by editing `chatbot.css`.

## Production Deployment

For production deployment:

1. Upload all files to your web server
2. Ensure HTTPS is enabled for voice features
3. Configure proper CORS headers if needed
4. Test all functionality thoroughly

## Support

For issues or questions about the chatbot implementation, check:
- Browser console for error messages
- Network tab for API call failures
- Microphone permissions for voice issues

---

**Note**: This chatbot is designed specifically for IRCTC railway-related queries and will politely redirect users back to railway topics if asked about unrelated subjects.