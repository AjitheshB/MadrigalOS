lucide.createIcons();

// Constants
let topApp = null

const intro = document.querySelector(".intro")
const dock = document.querySelector(".dock")
const wlcomtext = document.querySelector(".welcome-text")

// Apps
const tasks = document.querySelector('[data-app="tasks"]')

// Dock icons 
const dockItems = document.querySelectorAll(".dock-item")
const closeButton = document.querySelectorAll(".close")


// Tasks app
const app = document.querySelector("#tasks")

const taskList = document.querySelector(".task-list")
const addTask = document.querySelector(".addtask")
const addButton = document.querySelector(".addtask")
const taskInput = document.querySelector(".task-input")
const taskClear = document.querySelector(".cleartasks")
const addTaskModel = document.querySelector(".addtask-model")
const openAddTask = document.querySelector(".addtask")
const saveAddTask = document.querySelector(".task-save")
const cancelAddTask = document.querySelector(".task-cancel")

// Terminal
const terminal = document.querySelector('[data-app="terminal"]')
const terminalApp = document.querySelector("#terminal")


// Intro
intro.addEventListener("click",function() {
    intro.style.display = "none"
    dock.style.display = "flex"
    intro.classList.add("entered")
    dock.classList.add("entered")
    wlcomtext.classList.add("entered")
} )

// Tasks app opener
tasks.addEventListener("click", function() {
    app.classList.toggle("entered")

    if (app.classList.contains("entered")) {
        topApp = app
        showNotif("Tasks app launched", "MadrigalOS System")
    } else {
        topApp = document.querySelector(".app.entered")
        showNotif("Tasks app closed", "MadrigalOS System")
    }

    appLayers()
    }
)

// Close button
closeButton.forEach(function(button) {
    button.addEventListener("click", function() {
        button.closest(".app").classList.remove("entered")
    })
})

// Browser App
const browser = document.querySelector('[data-app="browser"]')
const browserApp = document.querySelector("#browser")

browser.addEventListener("click", function() {
    browserApp.classList.toggle("entered")
    browserURL.value = "wikipedia.com"
    openSite(browserURL.value)
    

    if (browserApp.classList.contains("entered")) {
        topApp = browserApp
        showNotif("Browser app launched", "MadrigalOS System")
    } else {
        topApp = document.querySelector(".app.entered")
        showNotif("Browser app closed", "MadrigalOS System")
    }

    appLayers()

})


// Terminal app
terminal.addEventListener("click", function() {
    terminalApp.classList.toggle("entered")

    if (terminalApp.classList.contains("entered") && terminalOut.children.length === 0)  {
        showFastFetch()
        topApp = terminalApp
        showNotif("Terminal app launched", "Use 'help' for available commands!")
    } else {
        topApp = document.querySelector(".app.entered")
        showNotif("Terminal app closed", "MadrigalOS System")
    }

    appLayers()
    
    }
)


// About Me App
const aboutme = document.querySelector('[data-app="about-me"]')
const aboutApp = document.querySelector("#about-me")

aboutme .addEventListener("click", function() {
    aboutApp.classList.toggle("entered")

    document.querySelector("#about-me").scrollTop = 0

    if (aboutApp.classList.contains("entered")) {
        topApp = aboutApp
        showNotif("About-Me app launched", "Coming soon!")
    } else {
        topApp = document.querySelector(".app.entered")
        showNotif("About-Me app closed", "MadrigalOS System")
    }

    appLayers()

})

// Files App
const files = document.querySelector('[data-app="files"]')
const filesApp = document.querySelector("#files")

files.addEventListener("click", function() {
    filesApp.classList.toggle("entered")
    
    if (filesApp.classList.contains("entered")) {
        topApp = filesApp
        showNotif("Files app launched", "Use the terminal app to cd into folders")
    } else {
        topApp = document.querySelector(".app.entered")

    showNotif("Files app closed","MadrigalOS System")
    }

    appLayers()
    renderFiles()
    
})

// Settings App
const settings = document.querySelector('[data-app="settings"]')
const settingsApp = document.querySelector("#settings")

settings.addEventListener("click", function() {
    settingsApp.classList.toggle("entered")
    document.querySelector("#settings").scrollTop = 0

    if (settingsApp.classList.contains("entered")) {
        abt.classList.add("entered")
        about.classList.add("entered")
        developer.classList.remove("entered")
        setting.classList.remove("entered")
        topApp = settingsApp
        showNotif("Settings app launched!","Toggle custom wallpapers")
    } else {
        topApp = document.querySelector(".app.entered")
        showNotif("Settings app closed!","MadrigalOS System")
    }

    appLayers()
    
})


