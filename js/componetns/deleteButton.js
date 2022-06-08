import { urlBase } from "../urls/api.js";
import { getToken } from "../utils/storage.js";

export default function deleteButton(id) {
    const deleteBtn = document.querySelector(".delete-btn");
    // const messaging = document.querySelector(".message-container");

    deleteBtn.addEventListener("click", onDelete);

    async function onDelete() {
        // console.log(id);

        const confirmationCheck = confirm("Are you sure you want to delete this item?");

        if(confirmationCheck) {
            const deleteUrl = urlBase + "/api/plants/" + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(deleteUrl, options);
                const json = await response.json();

                location.href = "index.html";

                console.log(json)
            } catch (error) {
                console.log(error);
                // messaging.innerHTML = "upsidasy"
            }
        }
    }
}




