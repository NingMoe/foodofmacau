const five = require('johnny-five')
const raspi = require('raspi-io')
const mqtt = require('./mqtt')

const board = new five.Board({ 
    io: new raspi(), 
});

mqtt.client.on('connect', function () {
  mqtt.client.subscribe('info/#')
  mqtt.client.publish('devices/panels/foodofmacau/pibuttons/state', 'online')
})

/**
 * WiringPi Pins number
 * 0: GPIO17 / Pin 11
 * 1: GPIO18 / Pin 12
 * 2: GPIO27 / Pin 13
 * 3: GPIO22 / Pin 15
 * 4: GPIO23 / Pin 16
 * 5: GPIO24 / Pin 18
 * 6: GPIO25 / Pin 22
 * 7: GPIO4 / Pin 7
 * 8: GPIO2 / Pin 3 NO (I2C)
 * 9: GPIO3 / Pin 5 NO (I2C)
 * 10: GPIO8 / Pin 24
 * 11: GPIO7 / Pin 26
 * 12: GPIO10 / Pin 19
 * 13: GPIO9 / Pin 21
 * 14: GPIO11 / Pin 23
 * 21: GPIO5 / Pin 29
 * 22: GPIO6 / Pin 31
 * 23: GPIO13 / Pin 33
 * 24: GPIO19 / Pin 35
 * 25: GPIO26 / Pin 37
 * 26: GPIO12 / Pin 32
 * 27: GPIO16 / Pin 36
 * 28: GPIO20 / Pin 38
 * 29: GPIO21 / Pin 40
 * 30: GPIO0 / Pin 27 NO (I2C)
 * 31: GPIO1 / Pin 28 NO (I2C)
 */
const pins = ['P1-11','P1-12','P1-29',3,4,5,6,7,10,11,12,13,14] 
 
// Run Board 
board.on('ready', function() { 
  
  pins.forEach((buttonID) => {
    five.Button({ pin: buttonID, isPullup: true})
      .on('up', () => {
        // send only the Pin number
        let str = JSON.stringify({ 'id': buttonID.split('-')[1].padStart(3,'0')})
        mqtt.client.publish('devices/panels/foodofmacau/pibuttons', str)
      })
  })
  
  this.on('exit', () => { 
  });
})

mqtt.client.on('mesage', (topic, msg) => {
  console.log(topic, ' : ', msg.toString())
})
