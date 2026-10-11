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

addButton.addEventListener("click", function() {
    const taskitem = document.createElement("div")
    taskitem.textContent = "homework"
    taskList.appendChild(taskitem)
})