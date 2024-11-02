let cart = [];
let cartCount = 0;

document.getElementById('cartButton').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'flex';
    displayCartItems();
});

document.querySelector('.close-cart').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

function addToCart(productName, productPrice) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
    }
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    updateTotalPrice();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="decreaseQuantity(${index})">-</button>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    updateTotalPrice();
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    displayCartItems();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        cartCount--;
    } else {
        removeFromCart(index);
        return;
    }
    document.getElementById('cartCount').innerText = cartCount;
    displayCartItems();
}

function removeFromCart(index) {
    cartCount -= cart[index].quantity;
    cart.splice(index, 1);
    document.getElementById('cartCount').innerText = cartCount;
    displayCartItems();
}

function updateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos para realizar la compra.');
        return;
    }
    alert(`Compra realizada exitosamente. Total: $${document.getElementById('totalPrice').innerText}`);
    cart = [];
    cartCount = 0;
    document.getElementById('cartCount').innerText = cartCount;
    displayCartItems();
}

// Botones "Agregar al Carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const productName = card.getAttribute('data-name');
        const productPrice = card.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

