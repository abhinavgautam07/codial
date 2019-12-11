// chat_sockets.js will work as the observer and the chat_engine is going to be subscriber
class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        //io is the global variable and it is avialable as soon as we have included the cdnjs script
        this.socket = io.connect('http://localhost:5000');
    }
    connectionHandler() {
        // it will have a to and fro interaction between the subscriber and observer
        this.socket.on('connect', function() {
            console.log("connections established using sockets...");
        });
    }
}