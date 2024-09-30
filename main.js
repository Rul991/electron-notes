import { app, BrowserWindow } from 'electron'

const createWindow = () => {
    let window = new BrowserWindow({
        width: 800,
        height: 600
    })

    window.loadFile('./pages/index.html')

    return window
}

(async () => {
    await app.whenReady()

    createWindow()

    console.log(app.getAppPath())
})()