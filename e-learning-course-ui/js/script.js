$(document).ready(function() {
    const apiUrl = "https://fakestoreapi.com/products";
    let courses = [];

    // Fetch courses from API
    $.getJSON(apiUrl, function(data) {
        courses = data;
        renderCourses(courses);
        populateCategories(courses);
    });

    // Render course cards
    function renderCourses(courseList) {
        $("#courseContainer").empty();
        courseList.forEach(course => {
            $("#courseContainer").append(`
                <div class="course-card" data-category="${course.category}">
                    <img src="${course.image}" alt="${course.title}">
                    <h3>${course.title}</h3>
                    <p>$${course.price}</p>
                    <button class="viewDetails" data-id="${course.id}">View Details</button>
                </div>
            `);
        });
    }

    // Populate category filter
    function populateCategories(courseList) {
        const categories = [...new Set(courseList.map(c => c.category))];
        categories.forEach(cat => {
            $("#categoryFilter").append(`<option value="${cat}">${cat}</option>`);
        });
    }

    // Search & filter
    $("#search, #categoryFilter").on("input change", function() {
        const searchText = $("#search").val().toLowerCase();
        const selectedCategory = $("#categoryFilter").val();
        const filtered = courses.filter(course => {
            const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
            const matchesSearch = course.title.toLowerCase().includes(searchText);
            return matchesCategory && matchesSearch;
        });
        renderCourses(filtered);
    });

    // Open modal
    $(document).on("click", ".viewDetails", function() {
        const id = $(this).data("id");
        const course = courses.find(c => c.id == id);

        $("#modalImage").attr("src", course.image);
        $("#modalTitle").text(course.title);
        $("#modalDescription").text(course.description);
        $("#modalPrice").text(course.price);
        $("#courseName").val(course.title);
        $("#enrollMessage").hide();

        $("#courseModal").fadeIn();
    });

    // Close modal
    $(".close").click(function() {
        $("#courseModal").fadeOut();
    });

    $(window).click(function(event) {
        if ($(event.target).is("#courseModal")) {
            $("#courseModal").fadeOut();
        }
    });

    // Enrollment form AJAX
    $("#enrollForm").submit(function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        console.log("Enrollment Data:", formData);

        // Fake AJAX success
        setTimeout(() => {
            $("#enrollMessage").text("Enrollment successful!").show();
            $("#enrollForm")[0].reset();
            $("#courseName").val($("#modalTitle").text());
        }, 500);
    });
});
