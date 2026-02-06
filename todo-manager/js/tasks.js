let tasks = [];

/**
 * Create task HTML element
 * @param {Object} task
 * @returns {HTMLLIElement}
 */
function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.setAttribute("data-id", task.id);
    li.draggable = true;


    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <div class="task-left">
            <input type="checkbox" ${task.completed ? "checked" : ""} />
            <span class="task-text">${task.text}</span>
        </div>
    `;

    // Checkbox toggle
    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", () => {
        toggleTaskCompletion(task.id);
    });

    return li;
}

/**
 * Render all tasks
 */
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks(tasks);

    filteredTasks.forEach(task => {
        const taskEl = createTaskElement(task);
        taskList.appendChild(taskEl);
    });
}


/**
 * Add new task
 * @param {string} text
 */
function addTask(text) {
    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        createdAt: Date.now()
    };

    tasks.push(newTask);
    saveTasksToStorage(tasks);
    renderTasks();
}

/**
 * Toggle completed state
 * @param {string} id
 */
function toggleTaskCompletion(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasksToStorage(tasks);
    renderTasks();
}
