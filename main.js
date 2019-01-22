const {app, BrowserWindow,Menu} = require('electron')
let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: false,
    resizable: false,
    icon :"./Application/resources/img/icon.png"
  })
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  const template = [
    {
      label: 'Düzenle',
      submenu: [
        { role: 'undo' ,label:"Geri Al" },
        { role: 'redo', label:"İleri Al" },
        { type: 'separator' },
        { role: 'cut',label:"Kes" },
        { role: 'copy',label:"Kopyala" },
        { role: 'paste',label:"Yapıştır" },
        { role: 'delete',label:"Sil" },
        { role: 'selectall',label:"Tümünü Seç" }
      ]
    },
    {
      label: 'Görünüm',
      submenu: [
        { label: 'Yenile',
        click () {
          mainWindow.reload();
        }
        },
        { role: 'forcereload',label:"Yeniden Başlatmaya Zorla" },
        { role: 'toggledevtools',label:"Geliştirici Araçları" },
        { type: 'separator' },
        { role: 'zoomin',label:"Yakınlaştır" },
        { role: 'zoomout',label:"Uzaklaştır" },
        { type: 'separator' },
      ]
    },
    {
      label: 'Pencere',
      submenu: [
    
        { role: 'minimize',label:"Küçült" },
        { role: 'close' ,label:"Kapat"}
      ]
    },
  ]
  
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  
    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    )
  
    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu) 
  
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
