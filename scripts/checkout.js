import { generateMarkupCheckout } from "./markup.js";
import { removeFromCart, cart, updateCartQuantity as countCartItem } from "../data/cart.js";
import products from "../data/products.js";

function addMarkupToCheckout(handler) {
    let cartSummeryHTML = '';
    cart.forEach(cartItem => {

        const productId = cartItem.productId;
        let matchingProduct;

        products.forEach(product => {
            if (product.id === productId) matchingProduct = product;
        });

        cartSummeryHTML += generateMarkupCheckout(matchingProduct, cartItem)
    });

    const orderSummery = document.querySelector('.js-order-summery');
    orderSummery.insertAdjacentHTML('afterbegin', cartSummeryHTML);

    const deleteButtons = document.querySelectorAll('.js-delete-link');
    deleteButtons.forEach(btn => btn.addEventListener('click', handler));
}

addMarkupToCheckout(handler);

countCartItem('.js-item-quantity');

function handler() {
    const { productId } = this.dataset;
    removeFromCart(productId);
    countCartItem('.js-item-quantity');
};
