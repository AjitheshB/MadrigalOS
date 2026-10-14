lucide.createIcons();

const intro = document.querySelector(".intro")
const dock = document.querySelector(".dock")
const wlcomtext = document.querySelector(".welcome-text")
const tasks = document.querySelector(".dock-item.tasks")
const app = document.querySelector(".app.tasks")
const close = document.querySelector(".close")
const taskList = document.querySelector(".task-list")
const addTask = document.querySelector(".addtask")
const tasksList = document.querySelector(".task-list")
const addButton = document.querySelector(".addtask")
const taskInput = document.querySelector(".task-input")
const taskClear = document.querySelector(".cleartasks")

const addTaskModel = document.querySelector(".addtask-model")
const openAddTask = document.querySelector(".addtask")
const saveAddTask = document.querySelector(".task-save")
const cancelAddTask = document.querySelector(".task-cancel")

intro.addEventListener("click",function() {
    intro.style.display = "none"
    dock.style.display = "flex"
    intro.classList.add("entered")
    dock.classList.add("entered")
    wlcomtext.classList.add("entered")
} )

tasks.addEventListener("click", function() {
    if (app.classList.contains("entered")) {
        app.classList.remove("entered")
    } else {
        app.classList.add("entered")
    }
})


close.addEventListener("click", function() {
    app.classList.remove("entered")
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