// Add Product
document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission


    // Collects product data from the form inputs
    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value), // Converts price input to a floating-point number
        category: document.getElementById('category').value,
        image_url: document.getElementById('image_url').value,
       
    };

    // Sends a POST request to add a new product
    const response = await fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Specifies JSON as the content type
        body: JSON.stringify(product) // Converts product object to JSON string for sending
    });

    // Handles the response from the server
    if (response.ok) {
        alert('Product added successfully!'); // Notifies the user on success
        document.getElementById('add-product-form').reset(); // Clears the form inputs
    } else {
        alert('Failed to add product.'); // Notifies the user on failure
    }
});

// Update Product
document.getElementById('update-product-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Gets the product ID from the update form
    const productId = document.getElementById('update-id').value;

    // Collects updated product data from the form inputs
    const product = {
        name: document.getElementById('update-name').value,
        description: document.getElementById('update-description').value,
        price: parseFloat(document.getElementById('update-price').value),
        category: document.getElementById('update-category').value,
        image_url: document.getElementById('update-image_url').value,
        
    };

    // Sends a PUT request to update the product with the specified ID
    const response = await fetch(`/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, // Specifies JSON as the content type
        body: JSON.stringify(product) // Converts updated product object to JSON string for sending
    });

    // Handles the response from the server
    if (response.ok) {
        alert('Product updated successfully!'); // Notifies the user on success
        document.getElementById('update-product-form').reset(); // Clears the form inputs
    } else {
        alert('Failed to update product.'); // Notifies the user on failure
    }
});

// Delete Product
document.getElementById('delete-product-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Gets the product ID to be deleted
    const productId = document.getElementById('delete-id').value;

    // Sends a DELETE request to remove the product with the specified ID
    const response = await fetch(`/products/${productId}`, {
        method: 'DELETE'
    });

    // Handles the response from the server
    if (response.ok) {
        alert('Product deleted successfully!'); // Notifies the user on success
        document.getElementById('delete-product-form').reset(); // Clears the form input
    } else {
        alert('Failed to delete product.'); // Notifies the user on failure
    }
});
