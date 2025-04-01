const API_URL = 'https://ponpon77.ddns.net/api/chat';

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chat');
    const message = userInput.value.trim();

    if (message) {
        appendMessage('You', message);
        userInput.value = '';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            appendMessage('Bot', data.response);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Error', 'Failed to get response: ' + error.message);
        }
    }
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById('chat');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';

    const senderElement = document.createElement('strong');
    senderElement.textContent = sender + ':';
    messageElement.appendChild(senderElement);

    const textElement = document.createElement('span');
    textElement.innerHTML = formatMarkdown(text);
    messageElement.appendChild(textElement);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function formatMarkdown(text) {
    // Convert markdown headers to HTML
    text = text.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Convert bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert italic text
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert newlines to <br> tags
    text = text.replace(/\n/g, '<br>');

    return text;
}

document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});