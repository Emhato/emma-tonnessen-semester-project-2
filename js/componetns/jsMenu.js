// Needs fixing
import { getUserName } from "../utils/storage.js";
import logout from "./logout.js";

export function jsMenu() {
    const userName = getUserName();
    const adminMenu = document.querySelector(".admin");


    if(userName) [
        adminMenu.innerHTML = `<div class="admin">
                                    <p>Admin</p>
                                    <button class="logout">Logout</button>
                                    <a href="edit.html">Edit</a>
                                </div>`
    ]

    logout();
}

/* <div class="admin">
<p>Admin</p>
<a href="login.html" class="login-off">Login</a>
</div> */

