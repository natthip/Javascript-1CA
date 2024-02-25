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
        productList.innerHTML = ''; 
    
        const data = await fetchData();
    
        data.forEach(product => {
            const listItem = document.createElement('li');
            listItem.classList.add('product');
            listItem.dataset.name = product.title;
            listItem.dataset.price = product.price;
    
            // Create image element
            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.title;
            listItem.appendChild(image);
    
            // Create title element
            const title = document.createElement('h2');
            title.textContent = product.title;
            listItem.appendChild(title);
    
            // Create description element
            const description = document.createElement('p');
            description.textContent = product.description;
            listItem.appendChild(description);
    
            // Create price element
            const price = document.createElement('p');
            price.textContent = `Price: $${product.price}`;
            listItem.appendChild(price);
    
            // Create "Add to Cart" button
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.addEventListener('click', function() {
                addToBasket(product.title, product.price);
            });
            listItem.appendChild(addToCartButton);
    
            productList.appendChild(listItem);
        });
    } catch (error) {
        // Handle error 
        console.error('Error displaying products:', error);
    }
}

// Call displayProducts() to initialize the page
displayProducts();






