function getCart() {
  return JSON.parse(localStorage.getItem("uppieCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("uppieCart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart() {
  const cart = getCart();

  const product = {
    id: "uppiebrush-001",
    name: "UppieBrush",
    price: 24.99,
    quantity: 1
  };

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }

  saveCart(cart);
  alert("UppieBrush added to cart.");
}

function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountElements = document.querySelectorAll("#cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = totalCount;
  });
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart
    .map((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      return `
        <div class="card" style="margin-bottom: 16px;">
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <p><strong>Subtotal: $${subtotal.toFixed(2)}</strong></p>
        </div>
      `;
    })
    .join("");

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function clearCart() {
  localStorage.removeItem("uppieCart");
  renderCart();
  updateCartCount();
}

function setupFAQ() {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const isOpen = answer.style.display === "block";

      document.querySelectorAll(".faq-answer").forEach((item) => {
        item.style.display = "none";
      });

      answer.style.display = isOpen ? "none" : "block";
    });
  });
}

function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
}

function setupCheckoutForm() {
  const checkoutForm = document.getElementById("checkout-form");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Demo payment successful.");
      localStorage.removeItem("uppieCart");
      updateCartCount();
      window.location.href = "index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  setupFAQ();
  setupMobileMenu();
  setupCheckoutForm();
});