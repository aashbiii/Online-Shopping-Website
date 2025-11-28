/* ===============================
      auth.js - Updated
   =============================== */

// Initialize default admin & sample products
(function initDefaults() {
    // Users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find(u => u.email === 'admin@gmail.com')) {
        users.push({
            id: Date.now(),
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin123',
            isAdmin: true
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Products
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    if (products.length === 0) {
        const sampleProducts = [
            { id: 101, name: "Samsung S25 Smartphone", price: 49999, description: "Latest 6.3-inch display smartphone.", image: "https://img.us.news.samsung.com/us/wp-content/uploads/2025/01/22132755/%EA%B0%A4%EB%9F%AD%EC%8B%9C_S25_%EC%8B%9C%EB%A6%AC%EC%A6%88.jpg", category: "Electronics" },
            { id: 102, name: "Boat Wireless Headphones", price: 4999, description: "Noise-cancelling Bluetooth headphones.", image: "https://www.boat-lifestyle.com/cdn/shop/files/ACCG6DS7WDJHGWSH_0.png?v=1727669669", category: "Electronics" },
            { id: 201, name: "Men's Casual Shirt", price: 799, description: "100% cotton casual shirt.", image: "https://m.media-amazon.com/images/I/61PgbwTHmRL._AC_UY1100_.jpg", category: "Clothing" },
            { id: 202, name: "Women's Summer Dress", price: 1199, description: "Lightweight summer dress.", image: "https://m.media-amazon.com/images/I/91rxr+L2bkL._AC_UY1100_.jpg", category: "Clothing" },
            { id: 301, name: "Samsung LED Televison", price: 599, description: "55inch LED TV", image: "https://rukminim2.flixcart.com/image/480/640/kqv8vww0/television/k/i/0/ua43au7500-samsung-original-imag4s9ztz3acyxb.jpeg?q=90", category: "Electronics" },
            { id: 302, name: "ASUS ROG Gaming Laptop", price: 1499, description: "High-end Gaming Laptop", image: "https://dlcdnwebimgs.asus.com/gain/10DEE269-0AA9-4DB8-A555-4696BC4F5767/w717/h525", category: "Electronics" }
        ];
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
})();

// ============================
// Helpers
// ============================
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
function setUsers(arr) {
    localStorage.setItem("users", JSON.stringify(arr));
}
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser") || "null");
}
function setLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}
function clearLoggedInUser() {
    localStorage.removeItem("loggedInUser");
}

// ============================
// Snackbar
// ============================
function showSnackbar(msg) {
    const snackbar = document.getElementById("snackbar");
    if (!snackbar) return;

    snackbar.innerText = msg;
    snackbar.className = "show";

    setTimeout(() => {
        snackbar.className = snackbar.className.replace("show", "");
    }, 2500);
}

// ============================
// Registration
// ============================
function registerUser() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;

    if (!name || !email || !password) return showSnackbar("All fields required");
    if (password.length < 6) return showSnackbar("Password must be 6+ characters");
    if (password !== confirm) return showSnackbar("Passwords do not match");

    let users = getUsers();
    if (users.some(u => u.email === email))
        return showSnackbar("Email already registered");

    users.push({
        id: Date.now(),
        name,
        email,
        password,
        isAdmin: false
    });

    setUsers(users);
    showSnackbar("Registration Successful");
    setTimeout(() => (window.location.href = "login.html"), 1000);
}

// ============================
// Login
// ============================
function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        showSnackbar("Please enter email & password");
        return;
    }

    let users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showSnackbar("Invalid Credentials");
        return;
    }

    setLoggedInUser(user);
    showSnackbar("Login Successful!");

    setTimeout(() => {
        // Redirect based on role
        if (user.isAdmin) window.location.href = "add-product.html";
        else window.location.href = "index.html";
    }, 1000);
}

// ============================
// Logout
// ============================
function logoutUser() {
    clearLoggedInUser();
    window.location.href = "login.html";
}

// ============================
// Admin Page Access Check
// ============================
function checkAdmin() {
    const user = getLoggedInUser();
    if (!user || !user.isAdmin) {
        alert("Admins only!");
        window.location.href = "login.html";
    }
}

// ============================
// Navbar Dynamic Rendering
// ============================
function renderNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const user = getLoggedInUser();
    let html = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
            <a class="navbar-brand" href="index.html">Online Shop</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
    `;

    if (user) {
        // Common link
        html += `<li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>`;

        if (user.isAdmin) {
            html += `<li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>`;
        } else {
            html += `<li class="nav-item"><a class="nav-link" href="cart.html">Cart</a></li>`;
        }

        html += `<li class="nav-item"><a class="nav-link" href="#" onclick="logoutUser()">Logout (${user.name})</a></li>`;
    } else {
        html += `
            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
        `;
    }

    html += `</ul></div></nav>`;
    navbar.innerHTML = html;
}

// ============================
// Expose API
// ============================
window.authAPI = {
    registerUser,
    loginUser,
    logoutUser,
    checkAdmin,
    getLoggedInUser,
    renderNavbar,
    showSnackbar
};

// Auto render navbar on every page
document.addEventListener("DOMContentLoaded", renderNavbar);
