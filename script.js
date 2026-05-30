const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks){

    taskList.innerHTML = "";

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        let priorityClass = "";

        if(task.priority === "High"){
            priorityClass = "priority-high";
        }
        else if(task.priority === "Medium"){
            priorityClass = "priority-medium";
        }
        else{
            priorityClass = "priority-low";
        }

        li.innerHTML = `
        
            <div class="task-info">
                <h3>${task.text}</h3>

                <p class="${priorityClass}">
                    Priority: ${task.priority}
                </p>

                <p>Due Date: ${task.date}</p>
            </div>

            <div class="task-buttons">

                <button class="complete-btn"
                onclick="toggleTask(${index})">
                    ✓
                </button>

                <button class="edit-btn"
                onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                onclick="deleteTask(${index})">
                    ✕
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    taskCount.textContent = `Total Tasks: ${tasks.length}`;

    saveTasks();
}

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Enter task");
        return;
    }

    tasks.push({
        text:text,
        priority:priority.value,
        date:dueDate.value,
        completed:false
    });

    taskInput.value = "";
    dueDate.value = "";

    renderTasks();
}

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    renderTasks();
}

function editTask(index){

    const updatedTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    if(updatedTask !== null){

        tasks[index].text = updatedTask;

        renderTasks();
    }
}

function searchTask(){

    const searchText =
    searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchText)
    );

    renderTasks(filteredTasks);
}

renderTasks();