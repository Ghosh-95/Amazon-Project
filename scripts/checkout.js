import { generateMarkupCheckout } from "./markup.js";
import { removeFromCart, cart, updateCartQuantity as countCartItem, newCartQuantity } from "../data/cart.js";
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

    const updateButtons = document.querySelectorAll('.js-update-quantity-link');
    updateButtons.forEach(btn => btn.addEventListener('click', function () {

        const { productId } = this.dataset;

        const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        itemContainer.classList.add('is-editing-quantity');

        document.querySelectorAll(`.js-save-quantity-link-${productId}`).forEach(link => link.addEventListener('click', function (e) {
            itemContainer.classList.remove('is-editing-quantity');

            const inputQuantity = document.querySelector(`#input-quantity-${productId}`);
            const newQuantity = +inputQuantity.value;
            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

            if (newQuantity <= 0 || newQuantity >= 100) {
                alert('Please add item between 1 to 99');
                return;
            }

            newCartQuantity(productId, newQuantity);
            quantityLabel.textContent = newQuantity;
            countCartItem('.js-item-quantity');

        }))

    }))
}

addMarkupToCheckout(handler);

countCartItem('.js-item-quantity');

function handler() {
    const { productId } = this.dataset;
    removeFromCart(productId);
    countCartItem('.js-item-quantity');
};

// window.addEventListener('keydown', function (e) {
//     console.log(e.key)
// })