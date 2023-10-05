import { default as products } from "../data/products.js";
import cart from "../data/cart.js";

let productsHTML = '';

products.forEach(product => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">${product.name}</div>

            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${(product.rating.stars) * 10}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)};
            </div>

            <div class="product-quantity-container">
                <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

const productsGrid = document.querySelector('.js-products-grid');

productsGrid.insertAdjacentHTML('afterbegin', productsHTML);

const addToCartBtn = document.querySelectorAll('.js-add-to-cart');

addToCartBtn.forEach(btn => btn.addEventListener('click', function () {

    const productId = this.dataset.productId;
    let matchingItem, totalQuantity = 0;

    cart.forEach(item => {
        if (productId === item.productId) matchingItem = item;
    });

    matchingItem ? matchingItem.quantity += 1 : cart.push({ productId: productId, quantity: 1 });

    cart.forEach(item => totalQuantity += item.quantity);
    document.querySelector('.cart-quantity').textContent = totalQuantity;

}));
