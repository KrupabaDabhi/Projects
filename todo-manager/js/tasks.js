// tasks array — the single source of truth for all task data
let tasks = [];

/**
 * Initialize tasks from storage. Call once on startup.
 */
function initTasks() {
    tasks = getTasksFromStorage();
}

/**
 * Create a task <li> element using safe DOM APIs (no innerHTML for user text).
 * @param {Object} task
 * @returns {HTMLLIElement}
 */
function createTaskElement(task) {
    // --- <li> wrapper ---
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.setAttribute("data-id", task.id);
    li.draggable = true;

    // --- Drag handle ---
    const dragHandle = document.createElement("span");
    dragHandle.className = "drag-handle";
    dragHandle.textContent = "⠿";
    dragHandle.setAttribute("aria-hidden", "true");

    // --- Left group (checkbox + text) ---
    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark task complete");
    checkbox.addEventListener("change", () => {
        toggleTaskCompletion(task.id);
    });

    // Task text (contenteditable for inline editing)
    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;        // safe — never sets innerHTML
    textSpan.contentEditable = "true";
    textSpan.setAttribute("role", "textbox");
    textSpan.setAttribute("aria-label", "Task text");

    // Save on blur
    textSpan.addEventListener("blur", () => {
        const newText = textSpan.textContent.trim();
        if (newText === "") {
            // Restore original text if user clears the field
            textSpan.textContent = task.text;
            return;
        }
        if (newText !== task.text) {
            updateTaskText(task.id, newText);
        }
    });

    // Save on Enter (prevent newline)
    textSpan.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            textSpan.blur();
        }
    });

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(textSpan);

    // --- Delete button ---
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", () => {
        deleteTask(task.id);
    });

    // --- Assemble ---
    li.appendChild(dragHandle);
    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);

    return li;
}

/**
 * Render tasks into the DOM.
 * Also updates the header task-count summary and filter badges.
 */
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks(tasks);

    if (filteredTasks.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-state";
        emptyLi.textContent = "No tasks here! ✅";
        taskList.appendChild(emptyLi);
    } else {
        filteredTasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });
    }

    updateTaskCountSummary();
    updateFilterBadges();
}

/**
 * Update the "X tasks remaining" header line.
 */
function updateTaskCountSummary() {
    const summary = document.getElementById("taskCountSummary");
    if (!summary) return;
    const remaining = tasks.filter(t => !t.completed).length;
    summary.textContent = remaining === 1 ? "1 task remaining" : `${remaining} tasks remaining`;
}

/**
 * Update filter button count badges.
 */
function updateFilterBadges() {
    const allCount       = tasks.length;
    const activeCount    = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;

    const countAll       = document.getElementById("count-all");
    const countActive    = document.getElementById("count-active");
    const countCompleted = document.getElementById("count-completed");

    if (countAll)       countAll.textContent       = allCount;
    if (countActive)    countActive.textContent    = activeCount;
    if (countCompleted) countCompleted.textContent = completedCount;
}

/**
 * Add a new task.
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
 * Delete a task by id.
 * @param {string} id
 */
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage(tasks);
    renderTasks();
}

/**
 * Toggle the completed state of a task.
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

/**
 * Update the text of an existing task.
 * @param {string} id
 * @param {string} newText
 */
function updateTaskText(id, newText) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, text: newText }
            : task
    );

    saveTasksToStorage(tasks);
    // No full re-render needed — DOM already shows the new text via contenteditable
}
