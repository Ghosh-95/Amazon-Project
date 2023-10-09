import { addToCart, updateCartQuantity } from "../data/cart.js";
import { generateMarkupMain } from "./markup.js";
import products from "../data/products.js";

function addMarkupToPage(handler) {
    let productsHTML = ''
    products.forEach(product => productsHTML += generateMarkupMain(product));

    const productsGrid = document.querySelector('.js-products-grid');
    productsGrid.insertAdjacentHTML('afterbegin', productsHTML);

    const addToCartBtn = document.querySelectorAll('.js-add-to-cart');
    // Event Listener
    addToCartBtn.forEach(btn => btn.addEventListener('click', handler));
}

addMarkupToPage(handler);

updateCartQuantity('.cart-quantity');

function viewAddedMessage(productId) {
    let addedMessageTimeouts = {};

    const addedMessageId = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessageId.classList.add('added-to-cart-visible');

    const previousTimeoutId = addedMessageTimeouts[productId];

    if (previousTimeoutId) clearTimeout(previousTimeoutId);
    const timeoutId = setTimeout(() => addedMessageId.classList.remove('added-to-cart-visible'), 2000)

    addedMessageTimeouts[productId] = timeoutId;
}

function handler() {

    const { productId } = this.dataset;

    addToCart(productId);

    updateCartQuantity('.cart-quantity');

    viewAddedMessage(productId);
}

