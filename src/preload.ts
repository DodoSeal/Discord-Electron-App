const { contextBridge, ipcRenderer } = require(`electron`);
console.log(`Preload is loaded!`);

contextBridge.exposeInMainWorld(`electronAPI`, {
    setToken: (token: string) => ipcRenderer.send(`setToken`, { bot_token: token }),
    sendMsg: (content: string, channel: string) => ipcRenderer.send(`sendMsg`, { content: content, channel: channel })
});