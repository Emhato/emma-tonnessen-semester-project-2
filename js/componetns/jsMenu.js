// Needs fixing
import { getUserName } from "../utils/storage.js";
import logout from "./logout.js";
import { fetchCart } from "../utils/storage.js";
// import { theCart } from "./details.js";


export function jsMenu() {
    const userName = getUserName();
    const adminMenu = document.querySelector(".admin");
    const cartIndicator = fetchCart()
    const cart = document.querySelector(".cart");

    console.log(cartIndicator);
    if(userName) {
        adminMenu.innerHTML = `<div class="admin">
                                    <p>Admin</p>
                                    <button class="logout">Logout</button>
                                    <a href="edit.html">Edit</a>
                                </div>`
    }

    if(cartIndicator.length > 0) { 
        cart.innerHTML = `Cart (${cartIndicator.length})` ;
    }

    logout();
}

            //To indecate how many items are in the cart. Needs fixing. Use getToken method?
            // if(theCart.length > 0) {
            //     cart.innerHTML = `Cart (${theCart.length})`                
            // }


/* <div class="admin">
<p>Admin</p>
<a href="login.html" class="login-off">Login</a>
</div> */

