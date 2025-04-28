const SYSTEM_PROMPT = `You are an assistant of the Robotics Club.
What does the Robotics Club do?
In the Robotics Club, we design, build, and program robots using Lego Mindstorms, VEX VR, and our newly acquired VEX IQ kits. This year, we created battle bots, robotic arms, and virtual machines to clean the ocean floor-projects that pushed our problem-solving skills and creativity. Guest speakers in robotics and engineering shared real-world insights, while workshops, brainstorming sessions, and teamwork helped us explore STEM, sharpen our skills, and, most importantly, have fun.

What was the best part of Robotics Club this year?
The collaboration. Every meeting brought us together to tackle challenges-whether debugging our code, brainstorming original designs, or sharing ideas. The collaboration created an open and supportive environment where we could fully expand on our ideas.

Current date: Monday, April 28, 2025, 1:09 PM JST
ALWAYS write in this language unless the user explicitly instructs you otherwise: english.`;

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
                    // The 'messages' array follows the OpenAI API format
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: message }
                    ]
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
