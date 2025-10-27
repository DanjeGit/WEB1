let productsHTML= '';
products.forEach((product) => {
productsHTML += `


  <div class="col-6 col-sm-6 col-md-3">
        <div class="product-card text-center p-3 h-100">
          <img src="${product.url}" class="img-fluid rounded mb-3" alt="Sports Wear">
          <h5>${product.pName}</h5>
          <p class="small text-muted">${product.desc}</p>
          <button class="btn btn-accent btn-sm" data-name="${product.Pname}" data-price="${product.price}">Add to Cart</button>
          <p class="price">Ksh ${product.price}</p>
        </div>
    </div>

      `
});
document.querySelector('.products-items').innerHTML = productsHTML;

// FEATURED COLLECTIONS SECTIONS
let FeaturedCollectionsHTML='';
featuredCollections.forEach((item) => {
FeaturedCollectionsHTML += `
    <div class="col-md-4">
          <div class="product-card text-center p-3 h-100">
            <img src="${item.url}" class="img-fluid rounded mb-3" alt="${item.pName}">
            <h5>${item.pName}</h5>
            <p class="small text-muted">${item.desc}</p>
             <button class="btn btn-accent btn-sm" data-name="Comfortable boots" data-price="${item.price}">
                        Add to Cart
                  </button>
                   <p class="price">Ksh ${item.price}</p>

          </div>
        </div>
  `;
});
document.querySelector('.featured-collections').innerHTML = FeaturedCollectionsHTML;