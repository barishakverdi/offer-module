import {body} from "./header.js";
const customDropdown = document.querySelectorAll(".custom-dropdown");

customDropdown.forEach(dropdown => {
    let options = dropdown.querySelector(".options"),
        option = options.querySelectorAll(".option"),
        placeholder = dropdown.querySelector(".placeholder span"),
        arrow = dropdown.querySelector("i"),
        dropdownId = dropdown.getAttribute("data-dropdown-id"),
        optionsId= options.getAttribute("data-options-id"),
        placeholderId = placeholder.getAttribute("data-placeholder-id"),
        formInput = dropdown.querySelector("input") || dropdown.nextElementSibling,
        dropdownOutSide = document.createElement("div");
    dropdownOutSide.className = "dropdown-outside";

    dropdown.addEventListener("click", (e) => {
        dropdown.classList.toggle("very-first");

        if (dropdownOutSide && body.contains(dropdownOutSide)) {
            body.removeChild(dropdownOutSide)
        } else {
            body.appendChild(dropdownOutSide)
        }

        if (e.target.nextElementSibling === options && dropdownId === optionsId) {
            options = e.target.nextElementSibling;
            options.classList.toggle("options-open");
            arrow.classList.toggle("rotate-180");
        }
    })

    option.forEach(item => {
        item.addEventListener("click", (e) => {
            if (e.target === item && placeholderId === dropdownId) {
                placeholder.innerHTML = e.target.innerHTML;
                options.classList.toggle("options-open");
                arrow.classList.toggle("rotate-180");
                formInput.value = e.target.innerText;
                console.log(formInput.value)
            }
        })

        body.addEventListener("click", (event) => {
            if (event.target === dropdownOutSide && body.contains(dropdownOutSide)) {
                options.classList.toggle("options-open")
                body.removeChild(dropdownOutSide)
                dropdown.classList.remove("very-first")
                arrow.classList.toggle("rotate-180");
            }
        })
    })
})
