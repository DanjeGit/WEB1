// ====================== GLOBAL CART HANDLER ======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let user = JSON.parse(localStorage.getItem("user")) || null;

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update the cart icon count globally
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem("cartCount", count);
  document.querySelectorAll("#cart-count").forEach(el => (el.textContent = count));
}

// Load cart 
document.addEventListener("DOMContentLoaded", () => {
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  if (savedCart) cart = savedCart;
  updateCartCount();
  updateUserNav();
});

// ====================== USER SESSION ======================

// Update nav to show user's name or login
function updateUserNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.textContent.trim().toLowerCase() === "login") {
      if (user) {
        link.innerHTML = `<i class="bi bi-person-circle me-1"></i>Hi, ${user.name}`;
        link.href = "#";
        link.addEventListener("click", e => {
          e.preventDefault();
          showLogoutOption();
        });
      } else {
        link.addEventListener("click", e => {
          e.preventDefault();
          window.location.href = "auth.html";
        });
      }
    }
  });
}

// Show logout confirm dialog
function showLogoutOption() {
  if (confirm("Do you want to log out?")) {
    localStorage.removeItem("user");
    user = null;
    alert("You’ve been logged out.");
    window.location.href = "index2.html";
  }
}

// Save user after signup/login
function setUserSession(name, email) {
  user = { name, email };
  localStorage.setItem("user", JSON.stringify(user));
  updateUserNav();
}

// ====================== CART FUNCTIONS ======================
function addToCart(product = {}) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart();
  updateCartCount();
  showToast(`${product.name} added to your cart!`);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast-msg position-fixed bottom-0 end-0 mb-3 me-3 p-3 bg-accent text-white rounded shadow";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ====================== CART PAGE ======================
function displayCartItems() {
  const tbody = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (cart.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4">
          <h5>Your cart is empty.</h5>
          <a href="index.html" class="btn btn-accent mt-3">Return to Shop</a>
        </td>
      </tr>`;
    totalEl.textContent = "Ksh 0";
    return;
  }

  let total = 0;
  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>Ksh ${item.price.toLocaleString()}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" data-index="${i}" class="form-control form-control-sm text-center w-50 mx-auto">
      </td>
      <td>Ksh ${itemTotal.toLocaleString()}</td>
      <td><button class="btn btn-danger btn-sm" data-remove="${i}"><i class="bi bi-trash"></i></button></td>`;
    tbody.appendChild(tr);
  });

  totalEl.textContent = `Ksh ${total.toLocaleString()}`;

  document.querySelectorAll('[data-index]').forEach(input => {
    input.addEventListener("change", e => {
      const idx = e.target.dataset.index;
      cart[idx].quantity = parseInt(e.target.value);
      saveCart();
      displayCartItems();
      updateCartCount();
    });
  });

  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.remove;
      cart.splice(idx, 1);
      saveCart();
      displayCartItems();
      updateCartCount();
    });
  });
}

// ====================== CHECKOUT ======================
function handleCheckout() {
  const btn = document.getElementById("checkout-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (cart.length === 0) return alert("Your cart is empty.");

    fetch("https://example-payment-api.com/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, user }),
    })
      .then(res => res.json())
      .then(() => {
        alert("Payment successful! Thank you.");
        cart = [];
        saveCart();
        displayCartItems();
        updateCartCount();
      })
      .catch(() => alert("Payment failed. Please try again."));
  });
}

// ====================== INIT ======================
document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  handleCheckout();

  // Handle Add to Cart buttons dynamically
  document.querySelectorAll(".product-card button").forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === "add to cart") {
      btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");
        const name = card.querySelector("h5").textContent.trim();
        const priceText = card.querySelector(".price")?.textContent.trim() || "Ksh 0";
        const price = parseFloat(priceText.replace(/[^0-9.]/g, "")); 
        addToCart({ name, price });
      });
    }
  });
});
// ====================== FLASH SALE TIMER ======================
  function startFlashSaleTimer() {
    const timerElement = document.getElementById('flashsale-timer');
    let hours = 3;
    let minutes =59;
    let seconds = 59;

    function updateTimer() {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
      if (minutes < 0) {
        minutes = 59;
        hours--;
      }
      if (hours < 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
      }

      timerElement.textContent = `${hours}h : ${minutes}m : ${seconds}s`;
    }

    setInterval(updateTimer, 1000);
  }

  document.addEventListener('DOMContentLoaded', startFlashSaleTimer);
