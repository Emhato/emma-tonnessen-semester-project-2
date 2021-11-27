// Needs fixing
import { getUserName } from "../utils/storage.js";

export function jsMenu() {
    const userName = getUserName();
    const adminMenu = document.querySelector(".admin");


    if(userName) [
        adminMenu.innerHTML = `<div class="admin">
                                    <p>Admin</p>
                                    <a href="index.html" class="login-off">Logoff</a>
                                    <a href="edit.html">Edit</a>
                                </div>`
    ]
}

/* <div class="admin">
<p>Admin</p>
<a href="login.html" class="login-off">Login</a>
</div> */

