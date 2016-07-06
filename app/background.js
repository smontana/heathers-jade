import { app, Menu } from 'electron'
import createWindow from './lib/window'
import env from './env'

var mainWindow

app.on('ready', function () {
  var mainWindow = createWindow('main', {
    // width: 1000,
    // minWidth: 1000,
    // height: 618,
    // minHeight: 618
    width: 900,
    minWidth: 900,
    height: 640,
    minHeight: 640,
    autoHideMenuBar: true
  })

  mainWindow.loadURL('file://' + __dirname + '/app.html')

  if (env.name !== 'production') {
    mainWindow.openDevTools()
  }
})

app.on('window-all-closed', function () {
  app.quit()
})
