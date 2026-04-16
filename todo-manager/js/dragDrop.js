let draggedTaskId = null;

/**
 * Initialize drag-and-drop event listeners on the task list.
 */
function initDragAndDrop() {
    const taskList = document.getElementById("taskList");

    taskList.addEventListener("dragstart", handleDragStart);
    taskList.addEventListener("dragover",  handleDragOver);
    taskList.addEventListener("dragleave", handleDragLeave);
    taskList.addEventListener("drop",      handleDrop);
    taskList.addEventListener("dragend",   handleDragEnd);
}

function handleDragStart(e) {
    const li = e.target.closest(".task-item");
    if (!li) return;

    draggedTaskId = li.dataset.id;
    li.classList.add("dragging");
    // Required for Firefox
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", draggedTaskId);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const li = e.target.closest(".task-item");
    if (!li || li.dataset.id === draggedTaskId) return;

    // Clear highlight from all other items first, then highlight this one
    document.querySelectorAll(".task-item").forEach(item => {
        if (item !== li) item.classList.remove("drag-over");
    });
    li.classList.add("drag-over");
}

function handleDragLeave(e) {
    const li = e.target.closest(".task-item");
    if (!li) return;

    // Only remove if the pointer truly left the item (not just moved to a child)
    if (!li.contains(e.relatedTarget)) {
        li.classList.remove("drag-over");
    }
}

function handleDrop(e) {
    e.preventDefault();

    const targetLi = e.target.closest(".task-item");
    if (!targetLi) return;

    const targetId = targetLi.dataset.id;
    if (draggedTaskId === targetId) return;

    reorderTasks(draggedTaskId, targetId);
    saveTasksToStorage(tasks);
    renderTasks();
}

function handleDragEnd() {
    // Always clean up all visual states, even on a cancelled drag
    document.querySelectorAll(".task-item").forEach(li => {
        li.classList.remove("dragging", "drag-over");
    });

    draggedTaskId = null;
}

/**
 * Reorder the tasks array by moving the dragged item to the target position.
 * @param {string} draggedId
 * @param {string} targetId
 */
function reorderTasks(draggedId, targetId) {
    const draggedIndex = tasks.findIndex(t => t.id === draggedId);
    const targetIndex  = tasks.findIndex(t => t.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [draggedTask] = tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, draggedTask);
}
