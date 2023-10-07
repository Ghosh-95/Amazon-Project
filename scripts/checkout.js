import { addMarkupToCheckout } from "./markup.js";
import { removeFromCart, cart } from "../data/cart.js";

addMarkupToCheckout(handler);

function countCartItem() {
    const itemQuantity = document.querySelector('.js-item-quantity');
    let totalQuantity = 0;
    cart.forEach(cartItem => totalQuantity += cartItem.quantity);
    itemQuantity.textContent = `${totalQuantity} items`;
}
countCartItem();

function handler() {
    const { productId } = this.dataset;
    removeFromCart(productId);
    countCartItem();
};
