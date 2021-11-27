import { urlBase } from "./urls/api.js";
import { saveToken, saveUser } from "./utils/storage.js";

const loginForm = document.querySelector(".login-form")
const email = document.querySelector("#email");
const emailLabel = document.querySelector(".email-label");
const password = document.querySelector("#password");
const passwordLabel = document.querySelector(".password-label");
const loginBtn = document.querySelector(".login-Btn");
const messaging = document.querySelector(".messaging");

loginForm.addEventListener("submit", validation);

function validation(event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    login(emailValue, passwordValue);
}

async function login(email, password) {
    const loginUrl = urlBase + "/auth/local";

    const data = JSON.stringify({identifier: email, password: password});

    const options = {
        method: "POST",
        body: data,
        // / infront of application? small C in Content?
        headers: {
            "Content-type": "application/json",
        },
    };

    try {
        const response = await fetch(loginUrl, options);
        const json = await response.json();

        if(json.user) {
            // replace with a message component
            // messaging.innerHTML = "go to..."
            saveToken(json.jwt);
            saveUser(json.user);

            location.href ="edit.html"
        }

        if(json.error) {
            // replace with a message component
            messaging.innerHTML ="error"
        }

        // remove
        console.log(json)
    } catch(error) {
        // add messaging
        console.log(error)
    }
}