import { urlBase } from "./urls/api.js";

const productsUrl = urlBase + "/products";

const heroUrl = urlBase + "/home";

// Hero

(async function() {
    const heroContainer = document.querySelector(".hero-container");

    try {
        const response = await fetch(heroUrl);
        const json = await response.json();

        console.log(json.hero_banner.url);

        heroContainer.innerHTML += `<div class="hero-image" style="background-image: url('${urlBase + json.hero_banner.url}')"></div>`;


    } catch(error) {
        console.log(error)
        heroContainer.innerHTML = "error";
    }


})();



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
            // console.log(json[i].image.url)

            if (json[i].featured) {
            console.log(urlBase + json[i].image.url)
            featuredContainer.innerHTML += `<a class="items" href="details.html?id=${json[i].id}">
                                                <div class="product-image" style="background-image: url('${urlBase + json[i].image.url}')"></div>
                                                <h3>${json[i].title}</h3>
                                                <p>${json[i].price}€</p>
                                            </a>`
            }
        }
        //         <img src="" alt="">

        //                                                 <div class="product-image" style="background-image: url('${json[i].image[0].url}')"></div>


    } catch(error) {
        console.log(error)
        featuredContainer.innerHTML = "error";
    }


})();
