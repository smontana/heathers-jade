(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

function createWindow (name, options) {

  var userDataDir = jetpack.cwd(electron.app.getPath('userData'));
  var stateStoreFile = 'window-state-' + name +'.json';
  var defaultSize = {
    width: options.width,
    height: options.height
  };
  var state = {};
  var win;

  var restore = function () {
    var restoredState = {};
    try {
      restoredState = userDataDir.read(stateStoreFile, 'json');
    } catch (err) {
      // For some reason json can't be read (might be corrupted).
      // No worries, we have defaults.
    }
    return Object.assign({}, defaultSize, restoredState);
  };

  var getCurrentPosition = function () {
    var position = win.getPosition();
    var size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  };

  var windowWithinBounds = function (windowState, bounds) {
    return windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height;
  };

  var resetToDefaults = function (windowState) {
    var bounds = electron.screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    });
  };

  var ensureVisibleOnSomeDisplay = function (windowState) {
    var visible = electron.screen.getAllDisplays().some(function (display) {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults(windowState);
    }
    return windowState;
  };

  var saveState = function () {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    userDataDir.write(stateStoreFile, state, { atomic: true });
  };

  // state = ensureVisibleOnSomeDisplay(restore());
  state = ensureVisibleOnSomeDisplay(resetToDefaults());

  win = new electron.BrowserWindow(Object.assign({}, options, state));

  win.on('close', saveState);

  return win;
}

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

electron.app.on('ready', function () {
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

electron.app.on('window-all-closed', function () {
  electron.app.quit()
})
}());
//# sourceMappingURL=background.js.map