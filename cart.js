const cartContainer = document.getElementById("cart-container");
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Render Cart Items
function renderCart() {
  cartContainer.innerHTML = ""; // Clear the cart container

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item"); // Add styling class

      itemDiv.innerHTML = `
        <div class="item-details">
          <img src="${item.image}" alt="${item.title}" class="item-image">
          <div>
            <h3>${item.title}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      `;
      cartContainer.appendChild(itemDiv);
    });
  } else {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
}


function removeItem(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  Swal.fire("Removed!", "Item has been removed from your cart.", "success").then(() => {
    renderCart();
  });
}

// Place Order
function placeOrder() {
  if (cartItems.length === 0) {
    Swal.fire("Empty Cart", "Your cart is empty. Add items before placing an order.", "warning");
    return;
  }

  Swal.fire("Order Placed!", "Your order has been successfully placed.", "success");
  localStorage.removeItem("cart");
  cartItems = [];
  renderCart();
}


renderCart();
