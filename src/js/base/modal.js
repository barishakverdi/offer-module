import {body} from "./header.js";
let modalContainer = document.querySelector(".modal-container");
if (modalContainer) {
    let modal = modalContainer.querySelectorAll(".modal");
    let modalTriggerButton = document.querySelectorAll(".modal-trigger-button");
    let modalCloseButton = modalContainer.querySelectorAll(".close-button");

    function closeContainer() {
        modalContainer.classList.add("closed");
        body.classList.remove("overflow-hidden");
        modal.forEach(modal => {
            modal.classList.add("closed");
            modal.classList.remove("opened");
        })
    }

    function openContainer(trigger) {
        modalContainer.classList.toggle("closed");
        body.classList.toggle("overflow-hidden");

        modal.forEach(modal => {
            if (trigger.getAttribute("modal-trigger-id") === modal.getAttribute("modal-id")) {
                modal.classList.remove("closed");
                modal.classList.add("opened");
            }
        })
    }

    modalTriggerButton.forEach(button => {
        button.addEventListener("click", function () {
            openContainer(button)
        })
    })

    modal.forEach(modal => {
        body.addEventListener("keydown", function (e) {
            if (modalContainer.getAttribute("data-keypress-close") === "true" && e.key === "Escape") {
                closeContainer()
            }
        })
    })

    modalCloseButton.forEach(closeButton => {
        closeButton.addEventListener("click", function() {
            closeContainer()
        })
    })
}
