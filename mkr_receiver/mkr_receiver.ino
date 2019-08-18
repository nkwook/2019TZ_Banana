#include <SPI.h>
#include "LoRa.h"

void setup() {
  Serial.begin(9600);
//  while (!Serial);

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
  String det="";
  det+=(char)LoRa.read();
//  det+=(char)LoRa.read();
    // read packet
  if(det.equals("#")){
    Serial.print("#");
    while (LoRa.available()) {
      Serial.print((char)LoRa.read());
    }
  }
  else if(det.equals("!")){
    Serial.print("!");
    while(LoRa.available()){
      Serial.print((char)LoRa.read());
    }
  }
   else if(det.equals("@")){
    Serial.print("@");
    while(LoRa.available()){
      Serial.print((char)LoRa.read());
    }
  }
//  else{
////    Serial.println("etc");
//    while(LoRa.available()){
//      Serial.print((char)LoRa.read());
//    }
//  }

    // print RSSI of packet
//    Serial.print("' with RSSI ");
//    Serial.println(LoRa.packetRssi());
    }
  }
