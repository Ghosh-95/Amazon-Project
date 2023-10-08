import { addMarkupToCheckout } from "./markup.js";
import { removeFromCart, updateCartQuantity as countCartItem } from "../data/cart.js";

addMarkupToCheckout(handler);

countCartItem('.js-item-quantity');

function handler() {
    const { productId } = this.dataset;
    removeFromCart(productId);
    countCartItem('.js-item-quantity');
};
