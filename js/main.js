// js/main.js
// show/hide nav items based on login state

function renderNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let html = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
      <a class="navbar-brand" href="index.html">Online Shop</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
    `;

    if (user) {
        // Logged in
        html += `<li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>`;

        if (user.isAdmin) {
            // Admin sees Add Product
            html += `<li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>`;
        } else {
            // Regular user sees Cart
            html += `<li class="nav-item"><a class="nav-link" href="cart.html">Cart</a></li>`;
        }

        html += `<li class="nav-item"><a class="nav-link" href="#" onclick="logoutUser()">Logout (${user.name})</a></li>`;
    } else {
        // Not logged in
        html += `
            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
        `;
    }

    html += `</ul></div></nav>`;
    navbar.innerHTML = html;
}

// Run on page load
document.addEventListener("DOMContentLoaded", renderNavbar);

function updateNavbar(){
  const logged = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  const authLinks = document.getElementById('authLinks');
  const addNav = document.getElementById('addProductNav');

  if(!authLinks) return;

  if(logged){
    authLinks.innerHTML = `
      <span class="nav-link">Hi, ${escapeHtml(logged.name)}</span>
      <a class="nav-link" href="#" id="logoutBtn">Logout</a>
    `;
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      location.href = 'login.html';
    });
    if(addNav) addNav.classList.remove('d-none');
  } else {
    authLinks.innerHTML = `
      <a class="nav-link" href="login.html">Login</a>
      <a class="nav-link" href="register.html">Register</a>
    `;
    if(addNav) addNav.classList.add('d-none');
  }
}

function checkLogin() {
let user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) window.location.href = "login.html";
}


function logout() {
localStorage.removeItem("loggedInUser");
window.location.href = "login.html";
}

// basic escape
function escapeHtml(s){ return String(s).replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// run on load
document.addEventListener('DOMContentLoaded', updateNavbar);
