// API
async function fetchData() {
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to display products
async function displayProducts() {
    try {
        const productList = document.getElementById('productList');
        const data = await fetchData();

        // Build HTML string for all products
        const productsHTML = data.map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <button class="view-more-btn" data-id="${product.id}">View More Details</button>
            </div>
        `).join('');

        productList.innerHTML = productsHTML;

        const viewMoreButtons = document.querySelectorAll('.view-more-btn');
        viewMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                window.location.href = `product.html?id=${productId}`;
            });
        });
    } catch (error) {
        // Handle error
        console.error('Error displaying products:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayProducts);

