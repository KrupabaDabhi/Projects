$(document).ready(function () {

    // Password visibility toggle
    $('#togglePassword').on('click', function () {
        const $input = $('#password');
        const isPassword = $input.attr('type') === 'password';
        $input.attr('type', isPassword ? 'text' : 'password');
        // Swap icon: open eye when visible, closed when hidden
        $(this).html(isPassword ? '&#x1F441;&#xFE0F;&#x200D;&#x1F5E8;' : '&#x1F441;');
    });

    // Login form validation
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        if (username === '' || password === '') {
            $('.error-msg').text('Both fields are required!');
            return;
        }

        // Demo auth (replace with real auth later)
        if (username === 'admin' && password === 'admin') {
            window.location.href = 'dashboard.html';
        } else {
            $('.error-msg').text('Invalid username or password.');
        }
    });

});
