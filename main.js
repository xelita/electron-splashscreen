console.log('electron main process...');

const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        frame: false,
        show: false,
        backgroundColor: '#cc0000',
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.once('ready-to-show', () => {
        win.show();
        setInterval(() => {
            win.hide();
            app.exit()
        }, 5000);
    });
}

app.on('closed', () => {
    win = null;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

app.on('ready', createWindow);