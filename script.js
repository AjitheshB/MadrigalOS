lucide.createIcons();

// Constants
let topApp = null

const intro = document.querySelector(".intro")
const dock = document.querySelector(".dock")
const wlcomtext = document.querySelector(".welcome-text")

// Apps
const tasks = document.querySelector('[data-app="tasks"]')
const terminalApp= document.querySelector("#terminal")

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

// Terminal app
const terminal = document.querySelector('[data-app="terminal"]')



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

    if (terminalApp.classList.contains("entered")) {
        topApp = terminalApp
    } else {
        topApp = document.querySelector(".app.entered")
    }

    appLayers()
    
    }
)


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

// App Layering

function appLayers() {
    const openApps = document.querySelectorAll(".app.entered")

    openApps.forEach(function(app) {
        app.classList.remove("behind")
    })

    openApps.forEach(function(app) {
        if(app !== topApp) {
            app.classList.add("behind")
        }
    })
}