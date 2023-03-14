# **Smarthome-IoT**

![Overall architecture](/img/smarthome.png)

## **About the project**
Our smarthome system employs IoT devices, with the ESP32 serving as the control hub. Communication between the ESP32 and the server is facilitated by the MQTT protocol, while NodeJS is used to develop the server and MongoDB is employed to store data. A web client is built to oversee device control and data analysis, with REST API used for server-to-web-client communication, complemented by WebSockets for real-time communication.

In addition, we try to use great platform Sinric Pro - a cloud service that enables voice control of devices. Specifically, we use Sinric Pro to control up to 3 devices and , employing either Alexa or Google Assistant for device control.

## **Build with**
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [MQTT](https://mqtt.org/)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [REST API](https://restfulapi.net/)
- [Sinric Pro](https://sinric.pro/)
- [Arduino IDE](https://www.arduino.cc/en/software)
- [ESP32](https://www.espressif.com/en/products/socs/esp32)

## **Getting started**

### **Prerequisites**
- *npm*
  ```sh
  npm install npm@latest -g
  ```

- *ESP32* Install in Arduino IDE
    * Board (esp32) 
    * Library (Sinric Pro, WebSockets, AdruinoMqttClient, AdruinoJson, adruino-mqtt-master) 

### **Installation**

1. Clone the repo: https://github.com/brojackvn/SmartHome-IoT.git

2. Install npm packages
    ```
    > cd server
    > npm install
    ```
3. To use Sinric Pro, you need to create an account, connect to Sinric Pro and add add a device.
    * Replace APP_KEY and APP_SECRET in the code with the APP_KEY and APP_SECRET you created.
    * Create a device in Sinric Pro dashboard and replace the device id in the code with the device id you created.

## **Usage**

1. Run server
    ```
    > cd server
    > npm start
    ```
2. Run client
    ```
    > cd client
    ```
3. Run ESP32
    ```
    > cd ESP32
    > open file smarthome-esp.ino in Arduino IDE
    > upload code to ESP32
    ```
4. Open browser and go to http://localhost:3000

5. Open Sinric Pro app or use Alexa or Google Assistant to control device

## **Example circuit Sinric Pro**

![Circuit](/img/circuit.jpg)