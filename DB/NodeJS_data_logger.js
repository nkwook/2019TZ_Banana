// ------------ MySQL ------------ //

const MySQL = require('mysql');

const con = MySQL.createConnection({
    host: "localhost",
    port: "3306", 
    user: "root",
    password: "",
    database: "banana_arduino_data_2", // name has to be same as the database to connect 
    charset: "utf8mb4_general_ci"
});

con.connect((err) => {
    if (err)
        console.error(err);
    console.log("Connected to database");
});


// ------------ Serial ------------ //

const SerialPort = require('serialport');

const baudRate = 115200;

let port = null;

SerialPort.list((err, ports) => {
    if (err)
        console.error(err);
    if (ports.length == 0)
        console.error("No Serial ports found");

    // Iterate over all the serial ports, and look for an Arduino
    let comName = null;
    ports.some((port) => {
        if (port.manufacturer
            && port.manufacturer.match(/Arduino/)) {
            comName = port.comName;
            console.log('Found Arduino');
            console.log('\t' + port.comName);
            console.log('\t\t' + port.pnpId);
            console.log('\t\t' + port.manufacturer);
            return true;
        }
        return false;
    });

    if (comName == null) {
        comName = ports[0].comName;
        console.warn('No Arduino found, selecting first COM port (' + comName + ')');
    }

    // Open the port
    port = new SerialPort(comName, { baudRate: baudRate },
        (err) => {
            if (err)
                console.error(err);
        });
    
    // Attach a callback function to handle incomming data
    port.on('data', receiveSerial);
    console.log("Connected to Arduino");
});

// A class for reading lines of text
class TextParser {
    constructor() {
        this.string = '';
        this.clear = false;
        this.error = false;
        this.errorCode = -1;
    }
    static isEndMarker(char) {
        return char == '\r' || char == '\n'; // New line characters (NL & CR)
    }

    parse(char) {
        if (this.clear) {
            this.string = '';
            this.clear = false;
        }
        if (TextParser.isEndMarker(char)) {
            if (this.string.length > 0) {
                this.clear = true;
                return true;
            }
            return false;
        } else {
            this.string += char;
        }
    }
    get message() {
        return this.string;
    }
}

const parser = new TextParser;


/**
 * Entry function of Serial Events;
 * 1) Checks for Serial input of Arduino
 * 2) Parses input String using the "parser" object of the TextParser class
 * 3) If a complete line has been received (newline char received), 
 *    then change control to splitString
 * @param {byteArray (?)} dataBuf the received Buffer, 
 */
function receiveSerial(dataBuf) {
    let str = dataBuf.toString();
    console.log(str.length);
    console.log(str);
    // Loop over all characters
    for (let i = 0; i < str.length; i++) {
        // Parse the character
        if (parser.parse(str[i])) {
            // If a complete line has been received,
            // insert it into the database
            splitString(parser.message);

        }
    }
}


function splitString(message){
  console.log("splitting string of" + message);
  // console.log("wtf: messpae.substr(0,5)");
  // console.log(message.length)

  // console.log("/wtf2: "+message.substr(5,5))
  sensorNum= message.substr(0,1);
  console.log(sensorNum);
  pH= parseFloat(message.substr(1,4));
  humidity = parseFloat(message.substr(6, 5));
  temperature = parseFloat(message.substr(12, 5));
  soilHum=parseFloat(message.substr(18,5));
  console.log(pH);
  console.log(temperature);
  console.log(humidity);
  console.log(soilHum);
  // insertIntoBanana([pH,temperature, humidity]);
  if(sensorNum=="#"){
    console.log("sensor1");
    console.log("inserting into Banana database: " + message);
    const sql = "INSERT INTO `userdata1` (`temperature`,`humidity`, `pH`, `soilHum`) VALUES (?, ?, ?, ?);";
        con.query(sql, [temperature, humidity, pH, soilHum], function (err, result) {
          if (err) {
            console.log("error in insertion");
          } else {
            console.log("insert success");
          }
        });
  }
  else if(sensorNum=="!"){
    console.log("sensor2");
    console.log("inserting into Banana database: " + message);
    const sql = "INSERT INTO `userdata2` (`temperature`,`humidity`, `pH`, `soilHum`) VALUES (?, ?, ?, ?);";
        con.query(sql, [temperature, humidity, pH, soilHum], function (err, result) {
          if (err) {
            console.log("error in insertion");
          } else {
            console.log("insert success");
          }
        });
}
  else if(sensorNum=="@"){
    console.log("sensor3");
    console.log("inserting into Banana database: " + message);
    const sql = "INSERT INTO `userdata3` (`temperature`,`humidity`, `pH`, `soilHum`) VALUES (?, ?, ?, ?);";
        con.query(sql, [temperature, humidity, pH, soilHum], function (err, result) {
          if (err) {
            console.log("error in insertion");
          } else {
            console.log("insert success");
          }
        });



  }   
}

  



// function insertIntoBanana(userInput){
//   console.log("inserting into Banana database: " + userInput);
//   const sql = "INSERT INTO `userdata` (`pH`, `temperature`, `humidity`) VALUES (?, ?, ?);";
//   con.query(sql, [userInput[0], userInput[1], userInput[2]], function (err, result) {
//       if (err) {
//         console.log("error in insertion");
//       } else {
//         console.log("insert success");
//       }
//   });
// }