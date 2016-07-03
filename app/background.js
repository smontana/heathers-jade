import { app, Menu } from 'electron'
import createWindow from './lib/window'

// TODO: implement gulp build
// import env from './env'

var mainWindow

app.on('ready', function () {
  var mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true
  })

  // mainWindow.loadURL('file://' + __dirname + '/app.html')
  mainWindow.loadURL('file://' + __dirname + '/app.jade')

  // if (env.name !== 'production') {
  //   mainWindow.openDevTools()
  // }

  mainWindow.openDevTools()

})

app.on('window-all-closed', function () {
  app.quit()
})