// Tasks App

openAddTask.addEventListener("click", () => {
    addTaskModel.classList.add("open")
})

cancelAddTask.addEventListener("click", () => {
    addTaskModel.classList.remove("open")
})

saveAddTask.addEventListener("click", () => {
    const taskName = taskInput.value.trim()

    if(taskInput.value.trim() === "") return;

    const taskitem = document.createElement("div")
    taskitem.classList.add("task-row")

    const check = document.createElement("i")
    check.setAttribute("data-lucide", "circle")
    check.classList.add("check")


    const taskText = document.createElement("span")
    taskText.textContent = taskName

    const deleteIcon = document.createElement("i")
    deleteIcon.setAttribute("data-lucide", "trash-2")
    deleteIcon.classList.add("deleteicon")

    taskitem.append(check, taskText, deleteIcon)
    taskList.appendChild(taskitem)
    emptyMessage()
    showNotif("Task added", taskName)

    lucide.createIcons();

    taskInput.value = ""    

    addTaskModel.classList.remove("open")
})

taskClear.addEventListener("click", () => {
    taskList.innerHTML = ""
    emptyMessage()
})

taskList.addEventListener("click", (evnt) => {
    const check = evnt.target.closest(".check")

    if (!check) return

    const taskitem = check.closest(".task-row")
    taskitem.classList.toggle("completed")

    const icon = taskitem.classList.contains("completed")
        ? "circle-check"
        : "circle"

    check.setAttribute("data-lucide", icon)
    lucide.createIcons()
})

taskList.addEventListener("click", (evnt) => {
    const deleteIcon = evnt.target.closest(".deleteicon")

    if (!deleteIcon) return

    const taskitem = deleteIcon.closest(".task-row")
    taskitem.remove()
    emptyMessage()
})

// App Layering

function appLayers() {
    const openApps = document.querySelectorAll(".app.entered")

    openApps.forEach(function(win) {
        app.classList.remove("behind")
        win.style.zIndex = "20"
    })

    if (topApp && topApp.classList.contains("entered")) {
        topApp.style.zIndex = "30"
    }
}


// App Draggability

const appHeads = document.querySelectorAll(".app-head")

appHeads.forEach(function(header) {
    header.addEventListener("mousedown", function(evnt) {
        const win = header.closest(".app")
        if (evnt.target.closest("button")) return;

        const position = win.getBoundingClientRect()

        const xoffset = evnt.clientX - position.left
        const yoffset = evnt.clientY - position.top

        function drag(evnt) {
            win.style.left = (evnt.clientX -xoffset) + "px"
            win.style.top = (evnt.clientY - yoffset) + "px"
            win.style.transform = "none"
        }

        function stopDrag() {
            document.removeEventListener("mousemove", drag)
            document.removeEventListener("mouseup", stopDrag)
        }

        document.addEventListener("mousemove", drag)
        document.addEventListener("mouseup", stopDrag)

    })
})

// Desktop Clock

const clockTime = document.querySelector(".time")
const clockDate = document.querySelector(".date")


function updateClock() {
    const timeNow = new Date()
    console.log(timeNow)

    clockTime.textContent = timeNow.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
    })

    clockDate.textContent = timeNow.toLocaleDateString([], {
        weekday: 'long',
        day: 'numeric',
        month:'long'
    })
}

updateClock
setInterval(updateClock,1000)

// Window Layering

const apps = document.querySelectorAll(".app")

apps.forEach(function(win) {
    win.addEventListener("mousedown",function() {
        topApp = win
        appLayers()
    })
})

// Terminal App

const terminalInp = document.querySelector(".terminal-input")
const terminalOut = document.querySelector(".output")

// Fake files

const fileSystem = {
    "/": ["home", "etc", "usr"],
    "/home": ["ajithesh"],
    "/home/ajithesh": ["Desktop", "Documents", "Downloads", "Projects"],
    "/home/ajithesh/Desktop": ["Excel", "mysteriousapp(don't open)"],
    "/home/ajithesh/Documents": ["RocketScienceNotes.txt", "HowToMakeFriends.txt", "DavidGogginsQuotes.txt", "ScreenTime.txt"],
    "/home/ajithesh/Downloads": ["AI generated graduation certificate", "homework", "more homework", "even more homework"],
    "/home/ajithesh/Projects": ["MadrigalOS", "Coca_Cola_Secret_Recipe"],
    "/home/ajithesh/Projects/MadrigalOS": ["index.html", "style.css", "script.js"],
    "/home/ajithesh/Projects/Coca_Cola_Secret_Recipe": ["recipe.txt"],
    "/etc": ["host"],
    "/usr": ["bin"],
    "/home/ajithesh/Desktop/mysteriousapp(don't open)": ["i_knew_you_would_open_this.txt"],
    "/home/ajithesh/Downloads/ScreenTime.txt": ["Today: 23h 47mins. This week:124h 28m"],
}

