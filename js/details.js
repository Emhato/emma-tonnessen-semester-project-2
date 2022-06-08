import { urlBase } from "./urls/api.js";
import { fetchCart } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./componetns/deleteButton.js"
import messaging from "./componetns/messaging.js";
// import { cartIndication } from "./componetns/cartIndication.js"

const token = getToken();
const form = document.querySelector(".edit-product");

// console.log(editForm)

if (!token) {
    form.style.display = "none";
}

jsMenu();

// console.log(fetchCart)
// cartIndication();

// export const theCart = fetchCart();

// cartIndication();
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");


// Check what this means!
if(!id) {
    document.location.href = "/";
}
// 

const detailsUrl = urlBase + "/api/plants/" + id;

// Remove when finished!
console.log(detailsUrl);
// 

(async function() {
    try {
        const response = await fetch(detailsUrl);
        const details = await response.json();
        const plant = details.data

        document.title = plant.attributes.title + ", The Green Tree";

        const detailsContainer = document.querySelector(".details-container");

        console.log(plant.attributes.title)

        detailsContainer.innerHTML = `<div class="details-wrapper">
                                        <div class="image-wrapper">
                                            <h1>${plant.attributes.title}</h1>
                                            <div class="details-image" style="background-image: url('${plant.attributes.image_url}')"></div>
                                            <p class="product-price detail-price">${plant.attributes.price}€</p>
                                        </div>
                                        <div class="description-wrapper">
                                            <p class="product-description">${plant.attributes.description}</p>
                                            <button class="add-item" data-id="${plant.id}" data-title="${plant.attributes.title}" data-price="${plant.attributes.price}" data-image="${plant.attributes.image_url}">Add Item</button>
                                        </div>
                                        
                                    </div>`

        
        const addItem = document.querySelector(".add-item");

        addItem.addEventListener("click", addItemOnClick);

        // const cart = document.querySelector(".cart");

        function addItemOnClick() {
            // jsMenu();

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

           
            const article = {id, title, price, image};

            theCart.push(article);
    
            saveCart(theCart);

            jsMenu();

            //To indecate how many items are in the cart. Needs fixing. Use getToken method?
            // if(theCart.length > 0) {
            //     cart.innerHTML = `Cart (${theCart.length})`                
            // }


            
            // const filteringCart = theCart.filter(function(exist) {
            //     return exist.id !== id;
            // });
            // saveCart(filteringCart);
            
        }

        function saveCart(cart) {
            localStorage.setItem("cartItem", JSON.stringify(cart));
        }

        
    } catch (error) {
        console.log(error)
        messaging("error", "There have been an error, sorry for the inconvinience!", ".details-container");

    }


})();





// edit products

const productUrl = urlBase + "/api/plants/" + id;

// const form = document.querySelector(".edit-product");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector ("#image-url");
const featured = document.querySelector("#featured");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
// const loading = document.querySelector(".loading");

(async function () {
    try {
        const response = await fetch(productUrl);
        const rawData = await response.json();
        const details = rawData.data


        console.log(details)

        title.value = details.attributes.title;
        price.value = details.attributes.price;
        description.value = details.attributes.description;
        imageUrl.value = details.attributes.image_url
        featured.checked = details.attributes.featured
        idInput.value = details.id;

        deleteButton(details.id);

        console.log(details);
    } catch (error) {
        console.log(error);
    } 
    // finally {
    //     // loading.style.display = "none";
    //     // form.style.display = "block";
    // }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value.trim();
    const featuredValue = featured.checked;
    const idValue = idInput.value;

    if (titleValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || !imageUrlValue) {
        // return message.innerHTML = "supply info"
        return messaging("warning", "Supply info", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, idValue, imageUrlValue, featuredValue);
}

async function updateProduct(title, price, description, id, imageUrl, featured) {
    const url = urlBase + "/api/plants/" + id;
    // const data = JSON.stringify({ title: title, price: price, description: description, image_url: imageUrl, featured: featured });

    const data = {title: title, price: price, description: description, image_url: imageUrl, featured: featured};
    // const token = getToken();

    const options = {
        method: "PUT",
        body: JSON.stringify( {data: data}),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            // message.innerHTML = "item updated";
            messaging("success", "Item updated", ".message-container");

            

            // Hva er best? message eller relocation?

            // location.href = "products.html";
        }

        if (json.error) {
            // message.innerHTML = "error"
            messaging("error", "There has been an error, sorry for the inconvinience!", ".message-container");
        }
    } catch (error) {
        console.log(error);
        messaging("error", "There has been an error, sorry for the inconvinience!", ".message-container");
    }
}