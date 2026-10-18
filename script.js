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
    } else {
        topApp = document.querySelector(".app.entered")
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

// Terminal app
terminal.addEventListener("click", function() {
    terminalApp.classList.toggle("entered")

    if (terminalApp.classList.contains("entered") && terminalOut.children.length === 0)  {
        showFastFetch()
        topApp = terminalApp
    } else {
        topApp = document.querySelector(".app.entered")
    }

    appLayers()
    
    }
)

// Calendar App
const calendar = document.querySelector('[data-app="calendar"]')
const calendarApp = document.querySelector("#calendar")

calendar.addEventListener("click", function() {
    calendarApp.classList.toggle("entered")

    if (calendarApp.classList.contains("entered")) {
        topApp = calendarApp
    } else {
        topApp = document.querySelector(".app.entered")
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
    } else {
        topApp = document.querySelector(".app.entered")
    }

    appLayers()
    renderFiles()
    
})

// Settings App
const settings = document.querySelector('[data-app="settings"]')
const settingsApp = document.querySelector("#settings")

settings.addEventListener("click", function() {
    settingsApp.classList.toggle("entered")

    if (settingsApp.classList.contains("entered")) {
        topApp = settingsApp
    } else {
        topApp = document.querySelector(".app.entered")
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

    lucide.createIcons();

    taskInput.value = ""    

    addTaskModel.classList.remove("open")
})

taskClear.addEventListener("click", () => {
    taskList.innerHTML = ""
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

