const productContainer = document.getElementById("product-container");

// Fetch products and display them
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-card");
      console.log("products",products);

      productDiv.innerHTML = `
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <img src="${product.image}" alt="${product.title}" width="100">
        <button 
          class="btn btn-primary" 
          onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">
          Add to Cart
        </button>
      `;
      productContainer.appendChild(productDiv);
    });
  })
  .catch((err) => console.error("Error fetching products:", err));

// Manage Cart
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, title, price, image) {
  const checkIndex = cartItems.findIndex((item) => item.id === id);

  if (checkIndex === -1) {
    cartItems.push({ id, title, price, image, quantity: 1 });
  } else {
    cartItems[checkIndex].quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));

  Swal.fire({
    title: "Added to Cart!",
    text: `${title} has been addded to your cart.`,
    icon: "success",
  });
}

function checkout() {
  if (cartItems.length === 0) {
    Swal.fire("Empty Cart", "Add items before proceeding to the cart.", "warning");
    return;
  }

  window.location = "cart.html";
}
