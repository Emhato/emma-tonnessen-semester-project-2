import { fetchCart } from "./utils/storage.js";

const cart = fetchCart();

const cartContainer = document.querySelector(".items-container");
const totalContainer = document.querySelector(".toltal-container");

console.log(cart)
if(cart.length === 0) {
    cartContainer.innerHTML = "You have no items in your cart yet";
}

function createCart() {
    cart.forEach(cartItem => {
        cartContainer.innerHTML += `<div>
                                       <h3>${cartItem.title}</h3>
                                       <p>${cartItem.price}</p>
                                    </div>`
        
        totalContainer.innerHTML += ``
    });
}

createCart();