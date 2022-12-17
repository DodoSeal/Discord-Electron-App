"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
var token;
electron_1.app.disableHardwareAcceleration();
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    win.loadFile(`./static/html/index.html`);
    /* win.setMenu(null); */
};
electron_1.app.on(`ready`, () => {
    createWindow();
});
electron_1.app.on(`window-all-closed`, () => {
    if (process.platform !== `darwin`)
        electron_1.app.quit();
});
electron_1.ipcMain.on(`setToken`, (_event, message) => {
    token = message.bot_token;
});
electron_1.ipcMain.on(`sendMsg`, (_event, message) => {
    const content = message.content;
    const channel = message.channel;
    (0, node_fetch_1.default)(`https://discord.com/api/channels/${channel}/messages`, {
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
