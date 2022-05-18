// file deepcode ignore ElectronInsecureWebPreferences: <please specify a reason of ignoring this>
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const DEV_SERVER_HOST = 'localhost';
const DEV_SERVER_PORT = 1717;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    },
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'favicon.ico')
  });

  if (app.isPackaged) {
    const URL = url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    });

    win.loadURL(URL);
  } else {
    const URL = `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`;

    win.loadURL(URL);
  }

  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    mainWindow = null;
  });
}

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .catch(() => {});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
