// Function to calculate and display the order summary
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryItemsContainer = document.getElementById('payment-summary-items');  // Correct ID
    const summaryTotalPriceElement = document.getElementById('payment-total-price'); // Correct ID

    if (!summaryItemsContainer || !summaryTotalPriceElement) {
        console.error("Error: payment-summary-items or payment-total-price element not found in payment.html");
        return;
    }

    summaryItemsContainer.innerHTML = ''; // Clear previous summary

    let total = 0;
    if (cart.length === 0) {
        summaryItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
        summaryTotalPriceElement.textContent = '0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.kg;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center py-2 border-b border-gray-200';
        itemDiv.innerHTML = `
            <span class="text-gray-700 font-medium">${item.name} (x${item.kg})</span>
            <span class="text-gray-900 font-semibold">₹${itemTotal.toFixed(2)}</span>
        `;
        summaryItemsContainer.appendChild(itemDiv);
    });

    summaryTotalPriceElement.textContent = total.toFixed(2);
}

// Function to handle the "Pay Now" button click
function processPayment(method) {
    console.log(`Processing payment with method: ${method}`);

    if (method === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber || !expiryDate || !cvv) {
            alert('Please fill in all credit card details.');
            return;
        }
        console.log("Card Number:", cardNumber);
        console.log("Expiry Date:", expiryDate);
        console.log("CVV:", cvv);

        // In a real application, you would send this data to your server
        // to process the payment.  For this example, we'll just simulate success.
        alert('Payment successful! Your order is being processed.');
        localStorage.removeItem('cart'); // Clear the cart upon successful payment
        window.location.href = 'order-confirmation.html'; // Redirect
    } else if (method === 'upi') {
        const upiId = document.getElementById('upi-id').value;
        if (!upiId) {
            alert('Please enter your UPI ID.');
            return;
        }
         console.log("UPI ID:", upiId);
        // Simulate UPI payment processing
        alert('Payment successful! Your order is being processed.');
        localStorage.removeItem('cart'); // Clear the cart
        window.location.href = 'order-confirmation.html'; // Redirect
    }
    else{
        alert('Invalid payment method')
    }
}

// Function to show credit card form and hide UPI form
function showCreditCardForm() {
    document.getElementById('credit-card-form').style.display = 'block';
    document.getElementById('upi-form').style.display = 'none';
}

// Function to show UPI form and hide credit card form
function showUPIForm() {
    document.getElementById('credit-card-form').style.display = 'none';
    document.getElementById('upi-form').style.display = 'block';
}

// --- Initialization ---
window.onload = () => {
    // Display the order summary when the page loads
    displayOrderSummary();

    // Attach event listeners to the payment method buttons
    const creditCardButton = document.querySelector('button:contains("Credit/Debit Card")');
    const upiButton = document.querySelector('button:contains("UPI")');

    if (creditCardButton) {
        creditCardButton.addEventListener('click', showCreditCardForm);
    } else {
        console.warn("Credit/Debit Card button not found in payment.html");
    }

    if (upiButton) {
        upiButton.addEventListener('click', showUPIForm);
    } else {
        console.warn("UPI button not found in payment.html");
    }
};
