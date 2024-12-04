let products = [];
let filteredProducts = [];

// Fetch products from JSON file
async function fetchProducts() {
    try {
        const response = await fetch('/html/data/clothes.json');
        const data = await response.json();
        products = data.products;
        filteredProducts = [...products];
        displayProducts(filteredProducts);
        setupPriceFilter();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products in cards
function displayProducts(productsToShow) {
    const clothesContainer = document.getElementById('clothes-container');
    clothesContainer.innerHTML = '';

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';
        // Convert price from RUB to EUR (approximate conversion rate: 1 EUR = 100 RUB)
        const priceInEuro = Math.round(product.price / 100);
        
        card.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="/${product.image || 'html/images/placeholder.jpg'}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">${priceInEuro}€</div>
                </div>
            </div>
        `;
        clothesContainer.appendChild(card);
    });
}

// Setup price filter
function setupPriceFilter() {
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');

    minInput.min = minPrice;
    minInput.max = maxPrice;
    minInput.value = minPrice;

    maxInput.min = minPrice;
    maxInput.max = maxPrice;
    maxInput.value = maxPrice;

    document.getElementById('price-min').textContent = Math.round(minPrice / 100).toLocaleString() + '€';
    document.getElementById('price-max').textContent = Math.round(maxPrice / 100).toLocaleString() + '€';

    minInput.addEventListener('input', filterProducts);
    maxInput.addEventListener('input', filterProducts);
}

// Sort products by price
function sortProducts(direction) {
    filteredProducts.sort((a, b) => {
        const priceA = Math.round(a.price / 100);
        const priceB = Math.round(b.price / 100);
        return direction === 'asc' ? 
            priceA - priceB : 
            priceB - priceA;
    });
    
    displayProducts(filteredProducts);
}

// Initialize catalog
document.addEventListener('DOMContentLoaded', fetchProducts);
