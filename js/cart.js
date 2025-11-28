/* cart.js */

function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    let cart = getCart();
    const item = cart.find(x => x.productId === productId);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ productId: productId, qty: 1 });
    }

    setCart(cart);
    alert("Added to Cart!");
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(x => x.productId !== productId);
    setCart(cart);
    loadCart(); // reload cart table if on cart page
}

function updateQty(productId, qty) {
    let cart = getCart();
    const item = cart.find(x => x.productId === productId);
    if (item) item.qty = qty;
    setCart(cart);
    loadCart();
}

function loadCart() {
    const container = document.getElementById("cartTable");
    if (!container) return;

    const cart = getCart();
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    container.innerHTML = "";

    let grandTotal = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;

        const total = product.price * item.qty;
        grandTotal += total;

        container.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>
                    <input type="number" value="${item.qty}" min="1"
                        onchange="cartAPI.updateQty(${product.id}, this.value)">
                </td>
                <td>₹${total}</td>
                <td>
                    <button class="btn btn-danger btn-sm"
                        onclick="cartAPI.removeFromCart(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}
function checkoutCart() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Clear the cart
    localStorage.removeItem("cart");

    // Reload cart table
    loadCart();

    // Alert
    alert("Order placed successfully!");
}

// Expose in cartAPI
window.cartAPI = {
    addToCart,
    removeFromCart,
    updateQty,
    loadCart,
    checkoutCart
};
