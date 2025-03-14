async function fetchProducts() {
    try {
        const response = await fetch('/products');
        const products = await response.json();

        const container = document.querySelector('.product-container'); // Select the existing container

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.setAttribute('id', 'product-cards'); // Keep the existing ID structure

            productCard.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <div id="text">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <a href="cart.html">Add to Cart</a>
                </div>
            `;

            container.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Ensure script runs after DOM is loaded
document.addEventListener("DOMContentLoaded", fetchProducts);