let currentDir = "/home/ajithesh"

function showFastFetch() {
    const response = document.createElement("div")
    response.classList.add("cmd-response")

    response.textContent = `
        ███╗   ███╗  ajithesh@madrigalOS
        ████╗ ████║  ___________________
        ██╔████╔██║  OS; MadrigalOS
        ██║╚██╔╝██║  Shell: MadrigalSH
        ██║ ╚═╝ ██║  Resolution: ${screen.width}x${screen.height}
        ██║ ╚═╝ ██║  Platform: ${navigator.platform}
        ╚═╝     ╚═╝  
        ` 

    terminalOut.appendChild(response)
}

terminalInp.addEventListener("keydown", (evnt) => {
    if (evnt.key !== "Enter") return

    const cmd = terminalInp.value.trim()

    if (cmd === "") return

    // Command typing displays

    const typedcmd = document.createElement("div")
    typedcmd.classList.add("typed-cmd")
    typedcmd.textContent = " > " + "ajithesh@madrigalOS: ~$ " + cmd

    terminalOut.appendChild(typedcmd)

    // Command outputs
    const response = document.createElement("div")
    response.classList.add("cmd-response")

    if (cmd === "help") {
        response.textContent = "Available commands: fastfetch, help, clear, date, whoami, echo, cd, ls, dir, pwd"
    } else if (cmd ==="date") {
        response.textContent = new Date().toString()
    } else if (cmd === "whoami") {
        response.textContent = "ajithesh"
    } else if (cmd.startsWith("echo ")) {
        response.textContent = cmd.slice(5)
    } else if (cmd === "clear") {
        terminalOut.replaceChildren()
    } else if (cmd === "fastfetch") {
        response.textContent = `
        ███╗   ███╗  ajithesh@madrigalOS
        ████╗ ████║  ___________________
        ██╔████╔██║  OS; MadrigalOS
        ██║╚██╔╝██║  Shell: MadrigalSH
        ██║ ╚═╝ ██║  Resolution: ${screen.width}x${screen.height}
        ██║ ╚═╝ ██║  Platform: ${navigator.platform}
        ╚═╝     ╚═╝  
        ` 
    } else if (cmd === "fetch") {
        response.textContent = `
        ███╗   ███╗  ajithesh@madrigalOS
        ████╗ ████║  ___________________
        ██╔████╔██║  OS; MadrigalOS
        ██║╚██╔╝██║  Shell: MadrigalSH
        ██║ ╚═╝ ██║  Resolution: ${screen.width}x${screen.height}
        ██║ ╚═╝ ██║  Platform: ${navigator.platform}
        ╚═╝     ╚═╝  
        ` 
    } else if (cmd === "pwd") {
        response.textContent = currentDir
    } else if (cmd === "ls") {
        response.textContent = fileSystem[currentDir].join("     ") ||"(empty directory)"
    } else if (cmd.startsWith("cd")) {
        const dest = cmd.slice(2).trim()

        if (dest === "" || dest === "~") {
            currentDir = "/home/ajithesh"
            response.textContent = "cd " + currentDir
        } else if (dest === "..") {
            const parts = currentDir.split("/")
            parts.pop()
            currentDir = "/" + parts.filter(Boolean).join("/") || "/"
            response.textContent = "cd " + currentDir
        } else {
            const trget = currentDir === "/"
                ? "/" + dest
                : currentDir + "/" + dest
                
            if (fileSystem[trget]) {
                currentDir = trget
                response.textContent = "cd " + currentDir
            } else {
                response.textContent = "cd: Invalid directory" + dest
            }     
        }
    } else {
        response.textContent = "fish: command not found: " + cmd
    }

    // Display outputs
    if (cmd !== "clear") {
        terminalOut.appendChild(response)
    }

    terminalInp.value = ""

})

// Files App
const fileContent = document.querySelector(".files-content")
const filePath = document.querySelector(".path")

