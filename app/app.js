import os from 'os' // native node.js module
import { remote } from 'electron' // native electron module
import jetpack from 'fs-jetpack' // module loaded from npm

// import env from './env'
// console.log('Loaded environment variables:', env)

var app = remote.app
var appDir = jetpack.cwd(app.getAppPath())

console.log('The author of this app is:', appDir.read('package.json', 'json').author)

document.addEventListener('DOMContentLoaded', function () {
  // document.getElementById('first_page').innerHTML = first_page()
  // document.getElementById('platform-info').innerHTML = os.platform()
  // document.getElementById('env-name').innerHTML = env.name
  console.log('DOM Content Loaded!')
})
