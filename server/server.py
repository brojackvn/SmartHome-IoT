from flask import Flask
import paho.mqtt.client as mqtt

import pika






app = Flask(__name__)


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("$SYS/#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("broker.emqx.io", 1883)


@app.route("/", methods = ['POST'])
def Publish():
    data = {
        "led":1,"status":1
        }
    # publish
    client.publish("iot_light_20231/esp32", str(data))
    # subscribe
    print("Successful")
    return "<p>Hello, World!</p>"

@app.route("/", methods = ['GET'])
def Subcribe():
    print(client.subscribe("iot_light_20231/esp32"))
    # return 


# client.loop_forever()





