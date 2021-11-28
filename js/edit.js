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
const featured = document.querySelector("#featured");
const messaging = document.querySelector(".message-container");

editForm.addEventListener("submit", formSubmition);

function formSubmition(event) {
    event.preventDefault();

    messaging.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    // const featuredValue = featured;

    // console.log(featuredValue);

    if (!titleValue || !priceValue || !descriptionValue) {
        return messaging.innerHTML = "Please fill out all areas"
    }

    addItem(titleValue, priceValue, descriptionValue);

}

async function addItem(title, price, description) {
    const editUrl = urlBase + "/products";

    const data = JSON.stringify({title: title, price: price, description: description});

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

// async function addProduct(title, price, description) {
//     const url = urlBase + "/products";

//     const data = JSON.stringify({ title: title, price: price, description: description });

//     const token = getToken();

//     const options = {
//         method: "POST",
//         body: data,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     try {
//         const response = await fetch(url, options);
//         const json = await response.json();

//         if (json.created_at) {
//             messaging.innerHTML = "success";
//             editForm.reset();
//         }

//         if (json.error) {
//             messaging.innerHTML = `${json.message}`;
//         }

//         console.log(json);
//     } catch (error) {
//         console.log(error);
//     }
// }