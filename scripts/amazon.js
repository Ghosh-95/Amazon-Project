import { addToCart, updateCartQuantity } from "../data/cart.js";
import { addMarkupToPage } from "./markup.js";

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

