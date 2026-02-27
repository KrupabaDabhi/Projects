# Product Management Dashboard – Features & Functionalities


## Overall Summary Table

| Feature                  | Description                                             | Files |
|---------------------------|---------------------------------------------------------|-------|
| Login Page                | User login with validation and redirection             | index.html, login.js, login.css |
| Dashboard Layout          | Sidebar, header, main content, responsive             | dashboard.html, dashboard.css |
| Products Load             | Fetch products via API using AJAX                      | dashboard.js |
| Product Cards             | Grid layout, hover effect, click for details          | dashboard.css, dashboard.js |
| Search                    | Search by title with debounce                          | utils.js, dashboard.js |
| Product Modal             | Shows detailed product info                             | dashboard.html (modal), dashboard.js |
| Add Product Form          | Add product via AJAX, validate, update grid           | dashboard.html (modal), dashboard.js |
| Responsive UI             | Works on different devices                              | dashboard.css |
| Error Handling            | Friendly messages for API & login issues               | dashboard.js, login.js |


## 1. Login Page

**Files:** `index.html`, `css/login.css`, `js/login.js`  

**Functionalities:**
- **User Authentication (Frontend)**
  - Users must enter **username** and **password**.
  - Form validates that **both fields are non-empty**.
  - Dummy validation: username `admin` and password `admin`.
- **Validation & Error Handling**
  - Shows **error message** if fields are empty.
  - Shows **error message** if credentials are invalid.
- **Redirect to Dashboard**
  - On successful login, user is redirected to `dashboard.html`.
- **Responsive Design**
  - Centered login box works on desktop and smaller screens.

---

## 2. Dashboard Layout

**Files:** `dashboard.html`, `css/dashboard.css`  

**Functionalities:**
- **Sidebar**
  - Project title and navigation links:
    - Dashboard
    - Add Product (opens modal)
  - Fixed position, styled with contrasting colors.
- **Header**
  - Displays page title (`Dashboard`)
  - Contains search input for filtering products.
- **Main Content Area**
  - Displays **products in grid format**.
  - Supports dynamic content loading.
- **Responsive Layout**
  - Sidebar and grid adjust automatically for screen width.

---

## 3. Products Loaded from API

**Files:** `js/dashboard.js`  

**Functionalities:**
- Fetches product data from `https://fakestoreapi.com/products` using AJAX.
- Dynamically renders products in grid.
- Error handling: Shows message if API call fails.

---

## 4. Product Cards (Grid)

**Files:** `css/dashboard.css`, `js/dashboard.js`  

**Functionalities:**
- **Card Layout**
  - Each card displays: Image, Title, Price, Category.
- **Hover Effect**
  - Slight lift effect for better UX.
- **Responsive Grid**
  - Adjusts columns based on screen width.
- **Click Action**
  - Opens **Product Details Modal** with full information.

---

## 5. Search with Debounce

**Files:** `js/utils.js`, `dashboard.js`  

**Functionalities:**
- Live search filters products by **title**.
- Debounce delay: **300ms**.
- Grid updates instantly as user types.

---

## 6. Product Details Modal

**Files:** Inline in `dashboard.html`, controlled by `dashboard.js`, styled in `dashboard.css`  

**Functionalities:**
- Opens when a **product card** is clicked.
- Displays: Title, Image, Price, Category, Description.
- Close button (`×`) hides modal.
- Responsive design for smaller screens.

---

## 7. Add Product Form (jQuery AJAX)

**Files:** Inline modal in `dashboard.html`, `dashboard.js`  

**Functionalities:**
- **Form Fields:** Title, Price, Category, Image URL, Description.
- **Validation:** All fields are required.
- **AJAX POST**
  - Simulates adding product to API.
  - Updates product grid dynamically.
- **Reset & Feedback**
  - Form resets after submission.
  - Shows success message: “Product added successfully!”.
- Modal closes after submission or clicking **×**.

---

## 8. Utility Functions

**File:** `js/utils.js`  

**Functionalities:**
- **Debounce Function**
  - Reduces unnecessary function calls during search input.
- Reusable for other repetitive tasks in dashboard.

---

## 9. Overall Features & UX Enhancements

- **Responsive Design**
  - Works on multiple screen sizes.
- **Modern UI**
  - Clean look with hover effects and spacing.
- **Error Handling**
  - Friendly messages for invalid login, failed API calls, failed product addition.
- **Fast & Interactive**
  - AJAX updates prevent page reloads.
  - Instant search filtering with debounce.
- **First Iteration Success**
  - Fully functional without backend modifications.
  - Works out-of-the-box with Live Server.

---


