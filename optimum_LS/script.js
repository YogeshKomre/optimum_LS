// Initialize Socket.IO
const socket = io('http://localhost:8080');

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const moodBtns = document.querySelectorAll('.mood-btn');

// State Management
let currentCategory = 'internet';
let customerMood = 'calm';

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Socket.IO Event Handlers
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('receive_message', (data) => {
    addMessage(data.response);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Message Handling Functions
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        socket.emit('send_message', { message, category: currentCategory });
        userInput.value = '';
    }
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user' : 'message ai';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Response data
const responses = {
    internet: {
        common: [
            "Let's check your internet connection step by step:\n\n1. Verify if all cables are properly connected to your modem/router\n2. Check if the power light on your modem is solid green\n3. Try restarting your device and modem\n4. If you're using WiFi, check if other devices can connect\n5. If the issue persists, please check for any service outages in your area"
        ],
        modem: [
            "If your modem is not working:\n\n1. Check the power supply:\n   - Ensure the power adapter is properly connected\n   - Try a different power outlet\n   - Verify the power light is solid green"
        ]
    },
    video: {
        common: [
            "Let's troubleshoot your video issues:\n\n1. Check your TV settings:\n   - Press the 'Source' or 'Input' button\n   - Select the correct HDMI port\n   - Adjust picture settings"
        ],
        cableBox: [
            "For cable box issues:\n\n1. Power cycle:\n   - Unplug cable box completely\n   - Wait 2 minutes\n   - Plug back in\n   - Wait for all lights to stabilize"
        ]
    },
    wifi: {
        common: [
            "Let's fix your WiFi issues:\n\n1. Check router lights:\n   - Ensure power light is solid\n   - Verify WiFi light is blinking\n   - Check for error indicators"
        ],
        router: [
            "For router issues:\n\n1. Basic checks:\n   - Verify all lights are functioning\n   - Check power supply\n   - Ensure proper cable connections"
        ]
    },
    billing: {
        common: [
            "Let me help you with your billing issue:\n\n1. Check your latest bill online\n2. Verify payment status\n3. Look for any discrepancies\n4. Contact customer service if needed"
        ],
        payment: [
            "For payment issues:\n\n1. Check your payment method\n2. Verify payment status\n3. Check for pending payments\n4. Update payment information"
        ]
    },
    serviceAdd: {
        common: [
            "Let me help you add a new service:\n\n1. Check available services\n2. Review pricing\n3. Verify eligibility\n4. Complete setup"
        ],
        installation: [
            "For service installation:\n\n1. Check installation requirements\n2. Schedule appointment\n3. Prepare installation area\n4. Complete setup"
        ]
    },
    serviceUpgrade: {
        common: [
            "Let me help you upgrade your service:\n\n1. Review current plan\n2. Check upgrade options\n3. Verify eligibility\n4. Complete upgrade"
        ],
        package: [
            "For package upgrades:\n\n1. Review current package\n2. Compare options\n3. Check pricing\n4. Complete upgrade"
        ]
    }
};

// Customer mood responses
const moodResponses = {
    calm: "I'm here to help! Let's tackle this issue together. I'll guide you through the solution step by step.",
    frustrated: "I understand this is frustrating. Let's break this down into simple steps. I'll help you resolve it quickly.",
    upset: "I'm sorry you're having trouble. I'll help you fix this issue as quickly and smoothly as possible.",
    irate: "I apologize for the inconvenience. I'll do my best to resolve this issue promptly and efficiently."
};

// Customer interaction responses
const customerInteraction = {
    general: {
        thanks: "You're welcome! Is there anything else I can assist you with?",
        confirmation: "I've noted that. Let's move forward with the next steps.",
        followup: "How's it going with the steps I provided?",
        nextStep: "Let's try the next step in the troubleshooting process.",
        verify: "Could you please verify if this resolved the issue?"
    },
    mood: {
        calm: {
            appreciate: "I appreciate your patience. Let's keep working through this together.",
            progress: "Great progress! Let's keep going.",
            understand: "I understand your concern. Let's find a solution that works for you.",
            positive: "Great! Let's keep moving forward with the solution."
        },
        frustrated: {
            acknowledge: "I understand this is frustrating. Let's try a different approach.",
            support: "I'm here to help you through this. Let's try another solution.",
            empathize: "I understand how frustrating this must be. Let's find a better way to resolve this.",
            reassurance: "I'll help you through this step by step. We'll find a solution together."
        },
        upset: {
            empathize: "I understand how upsetting this is. Let's find a solution quickly.",
            reassure: "I'll help you fix this as quickly as possible.",
            calmDown: "I understand you're upset. Let's work through this together.",
            prioritize: "I'll help you resolve this issue as quickly as possible."
        },
        irate: {
            deescalate: "I understand you're upset. Let's work through this together.",
            prioritize: "I'll help you resolve this issue as quickly as possible.",
            calm: "I understand your frustration. Let's find a solution together.",
            professional: "I'll do my best to help you resolve this issue quickly and efficiently."
        }
    }
};

// Agent responses
const agentResponses = {
    common: {
        verify: "Could you please verify if this resolved the issue?",
        nextStep: "Let's try the next step in the troubleshooting process.",
        followUp: "How's it going with the steps I provided?",
        confirmation: "I've noted that. Let's move forward with the next steps."
    },
    internet: {
        checkModem: "Could you please check if your modem's power light is solid green?",
        checkConnection: "Could you verify if other devices can connect to the internet?",
        checkSpeed: "Could you check your internet speed using a speed test?",
        checkOutage: "Could you check if there are any service outages in your area?"
    },
    video: {
        checkInput: "Could you check if your TV is set to the correct input channel?",
        checkCable: "Could you verify if your HDMI cable is securely connected?",
        checkResolution: "Could you check if your TV and cable box are set to the same resolution?",
        checkAudio: "Could you check if your audio settings are correct?"
    },
    cableBox: {
        checkPower: "Could you verify if your cable box is receiving power?",
        checkError: "Could you note down any error codes you're seeing?",
        checkConnection: "Could you verify if all cables are securely connected?",
        checkRemote: "Could you try resetting your remote control?"
    },
    wifi: {
        checkRouter: "Could you verify if your WiFi router is powered on?",
        checkSignal: "Could you check your WiFi signal strength?",
        checkInterference: "Could you check for any potential interference sources?",
        checkSettings: "Could you verify your WiFi network settings?"
    }
};

// Message Display
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
        <div class="message-timestamp">
            ${new Date().toLocaleTimeString()}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Category Selection
function handleCategoryChange(category) {
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    currentCategory = category;
    
    // Send category change to server
    socket.emit('category_change', { category });
    
    // Add initial message
    addMessage(`You selected ${category} issues. How can I assist you?`);
}

// Mood Selection
function handleMoodChange(mood) {
    moodBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
    customerMood = mood;
    
    // Send mood change to server
    socket.emit('mood_change', { mood });
    
    addMessage(`I understand you're ${mood}. Let's work through this together.`);
}

// Send Message
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        // Send message to server
        socket.emit('send_message', {
            message,
            category: currentCategory,
            mood: customerMood
        });
    }
}

