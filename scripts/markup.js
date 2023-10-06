import { cart } from "../data/cart.js";
import { default as products } from "../data/products.js";

function generateMarkupMain(product) {
    return `
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
            <select class="js-quantity-selector-${product.id}">
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

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>
`;
}

function generateMarkupCheckout(matchingProduct, cartItem) {
    return `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(matchingProduct.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-1">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-1">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-1">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
`;

}

export function addMarkupToPage(handler) {
    let productsHTML = ''
    products.forEach(product => productsHTML += generateMarkupMain(product));

    const productsGrid = document.querySelector('.js-products-grid');
    productsGrid.insertAdjacentHTML('afterbegin', productsHTML);

    const addToCartBtn = document.querySelectorAll('.js-add-to-cart');
    // Event Listener
    addToCartBtn.forEach(btn => btn.addEventListener('click', handler));
}


export function addMarkupToCheckout() {
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
}