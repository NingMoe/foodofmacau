const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const five = require('johnny-five')
const raspi = require('raspi-io')

const board = new five.Board({ 
  io: new raspi(), 
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

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

  // Open the DevTools.
  //win.webContents.openDevTools()

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

board.on('ready', function() { 
  // P1-12 = 1 = GPIO18
  // const button = new five.Button({
  //         pin: 1,
  //         isPullup : true
  //       })
    
  //       button.on('down', () => {
  //         console.log('button down');
  //       })
      
  //       button.on('up', () => {
  //         console.log('button up');
  //       })

  // // When this script is stopped, turn the LED off 
  // // This is just for convenience 
  // this.on('exit', function() { 
  //         // led.stop().off(); 
  // }); 
}); 