(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = require('os');
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

console.log('Loaded environment variables:', env)

var app = electron.remote.app
var appDir = jetpack.cwd(app.getAppPath())

console.log('The author of this app is:', appDir.read('package.json', 'json').author)

document.addEventListener('DOMContentLoaded', function () {
  // document.getElementById('first_page').innerHTML = first_page()
  // document.getElementById('platform-info').innerHTML = os.platform()
  // document.getElementById('env-name').innerHTML = env.name
  console.log('DOM Content Loaded!')
})
}());
//# sourceMappingURL=app.js.map