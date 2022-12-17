import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(`electron`, {
    bot_login: (token: string) => ipcRenderer.send(`bot-login`, { bot_token: token })
});