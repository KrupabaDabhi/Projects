document.addEventListener("DOMContentLoaded", () => {
    // Initialize tasks from storage (safe init via tasks.js)
    initTasks();
    renderTasks();
    initFilters();
    initDragAndDrop();

    const taskInput   = document.getElementById("taskInput");
    const addTaskBtn  = document.getElementById("addTaskBtn");
    const charCounter = document.getElementById("charCounter");
    const MAX_LEN     = 100;

    // Character counter
    taskInput.addEventListener("input", () => {
        const len = taskInput.value.length;
        charCounter.textContent = `${len}/${MAX_LEN}`;

        charCounter.classList.remove("warn", "error");
        if (len >= MAX_LEN) {
            charCounter.classList.add("error");
        } else if (len >= MAX_LEN * 0.8) {
            charCounter.classList.add("warn");
        }

        addTaskBtn.disabled = len >= MAX_LEN;
    });

    // Add task on button click
    addTaskBtn.addEventListener("click", () => {
        handleAddTask();
    });

    // Add task on Enter key
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    });

    function handleAddTask() {
        const text = taskInput.value.trim();
        if (text === "" || text.length > MAX_LEN) return;

        addTask(text);
        taskInput.value = "";
        charCounter.textContent = `0/${MAX_LEN}`;
        charCounter.classList.remove("warn", "error");
        addTaskBtn.disabled = false;
    }
});
