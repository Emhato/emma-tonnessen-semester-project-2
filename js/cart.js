import { urlBase } from "./urls/api.js";
import { fetchCart } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";

jsMenu();
// import { deleteButton } from "./componetns/deleteButton.js";

// const deleteBtn = document.querySelector(".delete-btn");
// deleteButton();

// To delete see js2 ma2


const cart = fetchCart();

const cartContainer = document.querySelector(".items-container");
const totalContainer = document.querySelector(".toltal-container");

console.log(cart)
if(cart.length === 0) {
    cartContainer.innerHTML = "You have no items in your cart yet";
}

function createCart() {
    let total = 0;
    cart.forEach(cartItem => {
        total += parseFloat(cartItem.price)
        cartContainer.innerHTML += `<div>
                                        <div class="cart-image" style="background-image: url('${cartItem.image}')"></div>
                                       <h3>${cartItem.title}</h3>
                                       <p>${cartItem.price}</p>
                                       <button class="delete-btn">Delete from cart</button>
                                    </div>`;
        
        totalContainer.innerHTML = `Total: ${total}`;
    });
}

createCart();