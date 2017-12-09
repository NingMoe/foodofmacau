const electron = require('electron')
const {app, BrowserWindow} = electron

const path = require('path')
const url = require('url')
const mqtt = require('./mqtt')

let win

mqtt.client.on('connect', function () {
  mqtt.client.subscribe('info/#')
  mqtt.client.subscribe('devices/panels/foodofmacau/pibuttons')
})

function createWindow () {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  // Create the browser window.
  win = new BrowserWindow({
    backgroundColor: '#000000',
    frame: false,
    fullscreen: true,
    x:0,
    y:0,
    width: width,
    height: height
  })
  
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mqtt.client.on('message', (topic, msg) => {
    let button = JSON.parse(msg.toString())
    console.log(topic, button.id)
    // load the page corresponding to the button pressed
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'pages/button_' + button.id + '.html'),
      protocol: 'file:',
      slashes: true
    }))
  })

  // Open the DevTools.
  // win.webContents.openDevTools()

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
