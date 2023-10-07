export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];


function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectQuantity.value);
    let matchingItem, totalQuantity = 0

    cart.forEach(cartItem => {
        if (productId === cartItem.productId) matchingItem = cartItem;
    });

    matchingItem ? matchingItem.quantity += quantity : cart.push({ productId, quantity });

    cart.forEach(cartItem => totalQuantity += cartItem.quantity);
    document.querySelector('.cart-quantity').textContent = totalQuantity;

    saveToLocalStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach(cartItem => {
        // Removing product that matches with product id
        if (cartItem.productId !== productId) newCart.push(cartItem);
    });

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    // The replacing newCart as original cart;
    cart = newCart;

    saveToLocalStorage();
}