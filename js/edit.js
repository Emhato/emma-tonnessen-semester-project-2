import { jsMenu } from "./componetns/jsMenu.js";
import { getToken } from "./utils/storage.js";
import { urlBase } from "./urls/api.js";

const token = getToken();

if (!token) {
    location.href = "index.html";
}

jsMenu();

const editForm = document.querySelector(".edit-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector ("#image-url");
const featured = document.querySelector("#featured");
const messaging = document.querySelector(".message-container");

editForm.addEventListener("submit", formSubmition);

function formSubmition(event) {
    event.preventDefault();

    messaging.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value.trim();
    const featuredValue = featured.checked;

    console.log(featuredValue);

    if (!titleValue || !priceValue || !descriptionValue || !imageUrlValue) {
        return messaging.innerHTML = "Please fill out all areas"
    }

    addItem(titleValue, priceValue, descriptionValue, imageUrlValue, featuredValue);

}

async function addItem(title, price, description, imageUrl, featured) {
    const editUrl = urlBase + "/products";

    const data = JSON.stringify({title: title, price: price, description: description, image_url: imageUrl, featured: featured});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(editUrl, options);
        const json = await response.json();

        if(json.created_at) {
            messaging.innerHTML = "product created";
            editForm.reset();
        }

        if(json.error) {
            messaging.innerHTML = `${json.message}`;
        }

        console.log(json);
    } catch (error) {
        console.log(error)
    }
}