const STORAGE_KEY = "todo_tasks";

/**
 * Get tasks from localStorage
 * @returns {Array}
 */
function getTasksFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Save tasks to localStorage
 * @param {Array} tasks
 */
function saveTasksToStorage(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
