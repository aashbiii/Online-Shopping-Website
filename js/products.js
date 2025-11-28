/* js/products.js
  - getProducts(), setProducts()
  - addProduct(productObj)  // used by add-product.html
  - updateProduct(id, updatedObj) // used by edit-product.html
  - deleteProduct(id) // show in product card (admin only)
  - renderProducts(containerSelector) // used by shop.html
*/

function getProducts(){ return JSON.parse(localStorage.getItem('products') || '[]'); }
function setProducts(arr){ localStorage.setItem('products', JSON.stringify(arr)); }

function updateProduct(id, updated){
  const p = getProducts().map(x=> x.id === id ? {...x, ...updated} : x);
  setProducts(p);
}

function deleteProduct(id){
  const p = getProducts().filter(x => x.id !== id);
  setProducts(p);
}

// Load products
function loadProducts() {
    const container = document.getElementById("productList");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    
    if (!container) return;

    container.innerHTML = "";
    products.forEach(p => {
        container.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="${p.image}" class="card-img-top" alt="${p.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">${p.description}</p>
                    <p class="fw-bold">₹${p.price}</p>
                    <button class="btn btn-primary mt-auto" onclick="cartAPI.addToCart(${p.id})">Add to Cart</button>
                </div>
            </div>
        </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);


// Add new product (admin)
function addProduct(event) {
    event.preventDefault();

    let name = document.getElementById("pname").value.trim();
    let desc = document.getElementById("pdesc").value.trim();
    let price = document.getElementById("pprice").value.trim();
    let image = document.getElementById("pimg").value.trim();

    if (!name || !desc || !price || !image) {
        showSnackbar("All fields required");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    const newProduct = {
        id: Date.now(),
        name,
        description: desc,
        price,
        image
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    showSnackbar("Product added!");
    setTimeout(() => {
        window.location.href = "shop.html";
    }, 1200);
}
