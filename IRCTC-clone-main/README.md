# IRCTC Ask DISHA - AI Chatbot with Voice Assistant

Complete AI-powered chatbot for IRCTC website with text and voice capabilities.

## 🚀 Quick Start

```bash
./start.sh
```

Then open: http://localhost:8000

## 📋 Features

- ✅ **Text Chatbot**: Powered by Google Gemini AI
- ✅ **Voice Assistant**: Real voice calls with Vapi AI
- ✅ **DISHA Avatar**: Floating female assistant bubble
- ✅ **Railway-Focused**: Only responds to IRCTC/railway queries
- ✅ **Responsive Design**: Works on all devices

## 🔑 API Keys (Pre-configured)

- **Gemini API**: `AIzaSyAswBs9lfrNTH2SO_Aw75PjrW8ByFRVOgk`
- **Vapi Public Key**: `a4e52b1b-a945-4d62-92ba-69a11ee1e534`
- **Vapi Assistant ID**: `332aec6c-c0ba-4858-850b-aea343165fbd`

## 📁 Project Structure

```
IRCTC-clone-main/
├── index.html              # Main IRCTC homepage
├── ask-disha.html          # Chatbot page
├── chatbot.css             # Chatbot styles
├── chatbot.js              # Gemini AI integration
├── vapi-simple.js          # Vapi voice integration
├── style.css               # Main styles
├── javas.js                # Main JavaScript
├── server.py               # Development server
├── start.sh                # Start script
└── README.md               # This file
```

## 🎯 Usage

### Start Server
```bash
./start.sh
```

### Access Pages
- **Main Site**: http://localhost:8000/index.html
- **Ask DISHA**: http://localhost:8000/ask-disha.html
- **Test Voice**: http://localhost:8000/test-voice.html
- **Test Gemini**: http://localhost:8000/test-gemini.html

### Use Chatbot
1. Type your railway-related question
2. Press Enter or click Send
3. Get instant AI responses

### Use Voice Assistant
1. Click the DISHA bubble (bottom-right)
2. Allow microphone permissions
3. Speak your question
4. DISHA responds with voice

## 🛠️ Manual Setup

If `start.sh` doesn't work:

```bash
# Kill existing server
lsof -ti:8000 | xargs kill -9

# Start server
python3 server.py
```

## 🧪 Testing

### Test Microphone (NEW!)
```
http://localhost:8000/test-mic.html
```
Use this to diagnose microphone issues!

### Test Gemini API
```
http://localhost:8000/test-gemini.html
```

### Test Voice Assistant
```
http://localhost:8000/test-voice.html
```

## 🔧 Troubleshooting

### Voice Not Working
**FIRST: Test your microphone at http://localhost:8000/test-mic.html**

Common fixes:
1. **No microphone found**: Connect a microphone, check System Preferences → Sound → Input
2. **Permission denied**: Click 🔒 in address bar → Allow Microphone → Refresh
3. **Microphone busy**: Close Zoom/Teams/Skype and try again
4. **Not supported**: Use Chrome or Edge browser

See VOICE-SETUP.md for detailed guide

### Gemini API Errors
- Check internet connection
- Verify API key is valid
- Check browser console
- Try test page: `/test-gemini.html`

### Server Port Busy
```bash
lsof -ti:8000 | xargs kill -9
./start.sh
```

## 📝 Requirements

- Python 3.6+
- Modern web browser (Chrome recommended)
- Internet connection
- Microphone (for voice features)

## 🎨 Customization

### Change Gemini Model
Edit `chatbot.js`:
```javascript
this.models = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest'
];
```

### Modify Voice Assistant
Edit `vapi-simple.js`:
```javascript
const VAPI_CONFIG = {
    publicKey: 'your-key',
    assistantId: 'your-assistant-id'
};
```

## 📞 Support

For issues:
1. Check browser console (F12)
2. Review server logs
3. Test with provided test pages
4. Verify API keys are valid

## 🎉 Success Indicators

✅ Server starts without errors
✅ Console shows "✅ Vapi initialized"
✅ Console shows "✅ Success with model: gemini-..."
✅ DISHA bubble is visible and clickable
✅ Text chat responds to queries
✅ Voice call connects when bubble clicked

## 📄 License

MIT License - Free to use and modify

---

**Made with ❤️ for IRCTC**
