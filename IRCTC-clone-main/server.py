#!/usr/bin/env python3
"""
Simple HTTP server for testing the IRCTC chatbot locally
Run with: python3 server.py
"""

import http.server
import socketserver
import os
import webbrowser
import re
from urllib.parse import urlparse

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        # Handle tracking and analytics requests that cause 404 errors
        noise_paths = [
            '.well-known', 'hybridaction', 'zybTracker', 'titlepage', 
            'copilot', 'favicon', 'zybTrackerStatistics', 'analytics',
            'tracking', 'metrics', 'telemetry'
        ]
        
        # Return empty JSON for tracking requests to prevent errors
        if any(x in self.path for x in noise_paths):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            # Return empty success response for tracking calls
            if 'callback' in self.path or '__callback__' in self.path:
                # Handle JSONP callbacks
                import re
                callback_match = re.search(r'__callback__=([^&]+)', self.path)
                if callback_match:
                    callback_name = callback_match.group(1)
                    self.wfile.write(f'{callback_name}({{}});'.encode())
                else:
                    self.wfile.write(b'{}');
            else:
                self.wfile.write(b'{"status":"ok"}')
            return
        
        super().do_GET()
    
    def log_message(self, format, *args):
        # Filter out extension 404s and other noise from logs
        if args:
            path = str(args[0]) if args else ''
            # Suppress logs for common noise
            noise_keywords = [
                '.well-known', 'hybridaction', 'zybTracker', 'favicon', 
                'titlepage', 'copilot', 'analytics', 'tracking', 'metrics'
            ]
            if any(x in path for x in noise_keywords):
                return
        super().log_message(format, *args)

def run_server(port=8000):
    """Run the development server"""
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Try different ports if 8000 is busy
    for attempt_port in range(port, port + 10):
        try:
            httpd = socketserver.TCPServer(("", attempt_port), CORSRequestHandler)
            port = attempt_port
            break
        except OSError:
            continue
    else:
        print("❌ Could not find available port")
        return
    
    with httpd:
        print(f"🚀 IRCTC Development Server running at http://localhost:{port}")
        print(f"📱 Open http://localhost:{port} to view the website")
        print(f"🤖 Open http://localhost:{port}/ask-disha.html to test the chatbot")
        print(f"🔧 Tracking requests are handled automatically")
        print("Press Ctrl+C to stop the server")
        
        # Automatically open browser
        webbrowser.open(f'http://localhost:{port}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    run_server()