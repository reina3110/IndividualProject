document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: 'Sleek Laptop', price: 1200, image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxspXZvW8Az3HQG1SpS1bX003P8CcqjNpF5A&s' },
    { id: 2, name: 'Wireless Headphones', price: 250, image: 'https://www.montblanc.com/variants/images/46353151655575960/A/w2500.jpg' },
    { id: 3, name: 'Smartwatch', price: 350, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s10-case-unselect-gallery-1-202503_FMT_WHH?wid=752&hei=720&fmt=p-jpg&qlt=80&.v=T1poMzZuRzBxQ1RzQmhMUHprUE5LZHlVRllKam5abHNZRGludXlMbytKNHlidkR0R3NjTWwrQVNiZ3I2RERPclovcWdSWUQxempSa2dIVnhsNHVhN3ZXdlJRYjdSZWJHVUh4aFVDb0hhVVcwcHBldHBjSVk3TndkU25NUENJakg' },
    { id: 4, name: 'Mechanical Keyboard', price: 150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkBySdo000X_RmHyNZdO51kfXqbt0Qg3Tpg&s' },
    { id: 5, name: 'Ergonomic Mouse', price: 75, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUbbk3nIINcQzfB0L_eHyQ1F0aEorNAr8jg&s' },
    { id: 6, name: 'External SSD', price: 180, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTno77KkK_LIWUxyXYjhMpSTEjWX3MYW-3pDA&s' },
    { id: 7, name: 'LED Monitor', price: 450, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhzrLNfk2N0HhGRF3neKTJSPV6hFrKu5XskA&s' },
    { id: 8, name: 'Desktop Stand', price: 60, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEvQN0r0z2-brr-qqyhBcljRAFREyLraDzgg&s' }
  ];

  let cart = [];

  const pageSections = {
    home: document.getElementById('home-page'),
    products: document.getElementById('products-page'),
    cart: document.getElementById('cart-page'),
    'shipping-successful': document.getElementById('shipping-successful-page')
  };

  const productGrid = document.getElementById('product-grid');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  // Page Navigation
  window.showPage = function (pageId) {
    for (let page in pageSections) {
      pageSections[page].classList.add('hidden');
    }
    pageSections[pageId].classList.remove('hidden');
  };

  // Render Products
  function renderProducts() {
    productGrid.innerHTML = products.map(product => `
      <div class="bg-gray-100 rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover object-center">
        <div class="p-6">
          <h5 class="text-xl font-semibold mb-2 text-gray-900">${product.name}</h5>
          <p class="text-orange-500 text-lg font-bold mb-4">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart-btn bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-full transition-colors" 
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');

    // Add Event Listeners to Buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        const productToAdd = products.find(p => p.id === productId);
        addToCart(productToAdd);
      });
    });
  }

  // Add Product to Cart
  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderCart();
  }

  // Render Cart
  function renderCart() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
      cartTotal.textContent = '$0.00';
      cartCount.textContent = '0';
      cartCount.classList.remove('scale-100');
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md object-cover">
          <div class="flex-grow">
            <p class="font-semibold text-gray-900">${item.name}</p>
            <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
          </div>
          <span class="font-bold text-lg text-orange-500">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');

      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;

      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.classList.add('scale-100');
    }
  }

  // Initial Render
  renderProducts();
  renderCart();
});