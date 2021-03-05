//Define UI Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();
getTasks();

function loadEventListeners() {
    form.addEventListener('submit', addTask);

    taskList.addEventListener("click", removeTask);

    clearBtn.addEventListener("click", clearTasks);

    filter.addEventListener('keyup', filterTasks);
}

function addTask(e){
    if(taskInput.value === ""){
        alert("Add a task")
    }

    // create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStoarge(taskInput.value);

    e.preventDefault();
}

function storeTaskInLocalStoarge(task) {
    let tasks; 
    const storageData = localStorage.getItem("tasks");
    if (storageData===null){
        tasks = [];
    } else {
        tasks = JSON.parse(storageData);
    }

    tasks.push(task);

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function removeTaskInLocalStoarge(taskElement){
    let tasks; 
    const storageData = localStorage.getItem("tasks");
    if (storageData===null){
        tasks = [];
    } else {
        tasks = JSON.parse(storageData);
    }

    tasks = tasks.filter((task)=>task !== taskElement.textContent);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    const storageData = localStorage.getItem("tasks");
    if (storageData === null) {
        tasks = [];
    } else{
        tasks = JSON.parse(storageData);
    }

    tasks.forEach((task) => {// create li element
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });    
}

function removeTask(e){
    if (e.target.parentElement.classList.contains("delete-item")){
        if (confirm("are you sure?"))
            e.target.parentElement.parentElement.remove();

            removeTaskInLocalStoarge(e.target.parentElement.parentElement);
    }
}

function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild());
    }
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach((task)=>{
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}