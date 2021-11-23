import { urlBase } from "./urls/api.js";

const productsUrl = urlBase + "products";

const heroUrl = urlBase + ""


// featured

(async function() {
    const featuredContainer = document.querySelector(".featured-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        console.log(json)

        featuredContainer.innerHTML = "";

        for (let i = 0; i < json.length; i++) {
            // console.log(json[i].title)
            console.log(json[i].image[0].url)

            if (json[i].featured) {
            featuredContainer.innerHTML += `<div class="items">
                                                <div class="product-image" style="background-image: url('${json[i].image[0].url}')"></div>
                                                <h3>${json[i].title}</h3>
                                                <p>${json[i].price}€</p>
                                            </div>`
            }
        }


    } catch(error) {
        console.log(error)
        featuredContainer.innerHTML = "error";
    }


})();