const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const mqtt = require('mqtt')

let win
let client  = mqtt.connect('mqtt://moqtt.duckdns.org', {username: 'usertest', password: 'testuser'})

client.on('connect', function () {
  client.subscribe('info/#')
  client.subscribe('devices/panels/foodofmacau/pibuttons')
})

function createWindow () {
  // const area = electron.screen.getPrimaryDisplay().workAreaSize;
  
  // Create the browser window.
  win = new BrowserWindow({
    backgroundColor: '#000000',
    frame: false,
    fullscreen: true,
    x:0,
    y:0
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  client.on('message', (topic, msg) => {
    // let button = JSON.parse(msg.to)
    console.log(topic, msg)
    //load the page corresponding to the button pressed
    // win.loadURL(url.format({
    //   pathname: path.join(__dirname, 'pages/button_' + button.buttonID + '.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }))

    // OR?????
    // change the image in the current page.
    // document.getElementById('foodimg').src = 'images/food-001.png'
  })

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
