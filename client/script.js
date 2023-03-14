const socket = new WebSocket('ws://localhost:3000');

// =====================================================
// Edit switch button in html
var divButton = document.querySelector('.mid');

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

// ====================================================================
// fetch data from server: http://localhost:3000/sensor
var time = [];
var dataTemperature = [];
var dataHumidity = [];

fetch('http://localhost:3000/sensor')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    // Process the array of data items
    // const items = data.slice(0, 10); // Get the first 10 items
    console.log("====xxxxxxxx===========")
    console.log(data)
    console.log("====xxxxxxxxxx===========")

    data.forEach(element => {
      const date = new Date(element.time);
      time.push(`${date.getHours()}h:${date.getMinutes()}m`);
      dataTemperature.push(element.temperature);
      dataHumidity.push(element.humidity);
    });
  })
  .catch(error => console.error(error));

console.log(time);
console.log(dataTemperature);
console.log(dataHumidity);

// ===================== Temperature Chart ============================
var ctxTemp = document.getElementById('temperatureChart').getContext('2d');

const dataTempChart = {
  labels: time,
  datasets: [{
    label: 'Temperature',
    data: dataTemperature,
    fill: false,
    borderColor: 'rgb(255,108,0)',
    tension: 0.1
  }]
};

const tempChart = new Chart(ctxTemp, {
  type: 'line',
  data: dataTempChart,
  options: {
    indexAxis: 'x',
      scales: {
          x: {
            beginAtZero: false
          },
          y: {
              stacked: true
          }
      }
  }
});

// ====================================================================
// ===================== Humidity Chart ============================
var ctxHumidity = document.getElementById('humidityChart').getContext('2d');

const dataHumidityChart = {
  labels: time,
  datasets: [{
    label: 'Humidity',
    data: dataHumidity,
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const humidityChart = new Chart(ctxHumidity, {
  type: 'line',
  data: dataHumidityChart,
  options: {
      scales: {
          x: {
            beginAtZero: false
          },
          y: {
              stacked: true
          }
      }
  }
});

