import http.server
import socket
import sys

def get_ip():
    try:
        # Create a temporary socket to get the local IP
        temp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        temp_socket.connect(('8.8.8.8', 80))
        ip = temp_socket.getsockname()[0]
        temp_socket.close()
        return ip
    except:
        return 'localhost'

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"\nRequest: {self.path}")
        http.server.SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    PORT = 3010
    print(f"\nStarting server on port {PORT}")
    print(f"Access URL: http://localhost:{PORT}")
    
    # Get local IP
    local_ip = get_ip()
    if local_ip != 'localhost':
        print(f"Local IP: http://{local_ip}:{PORT}")
    
    # Create server
    with http.server.HTTPServer(('0.0.0.0', PORT), MyHandler) as httpd:
        print("Server started. Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.server_close()
            print("Server stopped.")
