// js/index.js
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
  // wire up dynamic buttons after Victory.js created markup
  wireProductButtons();
  setupSearch();
  displayCartItems();
  handleCheckout();
});

// ====================== USER SESSION ======================

// Update nav to show user's name or login
function updateUserNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.textContent.trim().toLowerCase() === "login" || link.href?.includes("auth.html")) {
      // remove previous listener to avoid duplicates
      const clone = link.cloneNode(true);
      link.parentNode.replaceChild(clone, link);
    }
  });

  // re-query
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.textContent.trim().toLowerCase() === "login" || link.href?.includes("auth.html")) {
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
    updateUserNav();
    window.location.href = "index.html";
  }
}

// Save user after signup/login
function setUserSession(name, email) {
  user = { name, email };
  localStorage.setItem("user", JSON.stringify(user));
  updateUserNav();
}

// ====================== CART FUNCTIONS ======================
function addToCart(product = {}, quantity = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
    if (product.stock && existing.quantity > product.stock) existing.quantity = product.stock;
  } else {
    cart.push({ ...product, quantity });
  }
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
      <td><button class="btn btn-danger btn-sm remove-btn" data-index="${i}"><i class="bi bi-trash"></i></button></td>`;
    tbody.appendChild(tr);
  });

  totalEl.textContent = `Ksh ${total.toLocaleString()}`;

  document.querySelectorAll('[data-index]').forEach(input => {
    input.addEventListener("change", e => {
      const idx = parseInt(e.target.dataset.index, 10);
      const newVal = parseInt(e.target.value, 10);
      if (isNaN(newVal) || newVal < 1) {
        e.target.value = cart[idx].quantity;
        return;
      }
      cart[idx].quantity = newVal;
      saveCart();
      displayCartItems();
      updateCartCount();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
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

    // For real production: replace with secure server checkout integration (Stripe / PayPal)
    // Here we simulate successful checkout
    alert("Payment simulated. Thank you.");
    cart = [];
    saveCart();
    displayCartItems();
    updateCartCount();
  });
}

// ====================== DYNAMIC BUTTONS + SEARCH ======================
function wireProductButtons() {
  // Delegate add-to-cart clicks (works for dynamically created elements)
  document.body.addEventListener("click", function (e) {
    const addBtn = e.target.closest(".add-to-cart");
    if (addBtn) {
      const id = addBtn.dataset.id;
      const product = products.find(p => p.id === id) || featuredCollections.find(p => p.id === id);
      if (!product) return showToast("Product not found.");
      if (product.stock === 0) return alert("This product is out of stock.");
      addToCart(product, 1);
      return;
    }

    const viewBtn = e.target.closest(".view-product") || e.target.closest(".product-thumb") || e.target.closest(".product-card");
    if (viewBtn) {
      const id = viewBtn.dataset.id || viewBtn.closest?.('[data-id]')?.dataset?.id;
      if (!id) return;
      window.location.href = `product.html?id=${encodeURIComponent(id)}`;
    }
  });
}

// SEARCH overlay and logic
function setupSearch() {
  const searchToggle = document.getElementById("searchToggle");
  if (!searchToggle) return;

  searchToggle.addEventListener("click", (e) => {
    e.preventDefault();
    // If already exists, focus input
    let overlay = document.getElementById("search-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "search-overlay";
      overlay.style = `
        position: fixed; inset: 0; background: rgba(4,8,16,0.9); z-index: 1050;
        display:flex; align-items:start; justify-content:center; padding: 60px 20px;
      `;
      overlay.innerHTML = `
        <div style="max-width:900px; width:100%">
          <div class="input-group mb-3">
            <input id="site-search-input" type="search" class="form-control form-control-lg search-input" placeholder="Search products, brands..." aria-label="Search">
            <button id="close-search" class="btn btn-outline-light">Close</button>
          </div>
          <div id="search-results" class="row g-3"></div>
        </div>
      `;
      document.body.appendChild(overlay);
      document.getElementById("close-search").addEventListener("click", () => overlay.remove());
      const input = document.getElementById("site-search-input");
      input.addEventListener("input", handleSearchInput);
      input.focus();
    } else {
      const input = document.getElementById("site-search-input");
      input?.focus();
    }
  });

  function handleSearchInput(e) {
    const q = e.target.value.trim().toLowerCase();
    const resultsEl = document.getElementById("search-results");
    resultsEl.innerHTML = ""; 
    if (!q) return;
    const all = [...products, ...featuredCollections];
    const matches = all.filter(p => {
      return p.name.toLowerCase().includes(q) ||
             (p.brand && p.brand.toLowerCase().includes(q)) ||
             (p.desc && p.desc.toLowerCase().includes(q));
    });

    if (matches.length === 0) {
      resultsEl.innerHTML = `<div class="col-12 text-center text-muted">No results for "${q}"</div>`;
      return;
    }

    resultsEl.innerHTML = matches.map(p => `
      <div class="col-12 col-md-6">
        <div class="product-card d-flex gap-3 align-items-center">
          <img src="${p.url}" style="width:96px; height:72px; object-fit:cover; border-radius:8px;">
          <div>
            <h6 style="margin:0">${p.name}</h6>
            <div class="small text-muted">${p.brand} • Ksh ${p.price}</div>
            <div class="mt-2">
              <button class="btn btn-sm btn-outline-light view-product" data-id="${p.id}">View</button>
              <button class="btn btn-sm btn-accent add-to-cart" data-id="${p.id}">Add</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}
