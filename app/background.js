import { app, Menu } from 'electron'
import createWindow from './lib/window'
import env from './env'

var mainWindow

app.on('ready', function () {
  var mainWindow = createWindow('main', {
    width: 1000,
    minWidth: 1000,
    height: 618,
    minHeight: 618
  })

  mainWindow.loadURL('file://' + __dirname + '/app.html')

  if (env.name !== 'production') {
    mainWindow.openDevTools()
  }
})

app.on('window-all-closed', function () {
  app.quit()
})
