/* ============================================================
   dashboard.js — Product Dashboard logic
   ============================================================ */

$(document).ready(function () {
    const API_URL = 'https://fakestoreapi.com/products';

    let allProducts = [];     // full list from API
    let filteredProducts = []; // currently displayed

    const $productsGrid   = $('#productsGrid');
    const $productModal   = $('#productModal');
    const $addProductModal = $('#addProductModal');
    const $productCount   = $('#productCount');

    // ─── Initialise ────────────────────────────────────────────
    fetchProducts();
    bindEvents();

    // ─── Data ──────────────────────────────────────────────────
    function fetchProducts() {
        showLoading();
        $.ajax({
            url: API_URL,
            method: 'GET',
            success: function (data) {
                allProducts = data;
                filteredProducts = data;
                renderProducts(filteredProducts);
            },
            error: function () {
                $productsGrid.html('<p style="grid-column:1/-1;color:#dc2626;">Failed to load products. Check your internet connection.</p>');
                updateCount(0);
            }
        });
    }

    // ─── Render ────────────────────────────────────────────────
    function renderProducts(list) {
        $productsGrid.empty();

        if (list.length === 0) {
            $productsGrid.html('<p style="grid-column:1/-1;color:#6b7280;padding:2rem 0;">No products match your search.</p>');
            updateCount(0);
            return;
        }

        list.forEach(function (product) {
            const card = buildCard(product);
            $productsGrid.append(card);
        });

        updateCount(list.length);
    }

    function buildCard(product) {
        const title    = escapeHtml(product.title);
        const category = escapeHtml(product.category);
        const price    = parseFloat(product.price).toFixed(2);
        const image    = escapeHtml(product.image);

        return $(`
            <div class="product-card" data-id="${product.id}">
                <span class="category-badge">${category}</span>
                <img src="${image}" alt="${title}" loading="lazy">
                <h3>${title}</h3>
                <p class="price">$${price}</p>
            </div>
        `);
    }

    function showLoading() {
        $productsGrid.html(`
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading products…</p>
            </div>
        `);
        updateCount(0);
    }

    function updateCount(n) {
        $productCount.text('Products (' + n + ')');
    }

    // ─── Search ────────────────────────────────────────────────
    $('#search').on('input', debounce(function () {
        const query = $(this).val().trim().toLowerCase();
        filteredProducts = query
            ? allProducts.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
            : allProducts;
        renderProducts(filteredProducts);
    }, 300));

    // ─── Product Detail Modal ──────────────────────────────────
    function openProductModal(id) {
        const product = allProducts.find(p => p.id === id);
        if (!product) return;

        const title       = escapeHtml(product.title);
        const category    = escapeHtml(product.category);
        const description = escapeHtml(product.description);
        const price       = parseFloat(product.price).toFixed(2);
        const image       = escapeHtml(product.image);

        $('#modalBody').html(`
            <h2>${title}</h2>
            <img src="${image}" alt="${title}">
            <p><strong>Price:</strong> <span style="color:#16a34a;font-weight:700;">$${price}</span></p>
            <p><strong>Category:</strong> <em>${category}</em></p>
            <p>${description}</p>
        `);
        $productModal.addClass('is-open');
    }

    function closeAllModals() {
        $productModal.removeClass('is-open');
        $addProductModal.removeClass('is-open');
    }

    // ─── Add Product Modal ─────────────────────────────────────
    function openAddModal() {
        $addProductModal.addClass('is-open');
    }

    // ─── Event Bindings ────────────────────────────────────────
    function bindEvents() {
        // Open product detail modal on card click
        $(document).on('click', '.product-card', function () {
            const id = parseInt($(this).data('id'), 10);
            openProductModal(id);
        });

        // Close modal via × button
        $(document).on('click', '.modal .close', function () {
            closeAllModals();
        });

        // Close modal by clicking on the dark overlay (outside modal-content)
        $(document).on('click', '.modal', function (e) {
            if ($(e.target).hasClass('modal')) {
                closeAllModals();
            }
        });

        // Keyboard: Escape closes modals
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape') closeAllModals();
        });

        // Open add-product modal
        $('#addProductBtn').on('click', function (e) {
            e.preventDefault();
            openAddModal();
        });

        // Add Product form submission
        $('#addProductForm').on('submit', function (e) {
            e.preventDefault();

            // Validate price
            const priceVal = parseFloat($('input[name="price"]').val());
            if (isNaN(priceVal) || priceVal < 0) {
                $('.form-msg').css('color', '#dc2626').text('Please enter a valid price.');
                return;
            }

            const formData = $(this).serializeArray();
            const newProduct = {};
            formData.forEach(item => { newProduct[item.name] = item.value; });
            newProduct.price = priceVal;

            $.ajax({
                url: API_URL,
                method: 'POST',
                data: JSON.stringify(newProduct),
                contentType: 'application/json',
                success: function (data) {
                    // FakeStore returns the new object with id=21
                    allProducts.push(data);
                    filteredProducts = allProducts;
                    renderProducts(filteredProducts);
                    $('#addProductForm')[0].reset();
                    closeAllModals();
                    // Show a brief success banner
                    showBanner('Product added successfully!');
                },
                error: function () {
                    $('.form-msg').css('color', '#dc2626').text('Failed to add product. Try again.');
                }
            });
        });
    }

    // ─── Helpers ───────────────────────────────────────────────
    function showBanner(msg) {
        const $banner = $('<div>')
            .text(msg)
            .css({
                position: 'fixed', bottom: '1.5rem', right: '1.5rem',
                background: '#16a34a', color: '#fff',
                padding: '0.75rem 1.25rem', borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 999, fontSize: '0.9rem'
            });
        $('body').append($banner);
        setTimeout(() => $banner.fadeOut(400, () => $banner.remove()), 3000);
    }
});
