const products = [
  {
      id: 1,
      name: "Tomatoes",
      price: 30,
      unit: "₹30/kg",
      image: "image/tamato.jpg"
  },
  {
      id: 2,
      name: "Wheat",
      price: 25,
      unit: "₹25/kg",
      image: "image/wheat.jpg"
  },
  {
      id: 3,
      name: "Potatoes",
      price: 20,
      unit: "₹20/kg",
      image: "image/potato.jpg"
  },
  {
      id: 4,
      name: "Onions",
      price: 28,
      unit: "₹28/kg",
      image: "image/onion.jpg"
  },
  {
      id: 5,
      name: "Rice",
      price: 40,
      unit: "₹40/kg",
      image: "image/rice.jpg"
  },
  {
      id: 6,
      name: "Carrots",
      price: 35,
      unit: "₹35/kg",
      image: "image/carrot.jpg"
  },
  {
      id: 7,
      name: "Bananas",
      price: 50,
      unit: "₹50/dozen",
      image: "image/banana.jpg"
  },
  {
      id: 8,
      name: "Sugarcane",
      price: 15,
      unit: "₹15/stick",
      image: "image/sugarcane.jpg"
  }
];

const productList = document.getElementById("product-list");

if (productList) {
  products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="100%">
          <h3>${product.name}</h3>
          <p>${product.unit}</p>
          <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(card);
  });

  // Use event delegation for "Add to Cart" button clicks
  productList.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart-button')) {
          const productId = parseInt(event.target.dataset.productId);
           console.log("Event listener triggered. Product ID from button:", productId);
          addToCart(productId);
      }
  });
} else {
  const errorMessage = "Error: productList element not found. Check your home.html.";
  console.error(errorMessage);
  //  Consider displaying an error message to the user in the HTML as well.
}

function addToCart(productId) {
  console.log(`addToCart called for product ID: ${productId}`);

  const product = products.find(p => p.id === productId);
  if (!product) {
      const productNotFoundMessage = `Product with ID ${productId} not found.`;
      console.error(productNotFoundMessage);
      alert("Sorry, there was an error adding this item to your cart.");
      return;
  }

  const quantity = prompt(`Enter quantity in kg for ${product.name}:`);
  console.log(`Entered quantity: ${quantity}`);

  if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log("Cart before adding/updating:", JSON.stringify(cart));

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
      existingItem.kg = parseFloat(existingItem.kg) + parseFloat(quantity);
      console.log("Existing item updated:", JSON.stringify(existingItem));
  } else {
      const newItem = { ...product, kg: parseFloat(quantity) };
      cart.push(newItem);
      console.log("New item added:", JSON.stringify(newItem));
  }

  try {
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log("Cart after adding/updating:", JSON.stringify(cart));
      alert(`${quantity} kg of ${product.name} added to cart`);
  } catch (error) {
      const localStorageErrorMessage = "Error saving to localStorage: " + error.message;
      console.error(localStorageErrorMessage);
      alert("Sorry, there was an error saving your cart. Please check your browser settings and try again.");
      //  Consider clearing the cart if saving fails.
      //  localStorage.removeItem('cart');
      //  cart = [];
  }
}
