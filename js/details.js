import { urlBase } from "./urls/api.js";
import { fetchCart } from "./utils/storage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");


// Check what this means!
if(!id) {
    document.location.href = "/";
}
// 

const detailsUrl = urlBase + "/products/" + id;

// Remove when finished!
console.log(detailsUrl);
// 

(async function() {
    try {
        const response = await fetch(detailsUrl);
        const details = await response.json();

        document.title = details.title + ", The Green Tree";

        const detailsContainer = document.querySelector(".details-container");

        detailsContainer.innerHTML = `<div class="wrapper">
                                        <div class="details-image" style="background-image: url('${urlBase + details.image.url}')"></div>
                                        <h1>${details.title}</h1>
                                        <h4>${details.price}</h4>
                                        <p>${details.description}</p>
                                        <button class="add-item" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-image="${urlBase + details.image.url}">Add Item</button>
                                    </div>`

        
        const addItem = document.querySelector(".add-item");

        addItem.addEventListener("click", addItemOnClick);

        function addItemOnClick() {
            const id = this.dataset.id;
            const title = this.dataset.title;
            const price = this.dataset.price;
            const image = this.dataset.image;

            // console.log(id)
            // console.log(title)
            // console.log(price)
            // console.log(image)

            const theCart = fetchCart();

            console.log(theCart)

            const existCheck = theCart.find(function(exist) {
                return exist.id === id;
            });

            if(!existCheck) {
                const article = {id, title, price, image};

                theCart.push(article);
    
                saveCart(theCart);
            } else {
                const filteringCart = theCart.filter(function(exist) {
                    return exist.id !== id;
                });
                saveCart(filteringCart);
            }
        }

        function saveCart(cart) {
            localStorage.setItem("cartItem", JSON.stringify(cart));
        }

        
    } catch (error) {
        console.log(error)
    }


})();