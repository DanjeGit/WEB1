// js/product.js
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = getQueryParam("id");
  const container = document.getElementById("product-container");
  if (!id || !container) {
    container.innerHTML = `<div class="col-12 text-center">Product not found.</div>`;
    return;
  }

  // find product from products or featuredCollections
  const product = (products || []).find(p => p.id === id) || (featuredCollections || []).find(p => p.id === id);
  if (!product) {
    container.innerHTML = `<div class="col-12 text-center">Product not found.</div>`;
    return;
  }

  const html = `
    <div class="col-md-6">
      <img src="${product.url}" alt="${product.name}" class="img-fluid rounded" style="width:100%; max-height:520px; object-fit:cover;">
    </div>
    <div class="col-md-6">
      <h2 class="fw-bold">${product.name}</h2>
      <div class="small text-muted mb-2">Brand: ${product.brand || "Unknown"}</div>
      <h4 class="text-accent">Ksh ${product.price.toLocaleString()}</h4>
      <div class="mb-3">
        <span class="${product.stock > 0 ? 'text-success' : 'text-danger'}">${product.stock > 0 ? product.stock + ' units left' : 'Out of stock'}</span>
      </div>
      <p class="text-muted">${product.desc}</p>

      <div class="d-flex align-items-center gap-2 mb-3">
        <div class="input-group" style="width:140px;">
          <button class="btn btn-outline-light" id="qty-minus" type="button">−</button>
          <input type="number" id="qty-input" class="form-control text-center" value="1" min="1" max="${product.stock || 999}" style="width:60px;">
          <button class="btn btn-outline-light" id="qty-plus" type="button">+</button>
        </div>
      </div>

      <div>
        <button class="btn btn-accent btn-lg" id="add-to-cart-page" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
        <a href="index.html" class="btn btn-outline-light ms-2">Continue Shopping</a>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const qtyInput = document.getElementById("qty-input");
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");
  const addBtn = document.getElementById("add-to-cart-page");

  qtyMinus.addEventListener("click", () => {
    let v = parseInt(qtyInput.value, 10) || 1;
    if (v > 1) v--;
    qtyInput.value = v;
  });
  qtyPlus.addEventListener("click", () => {
    let v = parseInt(qtyInput.value, 10) || 1;
    v++;
    if (product.stock && v > product.stock) v = product.stock;
    qtyInput.value = v;
  });
  qtyInput.addEventListener("change", () => {
    let v = parseInt(qtyInput.value, 10) || 1;
    if (v < 1) v = 1;
    if (product.stock && v > product.stock) v = product.stock;
    qtyInput.value = v;
  });

  addBtn.addEventListener("click", () => {
    const qty = parseInt(qtyInput.value, 10) || 1;
    if (product.stock && qty > product.stock) return alert("Requested quantity exceeds stock.");
    // use addToCart from index.js
    addToCart(product, qty);
    // optionally redirect to cart or show toast (already shown by addToCart)
  });
});
