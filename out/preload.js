"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld(`electron`, {
    bot_login: (token) => electron_1.ipcRenderer.send(`bot-login`, { bot_token: token })
});
