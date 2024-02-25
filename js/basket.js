// basket.js

// Array to store items in the basket
let basket = [];

// Function to add item to the basket
function addToBasket(name, price) {
 const item = { name, price };
 basket.push(item);
 updateBasket();
}

// Function to remove item from the basket
function removeFromBasket(index) {
 basket.splice(index, 1);
 updateBasket();
}

// Function to update the basket
function updateBasket() {
 const basketItems = document.getElementById('basket-items');
 const basketTotal = document.getElementById('basket-total');

 // Clear existing items
 basketItems.innerHTML = '';

 // Populate basket items
 let total = 0;
 basket.forEach((item, index) => {
 const listItem = document.createElement('li');
 listItem.textContent = `${item.name} - $${item.price}`;
 const removeButton = document.createElement('button');
 removeButton.textContent = 'Remove';
 removeButton.addEventListener('click', () => {
 removeFromBasket(index);
});

listItem.appendChild(removeButton);
 basketItems.appendChild(listItem);
 total += item.price;
});

// Update total price
 basketTotal.textContent = total.toFixed(2);
}

// Function to redirect to the summary page
function redirectToSummary() {
 const basketData = encodeURIComponent(JSON.stringify(basket));
 window.location.href = `summary.html?basket=${basketData}`;
}


// Retrieve basket data from query parameter
 const urlParams = new URLSearchParams(window.location.search);
 const basketData = urlParams.get('basket');
 const basketItems = JSON.parse(decodeURIComponent(basketData));

 // Display basket items on the summary page
 const summaryDiv = document.getElementById('summary');
 basketItems.forEach(item => {
 const itemDiv = document.createElement('div');
 itemDiv.textContent = `${item.name} - $${item.price}`;
 summaryDiv.appendChild(itemDiv);
});

// Function to redirect to the checkout page
 function redirectToCheckout() {
 window.location.href = 'checkout.html';
}