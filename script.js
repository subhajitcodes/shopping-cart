document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product-1", price: 29.99 },
    { id: 2, name: "Product-2", price: 293.9 },
    { id: 3, name: "Product-3", price: 39.63 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productlist = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");

  renderCart();
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${product.name} - $${product.price}</span>
    <button data-id="${product.id}">Add to Cart</button>`;
    productlist.appendChild(productDiv);
  });

  productlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveInCart();
    renderCart();
  }
  function saveInCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  //remove element from cart

  function removeFromCart(id) {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    saveInCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((e) => {
        totalPrice += e.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("productInCart");
        cartItem.innerHTML = `
        <span>${e.name} - $${e.price}</span>
        <button data-id="${e.id}">Remove</button>
      `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    localStorage.removeItem("cart");
    alert("Checkout Successfully");
    renderCart();
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const Id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(Id);
    }
  });
});
