// import { urlBase } from "./urls/api.js";
// import { jsMenu } from "./componetns/jsMenu.js";

// jsMenu();

// const productsUrl = urlBase + "/products";
// const search = document.querySelector(".search");


// // featured

// (async function() {
//     const productsContainer = document.querySelector(".products-container");

//     try {
//         const response = await fetch(productsUrl);
//         const json = await response.json();

//         console.log(json)

//         // let jsonToRender = json;

//         productsContainer.innerHTML = "";

//         for (let i = 0; i < json.length; i++) {
//             console.log(json[i].image_url)

//             productsContainer.innerHTML += `<a class="items" href="details.html?id=${json[i].id}">
//                                                 <div class="product-image" style="background-image: url('${json[i].image_url}')"></div>
//                                                 <h3>${json[i].title}</h3>
//                                                 <p>${json[i].price}€</p>
//                                             </a>`
//         }


//     } catch(error) {
//         console.log(error)
//         productsContainer.innerHTML = "error";
//     }


// })();

import { urlBase } from "./urls/api.js";
import { jsMenu } from "./componetns/jsMenu.js";
import messaging from "./componetns/messaging.js";

jsMenu();

const productsUrl = urlBase + "/products";
const search = document.querySelector(".search");


(async function() {
    const productsContainer = document.querySelector(".products-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        console.log(json)

        let jsonToRender = json;

        function renderProducts() {
            productsContainer.innerHTML = "";

            for (let i = 0; i < jsonToRender.length; i++) {

                productsContainer.innerHTML += `<a class="items" href="details.html?id=${jsonToRender[i].id}">
                                                    <div class="products-wrapper">
                                                        <div class="product-image" style="background-image: url('${jsonToRender[i].image_url}')"></div>
                                                        <div class="title-price-container">
                                                            <h3>${jsonToRender[i].title}</h3>
                                                            <p class="product-price">${jsonToRender[i].price}€</p>
                                                        </div>
                                                    </div>
                                                </a>`
            }            
        }

        renderProducts();

        search.onkeyup = function(event) {
            const searchValue = event.target.value.trim().toLowerCase();

            const filteredProducts = json.filter(function (product) {
                console.log(product.description)
                if(product.title.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
                    console.log(product.title)
                    return true;
                }
            });

            console.log(filteredProducts);

            jsonToRender = filteredProducts;

            renderProducts();
        };





    } catch(error) {
        console.log(error)
        // productsContainer.innerHTML = "error";
        messaging("error", "There has been an error, sorry for the inconvinience!", ".products-container");
    }
})();