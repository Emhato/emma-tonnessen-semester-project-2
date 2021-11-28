import { urlBase } from "./urls/api.js";
import { fetchCart } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./componetns/deleteButton.js"
// import { cartIndication } from "./componetns/cartIndication.js"

const token = getToken();

if (!token) {
    location.href = "index.html";
}

jsMenu();
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

        const cart = document.querySelector(".cart");

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

           
            const article = {id, title, price, image};

            theCart.push(article);
    
            saveCart(theCart);

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
    }


})();


// console.log(theCart)

// if(!existCheck) {
//     const article = {id, title, price, image};

//     theCart.push(article);

//     saveCart(theCart);
// } else {
//     const filteringCart = theCart.filter(function(exist) {
//         return exist.id !== id;
//     });
//     saveCart(filteringCart);
// }




// edit products



// const token = getToken();
// const editProduct = document.querySelector(".edit-product");

// console.log(token)

// if(token) {
//     editProduct.style.display = "block"
// }

// // const detailsUrl = urlBase + "/products/" + id;

// const editProductForm = document.querySelector(".edit-product");
// const title = document.querySelector("#title");
// const price = document.querySelector("#price");
// const description = document.querySelector("#description");
// const featured = document.querySelector("#featured");
// const productId = document.querySelector("#id");
// const messaging = document.querySelector(".message-container");

// (async function () {
//     try{
//         const response = await fetch(detailsUrl);
//         const details = await response.json();

//         title.value = details.title;
//         price.value = details.price;
//         description.value = details.description;
//         productId.value = details.id;

//         console.log(details);
//     } catch (error) {
//         console.log(error)
//     }
// })();

// editProductForm.addEventListener("submit", onSubmit);

// function onSubmit(event) {
//     event.preventDefault();

//     messaging.innerHTML = "";

//     const titleValue = title.value.trim();
//     const priceValue = parseFloat(price.value);
//     const descriptionValue = description.value.trim();
//     const idValue = productId.value;

//     if (!titleValue || !priceValue || !descriptionValue) {
//         return messaging.innerHTML = "Please fill out all areas"
//     }

//     updateItem(titleValue, priceValue, descriptionValue, idValue);
// }

// async function updateItem(title, price, description, id) {
//     const Url = urlBase + "/products/" + id;
//     const data = JSON.stringify({ title: title, price: price, description: description});

//     const thisToken = getToken()

//     const options = {
//         method: "PUT",
//         body: data,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${thisToken},`
//         },
//     };

//     try {
//         const response = await fetch(Url, options);
//         const json = await response.json();
//         console.log(json);

//         if (json.updated_at) {
//             messaging.innerHTML = "Item updated"
//         }

//         if (json.error) {
//             messaging.innerHTML = json.message;
//         }
//     } catch (error){
//         console.log(error)
//     }

// }


const productUrl = urlBase + "/products/" + id;

const form = document.querySelector(".edit-product");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
// const loading = document.querySelector(".loading");

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        title.value = details.title;
        price.value = details.price;
        description.value = details.description;
        idInput.value = details.id;

        deleteButton(details.id);

        console.log(details);
    } catch (error) {
        console.log(error);
    } finally {
        // loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const idValue = idInput.value;

    if (titleValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return message.innerHTML = "supply info"
    }

    updateProduct(titleValue, priceValue, descriptionValue, idValue);
}

async function updateProduct(title, price, description, id) {
    const url = urlBase + "/products/" + id;
    const data = JSON.stringify({ title: title, price: price, description: description });

    // const token = getToken();

    const options = {
        method: "PUT",
        body: data,
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
            message.innerHTML = "item updated";

            // Hva er best? message eller relocation?

            // location.href = "products.html";
        }

        if (json.error) {
            message.innerHTML = "error"
        }
    } catch (error) {
        console.log(error);
    }
}