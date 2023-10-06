export const cart = [];

export function addToCart(productId) {
    const selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectQuantity.value);
    let matchingItem;

    cart.forEach(item => {
        if (productId === item.productId) matchingItem = item;
    });

    matchingItem ? matchingItem.quantity += quantity : cart.push({ productId, quantity });
}