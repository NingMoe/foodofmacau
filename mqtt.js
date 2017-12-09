const mqtt = require('mqtt')

module.exports = {
  client: mqtt.connect('mqtt://moqtt.duckdns.org', {username: 'usertest', password: 'testuser'})
};