import { urlBase } from "./urls/api.js";
import { fetchCart } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";

jsMenu();
// import { deleteButton } from "./componetns/deleteButton.js";

// const deleteBtn = document.querySelector(".delete-btn");
// deleteButton();

// To delete see js2 ma2


let cart = fetchCart();

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

        console.log(cartItem.id)
        cartContainer.innerHTML += `<li>
                                        <span>
                                            <div class="cart-image" style="background-image: url('${cartItem.image}')"></div>
                                            <h3>${cartItem.title}</h3>
                                            <p>${cartItem.price}</p>
                                       </span>
                                       <button class="delete-item" data-item="${cartItem.id}">Remove from cart</button>
                                    </li>`;
        
        totalContainer.innerHTML = `Total: ${total}`;
    });

    const deleteBtn = document.querySelectorAll(".delete-item");

    console.log(deleteBtn)

    deleteBtn.forEach(function (clear) {
        clear.addEventListener("click", removeFromCart);
    });

    // deleteBtn.addEventListener("click", removeFromCart);
}

createCart();

function removeFromCart(event) {
    const deleteThisItem = event.target.dataset.item;

    console.log(deleteThisItem)

    const newCart = cart.filter(function(item) {
        console.log(item)
        console.log(item.id)
        if(deleteThisItem !== item.id) {
            // console.log(item)
            return true;
        }
    });

    cart = newCart;

    createCart();
}

// <button class="delete-item" data-id="${cartItem.id}" data-title="${cartItem.title}" data-price="${cartItem.price}" data-image="${cartItem.image_url}">Remove from cart</button>