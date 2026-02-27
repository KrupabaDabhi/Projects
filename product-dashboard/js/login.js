$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        if (username === "" || password === "") {
            $('.error-msg').text("Both fields are required!");
            return;
        }

        // Dummy validation (replace with real auth later)
        if (username === "admin" && password === "admin") {
            window.location.href = "dashboard.html";
        } else {
            $('.error-msg').text("Invalid username or password");
        }
    });
});
