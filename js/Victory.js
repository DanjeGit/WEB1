// js/Victory.js
let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
  <div class="col-6 col-sm-6 col-md-3">
    <div class="product-card text-center p-3 h-100" data-id="${product.id}">
      <img src="${product.url}" class="img-fluid rounded mb-3 product-thumb" alt="${product.name}">
      <h5 class="product-title">${product.name}</h5>
      <p class="small text-muted">${product.desc}</p>
      <p class="price">Ksh ${product.price}</p>
      <div class="d-flex justify-content-center gap-2 mt-2">
        <button class="btn btn-outline-light btn-sm view-product" data-id="${product.id}">View</button>
        <button class="btn btn-accent btn-sm add-to-cart" data-id="${product.id}" data-price="${product.price}">Add to Cart</button>
      </div>
    </div>
  </div>
  `;
});
document.querySelector('.products-items').innerHTML = productsHTML;

// FEATURED COLLECTIONS SECTIONS
let FeaturedCollectionsHTML = '';
featuredCollections.forEach((item) => {
  FeaturedCollectionsHTML += `
    <div class="col-md-4">
      <div class="product-card text-center p-3 h-100" data-id="${item.id}">
        <img src="${item.url}" class="img-fluid rounded mb-3 product-thumb" alt="${item.name}">
        <h5>${item.name}</h5>
        <p class="small text-muted">${item.desc}</p>
        <p class="price">Ksh ${item.price}</p>
        <div class="d-flex justify-content-center gap-2 mt-2">
          <button class="btn btn-outline-light btn-sm view-product" data-id="${item.id}">View</button>
          <button class="btn btn-accent btn-sm add-to-cart" data-id="${item.id}" data-price="${item.price}">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
});
document.querySelector('.featured-collections').innerHTML = FeaturedCollectionsHTML;
