const express = require('express');
const app = express()
const port = 3000
const server = require('http').createServer(app);

var cors = require('cors')

const morgan = require('morgan');
const route = require('./routes/index');

const database = require('./config/db');

const WebSocket = require('ws')
const wss = new WebSocket.Server({ server: server })

const mqtt = require('mqtt')

// DB
const SensorModel = require('./app/models/SensorModel');

// Connect to database
const client = database.connect();

// Middleware:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5501');
    next();
  });

app.use(
    express.urlencoded({
        extended: true,
    }),
); // handle data from form to server
app.use(express.json()); // handle data (JS) from client to server: submit HTML or use JS lib: XMLHttpRequest, Fetch, axios, supervision,...

app.use(cors())

// HTTP logger
app.use(morgan('combined'));

// routes init
route(app);

// MQTT + WEB SOCKET
try {
    const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
    client.subscribe('iot_light_20231/sensor');

    wss.on('connection', function connection(ws) {
        client.on('message', (topic, message) => {
            console.log(`Received message on topic "${topic}": ${message.toString()}`);
            
            // send to client by socket
            ws.send(message.toString());

            // save to database - collection: sensor
            const sensor = new SensorModel();
            try {
                sensor.temperature = JSON.parse(message.toString()).temperature;
                sensor.humidity = JSON.parse(message.toString()).humidity;

                sensor.save()
                    .then(() => {
                        console.log('Save data to database successfully!');
                    })
                    .catch(error => {
                        console.log('Save data to database failed!');
                    })
            } catch (error) {
                console.log('Parse data failed!');
            }
            
            const oldestDocument = SensorModel.find().sort({time: 1}).limit(10);
            
            if (oldestDocument) {
                sensor.remove({_id: oldestDocument._id});
            }
        });
    });
    
    wss.on('connection', ws => {
		ws.on('message', message => {
			console.log(`Received message from client (client click button): ${message}`)
			client.publish('iot_light_20231/server', message);
		})
	})
} catch(error) {
    console.error('Failed to connect to MQTT broker:', error);
};

server.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});