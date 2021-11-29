export function fetchCart() {
    const cart = localStorage.getItem("cartItem");

    if(!cart) {
        return[];
    } else {
        return JSON.parse(cart);
    }
}

// favorites = cart
// favorite = cartItem


// storage conected to the login. Reference all the following?

const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey)
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function getUserName() {
    const user = getFromStorage(userKey);

    if(user) {
        return user.username;
    }

    return null;
}

// export function clearStorage() {
//     localStorage.clear();
// }

export function clearStorage() {
    tokenKey.clear();
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if(!value) {
        return null;
    }

    return JSON.parse(value);
}

