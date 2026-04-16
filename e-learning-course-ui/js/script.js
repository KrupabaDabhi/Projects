$(document).ready(function () {
    const apiUrl = "courses.json";
    let allCourses = [];

    // --- Utility: HTML entity escaping to prevent XSS ---
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // --- Category badge colors ---
    const categoryColors = {
        "Programming": "#3b82f6",
        "Design":      "#ec4899",
        "Data Science":"#8b5cf6",
        "Marketing":   "#f59e0b",
        "Business":    "#10b981",
        "Security":    "#ef4444",
        "Cloud":       "#0ea5e9",
        "DevOps":      "#f97316"
    };

    // --- Fetch courses ---
    $.getJSON(apiUrl, function (data) {
        allCourses = data;
        renderCourses(allCourses);
        populateCategories(allCourses);
    });

    // --- Build a single course card HTML string ---
    function buildCourseCard(course) {
        const safeTitle    = escapeHtml(course.title);
        const safeCategory = escapeHtml(course.category);
        const safeImage    = escapeHtml(course.image);
        const safePrice    = escapeHtml(course.price);
        const badgeColor   = categoryColors[course.category] || "#6b7280";

        return `
            <div class="course-card" data-id="${escapeHtml(String(course.id))}" data-category="${safeCategory}">
                <span class="category-badge" style="background:${badgeColor}">${safeCategory}</span>
                <img src="${safeImage}" alt="${safeTitle}">
                <h3>${safeTitle}</h3>
                <p class="course-price">$${safePrice}</p>
            </div>
        `;
    }

    // --- Render a list of courses; show empty state when none match ---
    function renderCourses(courseList) {
        const $container = $("#courseContainer");
        $container.empty();

        if (courseList.length === 0) {
            $container.html(`
                <div class="empty-state">
                    <span class="empty-icon">&#128218;</span>
                    <p>No courses found</p>
                </div>
            `);
            return;
        }

        courseList.forEach(function (course) {
            $container.append(buildCourseCard(course));
        });
    }

    // --- Populate category dropdown ---
    function populateCategories(courseList) {
        const categories = [...new Set(courseList.map(c => c.category))].sort();
        categories.forEach(function (cat) {
            $("#categoryFilter").append(
                `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`
            );
        });
    }

    // --- Filter courses based on current search text and selected category ---
    function filterCourses() {
        const searchText       = $("#search").val().toLowerCase().trim();
        const selectedCategory = $("#categoryFilter").val();

        const filtered = allCourses.filter(function (course) {
            const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
            const matchesSearch   = course.title.toLowerCase().includes(searchText) ||
                                    course.description.toLowerCase().includes(searchText);
            return matchesCategory && matchesSearch;
        });

        renderCourses(filtered);
    }

    // --- Wire up search and filter controls ---
    $("#search, #categoryFilter").on("input change", filterCourses);

    // --- Open modal on card click ---
    $(document).on("click", ".course-card", function () {
        const id     = $(this).data("id");
        const course = allCourses.find(function (c) { return c.id == id; });
        if (!course) return;

        $("#modalImage").attr("src", course.image).attr("alt", escapeHtml(course.title));
        $("#modalTitle").text(course.title);
        $("#modalDescription").text(course.description);
        $("#modalPrice").text(course.price);
        $("#courseName").val(course.title);
        $("#enrollMessage").hide().removeClass("error-msg");
        $("#enrollForm")[0].reset();
        $("#courseName").val(course.title);

        $("#courseModal").fadeIn();
    });

    // --- Close modal via X button ---
    $("#closeModal").on("click", function () {
        $("#courseModal").fadeOut();
    });

    // --- Close modal when clicking the overlay (outside the modal box) ---
    $("#courseModal").on("click", function (e) {
        if ($(e.target).is("#courseModal")) {
            $("#courseModal").fadeOut();
        }
    });

    // --- Enrollment form submission with inline validation ---
    $("#enrollForm").on("submit", function (e) {
        e.preventDefault();

        const $msg   = $("#enrollMessage");
        const name   = $.trim($(this).find("input[name='name']").val());
        const email  = $.trim($(this).find("input[name='email']").val());

        // Inline validation feedback
        if (!name || !email) {
            $msg
                .text("Please fill in your name and email before enrolling.")
                .addClass("error-msg")
                .removeClass("success-msg-visible")
                .show();
            return;
        }

        // Fake AJAX success
        setTimeout(function () {
            const courseTitle = $("#modalTitle").text();
            $msg
                .text("Enrollment successful! You are now enrolled in: " + courseTitle)
                .removeClass("error-msg")
                .addClass("success-msg-visible")
                .show();
            $("#enrollForm")[0].reset();
            $("#courseName").val(courseTitle);
        }, 500);
    });
});
