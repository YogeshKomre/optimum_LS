from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app)

# Store chat history
chat_history = []

def get_response(category, message, mood):
    # Load responses from JSON file
    with open('responses.json', 'r') as f:
        responses = json.load(f)
    
    # Get category-specific responses
    if category in responses:
        category_responses = responses[category]
        
        # Check for specific issue patterns
        for issue, response in category_responses.items():
            if issue.lower() in message.lower():
                return response
    
    # Return default response if no specific match found
    return responses.get('default', 'I apologize, but I need more information to assist you.')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/response', methods=['POST'])
def get_ai_response():
    data = request.json
    category = data.get('category', 'general')
    message = data.get('message', '')
    mood = data.get('mood', 'calm')
    
    response = get_response(category, message, mood)
    return jsonify({'response': response})

@socketio.on('send_message')
def handle_message(data):
    message = data['message']
    category = data['category']
    mood = data['mood']
    
    response = get_response(category, message, mood)
    
    # Add to chat history
    chat_history.append({
        'user': message,
        'ai': response,
        'category': category,
        'mood': mood,
        'timestamp': datetime.now().isoformat()
    })
    
    emit('receive_message', {'response': response}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, port=5000, debug=True)
