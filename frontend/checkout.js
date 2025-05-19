// Function to calculate and display the order summary
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryItemsContainer = document.getElementById('summary-items');
    const summaryTotalPriceElement = document.getElementById('summary-total-price');

    if (!summaryItemsContainer || !summaryTotalPriceElement) {
        console.error("Error: summary-items or summary-total-price element not found in checkout.html");
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



// Function to handle the "Proceed to Payment" button click
function goToPayment() {
    const shippingForm = document.getElementById('shipping-form');
    if (shippingForm.checkValidity()) {
        // In a real application, you would collect the form data here
        // and send it to the server along with the order details.
        // For this example, we'll just simulate a successful submission.
        console.log('Shipping information is valid. Proceeding to payment...');
        // You might want to store the shipping information in localStorage as well
        // localStorage.setItem('shippingInfo', JSON.stringify({ ... }));

        // Redirect to the payment page (replace with your actual payment page URL)
        window.location.href = 'payment.html'; //  Replace 'payment.html'
    } else {
        // If the form is not valid, display an error message
        alert('Please fill in all required shipping information.');
    }
}



// --- Initialization ---
window.onload = () => {
    // Display the order summary when the page loads
    displayOrderSummary();

    // Attach event listener to the "Proceed to Payment" button
    const proceedToPaymentButton = document.querySelector('button:contains("Proceed to Payment")');
    if (proceedToPaymentButton) {
        proceedToPaymentButton.addEventListener('click', goToPayment);
    } else {
        console.warn("Proceed to Payment button not found in checkout.html");
    }
};
