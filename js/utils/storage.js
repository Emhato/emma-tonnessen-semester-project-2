export function fetchCart() {
    const cart = localStorage.getItem("cartItem");

    if(!cart) {
        return[];
    } else {
        return JSON.parse(cart);
    }
}

// favorites = cart
// favorite = cartItem