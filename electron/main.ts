import { app, BrowserWindow, globalShortcut, Menu } from "electron";
import path from "node:path";
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");


let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

const createWindow = () => {
  win = new BrowserWindow({
    width: 1500,
    height: 920,
    minWidth: 1220,
    // icon: path.join("/public/favico.svg", process.env.VITE_PUBLIC),
    icon: path.join(process.env.VITE_PUBLIC, "favico.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
    }
  });

  const mainMenu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(mainMenu);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    // win.loadFile(path.join(process.env.DIST, "index.html"));
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

}

app.on('ready', () => {
  // Votre code de chargement de contenu ou d'autres configurations ici...
  // Enregistrez un raccourci global
  globalShortcut.register('CommandOrControl+Shift+A', () => {
      if (win) {
          const isAlwaysOnTop = win.isAlwaysOnTop();
          win.setAlwaysOnTop(!isAlwaysOnTop); // bascule entre on/off
      }
  });
});

app.on('will-quit', () => {
  // Désenregistrez le raccourci pour éviter des fuites
  globalShortcut.unregisterAll();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
