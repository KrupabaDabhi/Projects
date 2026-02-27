let currentFilter = "all";

/**
 * Initialize filter buttons
 */
function initFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active button UI
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Update filter state
            currentFilter = btn.dataset.filter;

            // Re-render tasks
            renderTasks();
        });
    });
}

/**
 * Apply filter to tasks
 * @param {Array} tasks
 * @returns {Array}
 */
function getFilteredTasks(tasks) {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks; // all
}
