// import { urlBase } from "./urls/api.js";
import { fetchCart } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";
import messaging from "./componetns/messaging.js";

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
    messaging("note", "You have no items in your cart yet", ".no-items-container");
    // cartContainer.innerHTML = "You have no items in your cart yet";
}

function createCart() {
    let total = 0;

    cartContainer.innerHTML = "";
    totalContainer.innerHTML ="";
    cart.forEach(cartItem => {
        total += parseFloat(cartItem.price);



        // console.log(cartItem.id)
        cartContainer.innerHTML += `<div class="cart-container">

                                                <h3>${cartItem.title}</h3>
                                                <div class="cart-image" style="background-image: url('${cartItem.image}')"></div>
                                                <div class="view-price-container">
                                                    <a class="view-items" href="details.html?id=${cartItem.id}">View item</a>
                                                    <p class="product-price">${cartItem.price}€</p>
                                                </div>

                                                <button class="delete-item" data-item="${cartItem.id}">Remove from cart</button>

                                    </div>`;
        
        totalContainer.innerHTML = `<p class="total">Total: ${total}€</p>`;
    });

    const deleteBtn = document.querySelectorAll(".delete-item");

    // console.log(deleteBtn)

    deleteBtn.forEach(function (clear) {
        clear.addEventListener("click", removeFromCart);
    });

    // deleteBtn.addEventListener("click", removeFromCart);
}

createCart();

function removeFromCart(event) {
    const deleteThisItem = event.target.dataset.item;

    console.log(deleteThisItem)

    // console.log(cart.findIndex(deleteBtn));

    const newCart = cart.filter(function(item) {
        // console.log(item.indexOf())
        // console.log(item)
        // console.log(item.id)
        if(deleteThisItem !== item.id) {
            // console.log(item)
            return true;
        }
    });

    // const newCart = cart.findIndex(function (item) {
    //     console.log(item)
    //     if (deleteThisItem !== item.id) {
    //         return true
    //     }
    // });

    cart = newCart;

    saveCart(cart)
    // console.log(newCart)
    // jsMenu();

    createCart();
    jsMenu();
    // console.log(newCart)
}

// function onLogout() {
//     const confirmationCheck = confirm("Do you want to logout?");

//     if(confirmationCheck) {
//         clearStorage();
//         location.href = "index.html";
//     }
// }


// saveCart(theCart);

function saveCart(cart) {
    localStorage.setItem("cartItem", JSON.stringify(cart));
}

// <button class="delete-item" data-id="${cartItem.id}" data-title="${cartItem.title}" data-price="${cartItem.price}" data-image="${cartItem.image_url}">Remove from cart</button>