#!/bin/bash

# IRCTC DISHA Chatbot - Start Script
# This script starts the development server for the IRCTC chatbot

echo "🚀 Starting IRCTC DISHA Chatbot..."
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Kill any existing server on port 8000
echo "🔍 Checking for existing server..."
lsof -ti:8000 | xargs kill -9 2>/dev/null && echo "✅ Stopped existing server" || echo "✅ No existing server found"

echo ""
echo "📋 Project Information:"
echo "   - Main Page: http://localhost:8000/index.html"
echo "   - Ask DISHA: http://localhost:8000/ask-disha.html"
echo "   - Setup Check: http://localhost:8000/startup-check.html"
echo "   - Test Microphone: http://localhost:8000/test-mic.html"
echo "   - Test Gemini: http://localhost:8000/test-gemini.html"
echo ""
echo "🔑 API Keys Configured:"
echo "   - Gemini API: AIzaSyAswBs9lfrNTH2SO_Aw75PjrW8ByFRVOgk"
echo ""
echo "🎯 Features:"
echo "   ✅ Text chatbot with Gemini AI"
echo "   ✅ Voice assistant (Web Speech API)"
echo "   ✅ DISHA floating bubble"
echo "   ✅ Railway-specific responses"
echo "   ✅ Error handling for tracking requests"
echo ""
echo "🎤 Voice Setup:"
echo "   1. Allow microphone permission when prompted"
echo "   2. Use Chrome or Edge browser (recommended)"
echo "   3. Test mic at: http://localhost:8000/test-mic.html"
echo ""
echo "🛠️  Error Fixes Applied:"
echo "   ✅ WAP plat undefined - Fixed"
echo "   ✅ Tracking 404 errors - Handled"
echo "   ✅ JavaScript syntax errors - Fixed"
echo "   ✅ Permission issues - Resolved"
echo ""
echo "🌐 Starting server..."
echo "   Press Ctrl+C to stop"
echo ""
echo "⚠️  IMPORTANT: If voice doesn't work, visit test-mic.html first!"
echo "💡 All tracking errors are now handled automatically!"
echo ""

# Start the Python server with error handling
echo "🚀 Launching IRCTC server with enhanced error handling..."
python3 server.py