// Generate Response
function generateResponse(issue) {
    let response = '';
    
    // Check for specific customer questions
    const customerQuestions = customerInteraction.customerQuestions;
    const commonQuestions = customerQuestions.common;
    const categoryQuestions = customerQuestions[currentCategory] || {};

    // Check if the issue contains common question keywords
    const commonKeywords = Object.keys(commonQuestions).map(keyword => keyword.toLowerCase());
    const categoryKeywords = Object.keys(categoryQuestions).map(keyword => keyword.toLowerCase());

    // Convert issue to lowercase for comparison
    const lowerIssue = issue.toLowerCase();

    // Check for common question keywords
    const commonMatch = commonKeywords.find(keyword => lowerIssue.includes(keyword));
    if (commonMatch) {
        response = commonQuestions[commonMatch];
    }

    // Check for category-specific question keywords
    const categoryMatch = categoryKeywords.find(keyword => lowerIssue.includes(keyword));
    if (categoryMatch) {
        response = categoryQuestions[categoryMatch];
    }

    // If no specific question matched, provide general troubleshooting
    if (!response) {
        const isCommonIssue = !issue.includes('modem') && !issue.includes('cable box') && !issue.includes('router');

        if (isCommonIssue) {
            const randomIndex = Math.floor(Math.random() * responses[currentCategory].common.length);
            response = responses[currentCategory].common[randomIndex];
        } else {
            const specificCategory = issue.includes('modem') ? 'modem' :
                                    issue.includes('cable box') ? 'cableBox' :
                                    issue.includes('router') ? 'router' : 'common';
            const randomIndex = Math.floor(Math.random() * responses[currentCategory][specificCategory].length);
            response = responses[currentCategory][specificCategory][randomIndex];
        }
    }

    // Add mood-specific response if available
    if (customerMood && moodResponses[customerMood]) {
        const moodResponse = moodResponses[customerMood];
        response = `${moodResponse}\n\n${response}`;
    }
    
    return response;
}

// Socket.IO Event Listeners
socket.on('receive_message', (data) => {
    addMessage(data.response);
});

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    // Add initial welcome message
    addMessage("Hello! I'm here to help with your technical issues. What seems to be the problem?");
});

// Category and Mood Button Event Listeners
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => handleCategoryChange(btn.dataset.category));
});

moodBtns.forEach(btn => {
    btn.addEventListener('click', () => handleMoodChange(btn.dataset.mood));
});