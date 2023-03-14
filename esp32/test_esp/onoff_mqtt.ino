#include <WiFi.h>
#include <PubSubClient.h>
#include <string.h>
#include <ArduinoJson.h>


const char* ssid = "267 Kham Thien Tang 3";
const char* password = "khamthient3";

#define MQTT_SERVER "broker.hivemq.com"
#define MQTT_PORT 1883
#define MQTT_USER "brojackvn"
#define MQTT_PASSWORD "brojackvn"
#define MQTT_LDP_TOPIC_RECEIVE "iot_light_20231/server"
#define MQTT_LDP_TOPIC_SEND "iot_light_20231/esp32"
#define LED_PIN 19

WiFiClient wifiClient;
PubSubClient client(wifiClient);

void initialize_pinmode() {
  pinMode(LED_PIN, OUTPUT);
}

void setup_wifi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void connect_to_broker() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32-HoAnh-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), MQTT_USER, MQTT_PASSWORD)) {
      Serial.println("connected");
      client.subscribe(MQTT_LDP_TOPIC_RECEIVE);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 2 seconds");
      delay(2000);
    }
  }
}

void callback(char* topic, byte *payload, unsigned int length) {
  Serial.println("-------new message from broker-----");
  Serial.print("topic: ");
  Serial.println(topic);
  Serial.print("message: ");
  Serial.write(payload, length);
  Serial.println();
  // Convert payload to string
  String jsonStr;
  for (int i = 0; i < length; i++) {
    jsonStr += (char)payload[i];
  }
  // Parse JSON document
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, jsonStr);
  // Extract values of "led" and "status" fields
  int led = doc["led"];
  int status = doc["status"];
  Serial.println(led);
  Serial.println(status);
  // Do something
  if (led == 1) {
    if (status == 0) {
      digitalWrite(LED_PIN, LOW);
      Serial.println("LOW");
    } else {
      digitalWrite(LED_PIN, HIGH);
      Serial.println("HIGH");
    }
  }
  Serial.println("went here");
}

void setup() {
  initialize_pinmode();
  Serial.begin(115200);
  Serial.setTimeout(500);
  setup_wifi();
  client.setServer(MQTT_SERVER, MQTT_PORT);
  client.setCallback(callback);
  connect_to_broker();
}

void send_data() {
  client.publish(MQTT_LDP_TOPIC_SEND, "esp send data: chao mqttbox va nodejs server nhe"); 
  delay(1000);
}

void loop() {
  client.loop();
  if (!client.connected()) {
    connect_to_broker();
  }
  send_data();
}
