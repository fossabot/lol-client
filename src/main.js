const { app, BrowserWindow, screen } = require('electron');
const path = require('path')

function createWindow() {
    const { height, width } = screen.getPrimaryDisplay().workAreaSize

    const window = new BrowserWindow({
        height,
        width,
        title: "lol",
    })
    window.loadURL("https://krunker.io/")

    const ses = window.webContents.session
    ses.loadExtension(path.resolve("./uBlock")).then(e => {
        console.log(e.id)
    })
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed',() => {
    if (process.platform !== 'darwin') app.quit()
})