document.addEventListener("DOMContentLoaded", () => {
    // Load tasks from storage
    tasks = getTasksFromStorage();
    renderTasks();
    initFilters();
    initDragAndDrop();



    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");

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

        if (text === "") return;

        addTask(text);
        taskInput.value = "";
    }
});
