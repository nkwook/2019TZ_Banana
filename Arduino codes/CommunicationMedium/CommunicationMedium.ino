#include "SPI.h"
#include <LoRa.h>
String det = "";
String hum = "";
String temp = "";
String num = "";
String info ="";
String ph = "";
String sum ="";
void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

  if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    // read packet
    det = (char)LoRa.read();
    Serial.println(det);
   // if (det == "#" || det == "@" || det == "!") {
      Serial.print("Received packet '");
      String str=det;
      while(LoRa.available()){
        str+=((char)LoRa.read());
      }
//        str+="강찬희킹카";
        Serial.print(str);
//      for(int k=0; k<=3; k=k+1){
//        ph = ph+(char)LoRa.read();
//      }
//      for(int i=0; i<=4; i=i+1){
//        hum = hum +(char)LoRa.read(); 
//      }
//      (char)LoRa.read();
//      for(int j=0; j<=4; j=j+1){
//        temp = temp +(char)LoRa.read(); 
//      }
//      (char)LoRa.read();
//      for(int m=0; m<=3; m=m+1){
//       sum = sum+(char)LoRa.read();
//      }
//      String info = det+ph+temp+hum+sum;
      // print RSSI of packet
      Serial.print("' with RSSI ");
      Serial.println(LoRa.packetRssi());
      delay(2000);
      LoRa.beginPacket();
      LoRa.print(str);
      LoRa.endPacket();
      info = "";
      hum = "";
      temp = "";
      ph="";
      det="";
      sum = "";
    }
  }
