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

            for (let i = 0; i < json.length; i++) {
                // console.log(json[i].image_url)

                productsContainer.innerHTML += `<a class="items" href="details.html?id=${jsonToRender[i].id}">
                                                    <div class="product-image" style="background-image: url('${jsonToRender[i].image_url}')"></div>
                                                    <h3>${jsonToRender[i].title}</h3>
                                                    <p>${jsonToRender[i].price}€</p>
                                                </a>`
            }            
        }

        renderProducts();

        search.onkeyup = function(event) {
            const searchValue = event.target.value.trim().toLowerCase();

            const filteredProducts = json.filter(function (product) {
                if(product.title.toLowerCase().startsWith(searchValue)) {
                    return true;
                }
            });

            console.log(filteredProducts);

            jsonToRender = filteredProducts;

            renderProducts();
        };





    } catch(error) {
        console.log(error)
        productsContainer.innerHTML = "error";
    }


})();