function renderFiles() {
    fileContent.innerHTML = ""
    filePath.textContent = currentDir

    const items = fileSystem[currentDir] || []

    items.forEach(function(item) {
        const file = document.createElement("div")
        file.classList.add("file-item")

        const icon = document.createElement("i")
        const name = document.createElement("span")

        if (fileSystem[currentDir + "/" + item]) {
            icon.setAttribute("data-lucide", "folder")
        } else {
            icon.setAttribute("data-lucide", "file-text")
        }

        name.textContent = item

        file.append(icon,name)
        fileContent.appendChild(file)
    })

    lucide.createIcons()
}

// Settings App

const setting = document.querySelector(".settings-settings")
const about = document.querySelector(".settings-abt")
const developer = document.querySelector(".developer")
const abt = document.querySelector(".abt-madrigal")

about.classList.add("entered")

setting.addEventListener("click", function() {
    setting.classList.add("entered")
    developer.classList.add("entered")
    abt.classList.remove("entered")
    about.classList.remove("entered")
})

about.addEventListener("click", function() {
    about.classList.add("entered")
    abt.classList.add("entered")
    developer.classList.remove("entered")
    setting.classList.remove("entered")
})

// Browser App Logic

const browserURL = document.querySelector(".browser-url");
const browserGo = document.querySelector(".browser-go")
const browserContent = document.querySelector(".browser-contents")
const browserFrame = document.querySelector(".browser-frame")

// Search icon
function openSite(input) {
    let address = input.trim()

    if (!address) return

    if (address.includes (" ") || !address.includes(".")) {
        address = "https://www.google.com/search?q=" + encodeURIComponent(address)
    } else if (!address.startsWith("http://") && !address.startsWith("https://")) {
        address= "https://" + address
    }

    document.querySelector(".browser-frame").src = address
}

// Toolbar

browserGo.addEventListener("click", () => {
    openSite(browserURL.value)
})

// Fallbacks

const translateBtn = document.querySelector(".browser-translate")
const waybackBtn = document.querySelector(".browser-wayback")
const externalBtn = document.querySelector(".browser-external")


// External

externalBtn.addEventListener("click", () => {
    let address = browserURL.value.trim()

    if (!address) return

    if (address.includes(" ") || !address.includes(".")) {
        address = "https://www.google.com/search?q=" + encodeURIComponent(address)

    } else if (!address.startsWith("https://") && !address.startsWith("http://")) {
        address = "https://" + address
    }

    window.open(address,"_blank", "noopener, noreferrer")
})

// SHORTCUTTTSSS WAWAAWWAW!!!!

const shortcuts = document.querySelectorAll(".browser-shortcuts button")

shortcuts.forEach(buttons => {
    buttons.addEventListener("click", () => {
        const url = buttons.dataset.url
        
        browserURL.value = url
        openSite(browserURL.value)
    })
})

// TOOLBARR

//Backk
document.querySelector(".browser-back").addEventListener("click", () => {
    browserFrame.contentWindow.history.back()
})

// Fwdd
document.querySelector(".browser-fwd").addEventListener("click", () => {
    browserFrame.contentWindow.history.forward()

})

// refresh

document.querySelector(".browser-refresh").addEventListener("click", () => {
    browserFrame.contentWindow.location.reload()
})

// Maximise Wins

const maxwin = document.querySelectorAll(".maximize")

maxwin.forEach(button => {
    button.addEventListener("click", () => {
        const maxApp = button.closest(".app")

        maxApp.classList.toggle("maximized")

        lucide.createIcons()
    })
})


const empty = document.querySelector(".empty")

function emptyMessage() {
    empty.style.display = taskList.querySelector(".task-row")
    ? "none"
    : "block"
}

emptyMessage()

// WALLPAPER COLLECTION

const wallpapers = [

    {name:"Default Green Mountains", file:"background.jpg", theme:"dark"},
    {name:"Dystopian Anime", file:"anime dark.jpg", theme:"dark"},
    {name: "Skyline", file:"airplane skyline.jpg", theme:"light"},
    {name: "Jujutsu Kaisen", file:"jjk.jpeg", theme:"dark"},
    {name:"One Piece", file:"one-piece.webp", theme:"dark"},
    {name: "Aurora Sky", file:"aurora sky.jpg", theme:"dark"},
    {name: "Fly Dark", file:"fly.png", theme:"dark"},
    {name:"Momonoke", file:"momonoke.jpg", theme:"dark"},
    {name:"Snow surfing", file:"surf snow.jpg", theme:"light"},
    {name:"Train Skyline", file:"trainlines.jpg", theme:"dark"},
    {name:"Ghost of Yotei", file:"wallpaper.webp", theme:"dark"},
    {name:"Anime Warrior", file:"warrior.jpg", theme:"light"},
    {name:"Night Sky", file:"night sky.jpg", theme:"dark"},
    {name: "Rainy Day", file:"rainy day.png", theme:"dark"},
    {name:"Anime", file:"anime man.png", theme:"dark"},
    {name:"Anime Warrior", file:"anime warrior.jpeg", theme:"dark"},
]

