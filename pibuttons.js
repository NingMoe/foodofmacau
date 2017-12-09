const five = require('johnny-five')
const raspi = require('raspi-io')
const mqtt = require('mqtt')

const board = new five.Board({ 
    io: new raspi(), 
});

const client  = mqtt.connect('mqtt://moqtt.duckdns.org', {username: 'usertest', password: 'testuser'})

client.on('connect', function () {
  client.subscribe('info/#')
  client.publish('devices/panels/foodofmacau/pibuttons', 'online')
})

const pins = [1,2,3,4,5,6,7,10,11,12,13,14,15,16]
 
// Run Board 
board.on('ready', function() { 
  
  pins.forEach((buttonID) => {
    five.Button({ pin: buttonID, isPullup: true})
      .on('up', () => {
        let str = JSON.stringify({ 'buttonID': buttonID})
        client.publish('devices/panels/foodofmacau/pibuttons', str)
      })
  })
  
  this.on('exit', () => { 
  });
}); 
