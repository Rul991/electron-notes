import { app, BrowserWindow, nativeImage } from 'electron'

const createWindow = () => {
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        icon: nativeImage.createFromPath('logo.png')
    })

    window.loadFile('./pages/index.html')
    window.removeMenu()

    return window
}

(async () => {
    await app.whenReady()

    createWindow()

    console.log(app.getAppPath())
})()