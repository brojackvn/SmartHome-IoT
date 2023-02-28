const socket = new WebSocket('ws://localhost:3000');

// =====================================================
// Reload Page repeatedly after 3s
// setInterval(() => {
//   document.location.reload();
// }, 3000);


// =====================================================
// Fetch the final status of LED from server
// const statusLed = fetch('http://localhost:3000/led')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     return data;
//   })
//   .catch(err => console.log(err));

// =====================================================
// Edit switch button in html
var divButton = document.querySelector('.mid');
console.log(divButton.innerHTML);

// =======================================================
// Query switch button and check whether button is clicked
const switchButtons = document.querySelectorAll('.switch-left, .switch-right');
var flag = false;

socket.addEventListener("open", function(event) {
  socket.send("==== Hello, server! We are connected! ====");
});

// Send data to the server when the socket is open
switchButtons.forEach(element => {
  // click button to send data to server
  element.addEventListener('click', () => {
    console.log("CLICK BUTTON and SEND DATA TO SERVER = WSS")
    if (flag == false) {
      let message = '{"led": 1, "status": 0}'
      socket.send(message)
      flag = true
    } else {
      let message = '{"led": 1, "status": 1}'
      socket.send(message)
      flag = false
    }
  });
});

// =====================================================
// Handle incoming messages from the server

socket.addEventListener("message", function(event) {
  console.log("Client: Message from server - ", event.data);
  console.log(JSON.parse(event.data)["status"]);
  if (JSON.parse(event.data)["status"] == '1') {
    divButton.innerHTML =  `<label class="rocker">
                              <input type="checkbox" id="buttonCheckbox" checked>
                              <span class="switch-left">On</span>
                              <span class="switch-right">Off</span>
                            </label>`
  } 
  if (JSON.parse(event.data)["status"] == '0') {
    divButton.innerHTML =  `<label class="rocker">
                              <input type="checkbox" id="buttonCheckbox">
                              <span class="switch-left">On</span>
                              <span class="switch-right">Off</span>
                            </label>`
  }

  if (JSON.parse(event.data)["temperature"]) {
    document.querySelector('.temperature').innerHTML = JSON.parse(event.data)["temperature"] + " <span>&#176;</span>F"
  }
  if (JSON.parse(event.data)["humidity"]) {
    document.querySelector('.humidity').innerHTML = JSON.parse(event.data)["humidity"] + " %"
  }
})

