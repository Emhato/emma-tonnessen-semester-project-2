import { urlBase } from "./urls/api.js";

const productsUrl = urlBase + "/products";


// featured

(async function() {
    const productsContainer = document.querySelector(".products-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        console.log(json)

        productsContainer.innerHTML = "";

        for (let i = 0; i < json.length; i++) {
            // console.log(json[i].title)
        // <div class="product-image" style="background-image: url('${urlBase + json[i].image.url}')"></div>

            productsContainer.innerHTML += `<a class="items" href="details.html?id=${json[i].id}">
                                                <div class="product-image" style="background-image: url('${urlBase + json[i].image.url}')"></div>
                                                <h3>${json[i].title}</h3>
                                                <p>${json[i].price}€</p>
                                            </a>`
        }


    } catch(error) {
        console.log(error)
        productsContainer.innerHTML = "error";
    }


})();