import { addMarkupToCheckout } from "./markup.js";
import { removeFromCart } from "../data/cart.js";

addMarkupToCheckout(handler);

function handler() {

    const { productId } = this.dataset;

    removeFromCart(productId);

};