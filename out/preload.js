"use strict";
const { contextBridge, ipcRenderer } = require(`electron`);
console.log(`Preload is loaded!`);
contextBridge.exposeInMainWorld(`electronAPI`, {
    setToken: (token) => ipcRenderer.send(`setToken`, { bot_token: token }),
    sendMsg: (content, channel) => ipcRenderer.send(`sendMsg`, { content: content, channel: channel })
});
