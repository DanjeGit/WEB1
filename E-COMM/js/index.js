// Define cart variables globally
const cartItems = [];
let cartTable, cartTotal, cartCount; // Declare DOM elements globally

// Define functions globally
function updateCart() {
  if (!cartTable || !cartTotal || !cartCount) return; // Skip if elements aren't available

  cartTable.innerHTML = ''; // Clear the table
  let total = 0;

  cartItems.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>Ksh ${item.price}</td>
      <td>
        <input type="number" class="form-control text-center quantity-input" value="${item.quantity}" min="1" data-index="${index}">
      </td>
      <td>Ksh ${item.price * item.quantity}</td>
      <td>
        <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button>
      </td>
    `;
    cartTable.appendChild(row);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Ksh ${total}`;
  cartCount.textContent = cartItems.length; // Update cart count

  // Save updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}



document.addEventListener('DOMContentLoaded', function () {
  // Initialize global variables
  cartTable = document.getElementById('cart-items');
  cartTotal = document.getElementById('cart-total');
  cartCount = document.getElementById('cart-count');

  // Attach event listeners to all "Add to Cart" buttons
  const buttons = document.querySelectorAll('.btn-accent[data-name][data-price]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const product = {
        name: btn.getAttribute('data-name'),
        price: parseInt(btn.getAttribute('data-price'), 10),
      };
      addToCart(product);
    });
  });

  // Remove product from cart
  cartTable?.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.getAttribute('data-index');
      cartItems.splice(index, 1);
      updateCart();
    }
  });

  // Update quantity
  cartTable?.addEventListener('input', function (e) {
    if (e.target.classList.contains('quantity-input')) {
      const index = e.target.getAttribute('data-index');
      const newQuantity = parseInt(e.target.value, 10);
      if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        updateCart();
      }
    }
  });
});

function clickMe(){
  let message= " Hello there";
  alert(message)
}
function addToCart(product) {
  const existingProduct = cartItems.find(item => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  updateCart();
}

