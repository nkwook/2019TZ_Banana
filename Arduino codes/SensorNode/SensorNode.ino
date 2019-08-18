#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>

//Libraries
//#include "dht.h"
DHT dht(A4, DHT21);
#include <SPI.h>
#include "LoRa.h"
int counter = 0;
int air = 591; //newly measure for each turn
int water = 275;

//Constants
#define DHT21_PIN A4     // DHT 22  (AM2302) - what pin we're connected to

//Variables

#define SensorPin A0            
#define SensorPin_2 A2
void setup(void)
{
 Serial.begin(9600);
// while (!Serial);
 dht.begin();
 Serial.println("LoRa Sender");
 Serial.println(LoRa.begin(868E6));
 if (!LoRa.begin(868E6)){
  Serial.println("Starting LoRa failed!");
  while (1);
 }
}
void loop(void)
{
//  Serial.println("Serial moniter test");  // ??? ?? ???

 static float pHValue,voltage, hum, temp;

// int chk = DHT.read21(DHT21_PIN); //Read data and store it to variables hum and temp
 hum = dht.readHumidity();
 temp= dht.readTemperature();
 pHValue =analogRead(SensorPin)*5.0*3.5/1024 + 0.54 -3.9 ;
 int cdsVal = analogRead(SensorPin_2);
 int diff = air - water;
 float soil_hum = - 100.0/diff * cdsVal + air * 100.0 / diff;

 Serial.print("Sending packet: ");
 Serial.print("@");
 Serial.print(pHValue,2);
 Serial.print(",");
 Serial.print(hum);
 Serial.print(",");
 Serial.print(temp);
 Serial.print(",");
 Serial.println(soil_hum);

 LoRa.beginPacket();
 LoRa.print("@");
 LoRa.print(pHValue,2);
 LoRa.print(",");
 LoRa.print(hum);
 LoRa.print(",");
 LoRa.print(temp);
 LoRa.print(",");
 LoRa.println(soil_hum);
 LoRa.endPacket();
  
 delay(10000);
}
