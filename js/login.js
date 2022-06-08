import { urlBase } from "./urls/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";
import messaging from "./componetns/messaging.js";

jsMenu();

const loginForm = document.querySelector(".login-form")
const email = document.querySelector("#email");
const emailLabel = document.querySelector(".email-label");
const password = document.querySelector("#password");
const passwordLabel = document.querySelector(".password-label");
const loginBtn = document.querySelector(".login-Btn");
// const messaging = document.querySelector(".messaging");

loginForm.addEventListener("submit", validation);

function validation(event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !passwordValue) {
        // return messaging.innerHTML = "Please fill out both e-mail/ username and password"
        return messaging("warning", "Please fill out both e-mail/ username and password", ".messaging");
    }

    login(emailValue, passwordValue);
}

async function login(email, password) {
    const loginUrl = urlBase + "/api/auth/local";

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
            saveToken(json.jwt);
            saveUser(json.user);

            location.href ="edit.html"
        }

        if(json.error) {
            // messaging.innerHTML = "Wrong E-mail/ username and/ or password"
            messaging("error", "Wrong E-mail/ username and/ or password", ".messaging");
        }

        // remove
        console.log(json)
    } catch(error) {
        console.log(error)
        messaging("error", "There has been an error, sorry for the inconvinience!", ".messaging");
    }
}