// Wallpaper - Settings

const wallGrid = document.querySelector(".wallpapers")


wallpapers.forEach(function(wallpaper) {
    const option = document.createElement("button")

    option.classList.add("wallpaper-option")

    option.innerHTML = `
    <img src ="wallpapers/${wallpaper.file}" alt="${wallpaper.name}">
    <span>${wallpaper.name}</span>
    `

    option.addEventListener("click", () => {
        document.body.style.backgroundImage = `url("./wallpapers/${wallpaper.file}")`
        localStorage.setItem("selectedWallpaper", wallpaper.file)
        document.body.classList.toggle(
            "light-wallpaper",
            wallpaper.theme === "light"
        )

        document.querySelectorAll(".wallpaper-option").forEach(function(item) {
            item.classList.remove("selected")
        })

        option.classList.add("selected")
    })

    wallGrid.appendChild(option)
})

const savedWallpaper = localStorage.getItem("selectedWallpaper")

if (savedWallpaper) {
    document.body.style.backgroundImage =
    `url("./wallpapers/${savedWallpaper}")`
}

const notifContainer = document.querySelector(".notification-container")

function showNotif(title, message) {
    const notif = document.createElement("div")
    notif.classList.add("notification")

    const icon = document.createElement("i")
    icon.setAttribute("data-lucide", "bell")
    icon.classList.add("notification-icon")

    const content = document.createElement("div")
    content.classList.add("notification-content")

    const heading = document.createElement("p")
    heading.classList.add("notification-title")
    heading.textContent = title
    
    const desc = document.createElement("p")
    desc.classList.add("notification-message")
    desc.textContent = message

    const close = document.createElement("button")
    close.classList.add("notification-close")
    close.innerHTML = '<i data-lucide="x"></i>'

    content.append(heading,desc)
    notif.append(icon,content,close)
    notifContainer.append(notif)

    lucide.createIcons()

    close.addEventListener("click", () => {
        notif.remove()
    })

    setTimeout(() => {
        notif.remove()
    }, 5000)
}

showNotif("Welcome to MadrigalOS", "MadrigalOS System")


// SPOTLIGHT SEARCHHH
const spotlight = document.querySelector("#spotlight")
const spotlightInput = document.querySelector("#spotlight-input")

function openSpotlight() {
    spotlight.classList.add("open")
    spotlightInput.focus()
}

function closeSpotlight() {
    spotlight.classList.remove("open")
    spotlightInput.value = ""
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeSpotlight()
    }

    if (event.metaKey && event.code === "Space") {
        if (spotlight.classList.contains("open")) {
            closeSpotlight()
        } else {
            openSpotlight()
        }
    }
})

const spotlightApps = [
    {name:"Terminal", icon:"square-terminal", selector: '[data-app="terminal"]'},
    {name:"Tasks", icon:"check-square", selector: '[data-app="tasks"]'},
    {name:"Files", icon:"folder", selector: '[data-app="files"]'},
    {name:"Browser", icon:"globe", selector: '[data-app="browser"]'},
    {name:"Settings", icon:"cog", selector: '[data-app="settings"]'},
    {name:"About Me", icon:"user-round", selector: '[data-app="about-me"]'}
]

const spotlightResults = document.querySelector("#spotlight-results")
let spotlightMatches = []

spotlightInput.addEventListener("input", () => {
    const query = spotlightInput.value.toLowerCase().trim()

    const matches = spotlightApps.filter(function(app) {
        return app.name.toLowerCase().includes(query)
    })
    spotlightMatches = matches

    spotlightResults.innerHTML = ""

    if (matches.length === 0) {
        spotlightResults.innerHTML = 
            `<p class="spotlight-hint"> No apps found :( </p>`
        return
    }

    matches.forEach(function(app) {
        const result = document.createElement("div")
        result.classList.add("spotlight-result")
        result.textContent = app.name
        
        result.addEventListener("click", () => {
            const appButton = document.querySelector(app.selector)

            if (appButton) {
                closeSpotlight()
                appButton.click()
            }
        })
        spotlightResults.appendChild(result)
    })
})

const esc = document.querySelector(".spotlight-shortcut")

esc.addEventListener("click", () => {
    closeSpotlight()
})