const cart = [];
const cartModal = document.getElementById('cartModal');
const cartButton = document.getElementById('cartButton');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton'); // Botón de pago

// Mostrar/ocultar modal del carrito
cartButton.onclick = () => cartModal.style.display = 'block';
closeCart.onclick = () => cartModal.style.display = 'none';
window.onclick = event => {
    if (event.target === cartModal) cartModal.style.display = 'none';
};

// Función para agregar producto al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = event => {
        const productCard = event.target.closest('.product');
        const productId = productCard.id;
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCartDisplay();
    };
});

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Elemento del carrito
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h5>${item.name}</h5>
            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-quantity">
            <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Eliminar</button>
            <span>$${itemTotal.toFixed(2)}</span>
        `;

        // Event listener para cambiar la cantidad
        cartItem.querySelector('.cart-quantity').onchange = event => {
            const newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                item.quantity = newQuantity;
                updateCartDisplay();
            }
        };

        // Event listener para eliminar producto
        cartItem.querySelector('.remove-item').onclick = () => {
            cart.splice(cart.indexOf(item), 1);
            updateCartDisplay();
        };

        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Función para simular el pago
checkoutButton.onclick = () => {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de pagar.");
        return;
    }

    // Simulación de procesamiento de pago
    alert(`Procesando el pago de $${totalPriceElement.textContent}...`);
    
    // Vaciar el carrito y actualizar la visualización
    cart.length = 0;
    updateCartDisplay();

    // Confirmación de pago exitoso
    alert("Pago realizado con éxito. ¡Gracias por tu compra!");
    cartModal.style.display = 'none';
};

