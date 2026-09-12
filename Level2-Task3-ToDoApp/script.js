let tasks = [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <li class="empty-message">
                No tasks added yet. Start by adding a task.
            </li>
        `;
    }

    tasks.forEach(function(task) {
        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >

            <span>${task.text}</span>

            <button
                class="delete-button"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateSummary();
}

function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
}

function clearCompleted() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    displayTasks();
}

function updateSummary() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();