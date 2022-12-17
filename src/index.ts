import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fetch from "node-fetch"
var token: string
app.disableHardwareAcceleration();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(`./static/html/index.html`);
    /* win.setMenu(null); */
};

app.on(`ready`, () =>{
    createWindow();
});

app.on(`window-all-closed`, () =>{
    if (process.platform !== `darwin`) app.quit();
});

ipcMain.on(`setToken`, (_event, message) => {
    token = message.bot_token;
});

ipcMain.on(`sendMsg`, (_event, message) =>{
    const content = message.content;
    const channel = message.channel;

    fetch(`https://discord.com/api/channels/${channel}/messages`, {
        method: "POST",
        headers: {
            "Authorization": `Bot ${token}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            "content": content
        })
    }).catch(err => console.log(err));
});