$(document).ready(function() {
    const API_URL = "https://fakestoreapi.com/products";
    let products = [];
    const $productsGrid = $('#productsGrid');
    const $productModal = $('#productModal');
    const $addProductModal = $('#addProductModal');

    // Fetch products from API
    function fetchProducts() {
        $.ajax({
            url: API_URL,
            method: 'GET',
            success: function(data) {
                products = data;
                renderProducts(products);
            },
            error: function() {
                $productsGrid.html('<p>Failed to load products.</p>');
            }
        });
    }

    fetchProducts();

    // Render product cards
    function renderProducts(productsList) {
        $productsGrid.empty();
        productsList.forEach(product => {
            const card = $(`
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <p>${product.category}</p>
                </div>
            `);
            $productsGrid.append(card);
        });
    }

    // Search with debounce
    $('#search').on('input', debounce(function() {
        const query = $(this).val().toLowerCase();
        const filtered = products.filter(p => p.title.toLowerCase().includes(query));
        renderProducts(filtered);
    }, 300));

    // Product modal
    $(document).on('click', '.product-card', function() {
        const id = $(this).data('id');
        const product = products.find(p => p.id === id);
        $('#modalBody').html(`
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p>${product.description}</p>
        `);
        $productModal.show();
    });

    $('.modal .close').click(function() {
        $(this).closest('.modal').hide();
    });

    // Add Product Modal open
    $('#addProductBtn').click(function() {
        $addProductModal.show();
    });

    // Add Product Form submission
    $('#addProductForm').submit(function(e) {
        e.preventDefault();
        const formData = $(this).serializeArray();
        const newProduct = {};
        formData.forEach(item => {
            newProduct[item.name] = item.value;
        });

        $.ajax({
            url: API_URL,
            method: 'POST',
            data: JSON.stringify(newProduct),
            contentType: 'application/json',
            success: function(data) {
                products.push(data); // Add to local array
                renderProducts(products);
                $('#addProductForm')[0].reset();
                $('.form-msg').text("Product added successfully!");
                setTimeout(() => $('.form-msg').text(""), 3000);
                $addProductModal.hide();
            },
            error: function() {
                $('.form-msg').text("Failed to add product.");
            }
        });
    });

});
