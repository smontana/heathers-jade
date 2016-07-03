import { app, Menu } from 'electron'
import createWindow from './lib/window'
import env from './env'

var mainWindow

app.on('ready', function () {
  var mainWindow = createWindow('main', {
    width: 1000,
    height: 600
    // TODO: Import below for windows
    // ,titleBarStyle: 'hidden-inset',
    // autoHideMenuBar: true
  })

  mainWindow.loadURL('file://' + __dirname + '/app.html')

  if (env.name !== 'production') {
    mainWindow.openDevTools()
  }
})

app.on('window-all-closed', function () {
  app.quit()
})
