// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

function renderCart() {
    if (!cartItemsContainer) {
        console.warn("cart-items element not found in cart.html. Skipping renderCart().");
        return;
    }
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceEl.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        const subtotal = item.price * item.kg;
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <h3>${item.name}</h3>
                <label for="qty-${index}">Quantity (kg):</label>
                <input type="number" id="qty-${index}" value="${item.kg}" min="1" onchange="updateQuantity(${index}, this.value)">
                <p>Price per kg: ₹${item.price}</p>
                <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += subtotal;
    });
    totalPriceEl.textContent = total.toFixed(2);
}

function updateQuantity(index, newQty) {
    const quantityValue = parseInt(newQty);
    if (isNaN(quantityValue) || quantityValue <= 0) {
        alert("Please enter a valid quantity (greater than 0).");
        return;
    }
    cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get latest cart
    cart[index].kg = quantityValue;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get latest cart
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function proceedToCheckout() {
    cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart data
    if (cart.length > 0) {
        window.location.href = "checkout.html";
    } else {
        alert("Your cart is empty! Please add items to your cart before proceeding to checkout.");
    }
}

// --- Initialization ---
window.onload = () => {
    renderCart();
    // Add event listener to the checkout button, if it exists.
    const checkoutButton = document.querySelector('button:contains("Proceed to Checkout")');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', proceedToCheckout);
    } else {
        console.warn("Checkout button not found in cart.html");
    }
};
