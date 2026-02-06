let draggedTaskId = null;

/**
 * Initialize drag & drop events
 */
function initDragAndDrop() {
    const taskList = document.getElementById("taskList");

    taskList.addEventListener("dragstart", handleDragStart);
    taskList.addEventListener("dragover", handleDragOver);
    taskList.addEventListener("drop", handleDrop);
    taskList.addEventListener("dragend", handleDragEnd);
}

function handleDragStart(e) {
    const li = e.target.closest(".task-item");
    if (!li) return;

    draggedTaskId = li.dataset.id;
    li.classList.add("dragging");
}

function handleDragOver(e) {
    e.preventDefault();

    const li = e.target.closest(".task-item");
    if (!li || li.dataset.id === draggedTaskId) return;

    li.classList.add("drag-over");
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
    document.querySelectorAll(".task-item").forEach(li => {
        li.classList.remove("dragging", "drag-over");
    });

    draggedTaskId = null;
}

/**
 * Reorder tasks array
 */
function reorderTasks(draggedId, targetId) {
    const draggedIndex = tasks.findIndex(t => t.id === draggedId);
    const targetIndex = tasks.findIndex(t => t.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [draggedTask] = tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, draggedTask);
}
