const socket = new WebSocket('ws://localhost:8080');

// Query switch button and check whether button is clicked
const switchButtons = document.querySelectorAll('.switch-left, .switch-right');
var flag = true;

socket.addEventListener("open", function(event) {
  socket.send("Hello, server!");
});

// Send data to the server when the socket is open
switchButtons.forEach(element => {
  // click button to send data to server
  element.addEventListener('click', () => {
    socket.send("webclient send data to web server nodejs")
  });
});
  
// Handle incoming messages from the server
socket.addEventListener("message", function(event) {
	console.log("Received message from server: " + event.data);
  // edit switch button in html
});
