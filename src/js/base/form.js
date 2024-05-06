const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        [...this.elements].forEach(formElement => formControl(formElement));

        if (this.checkValidity() === true) {
            console.log("Başarılı!");
            new FormData(contactForm);
        }

    }, true);

    // contactForm.addEventListener('formdata', function(e) {
    //
    //     let data = e.formData;
    //
    //     //ajax
    //     var request = new XMLHttpRequest();
    //     request.open("POST", "/ajax.php");
    //     request.addEventListener('load', function(response) {
    //         console.log(response)
    //     });
    //     request.send(data);
    // });

    [...contactForm.elements].forEach(formElement => {
        ['change', 'keyup'].forEach(method => formElement.addEventListener(method, e => formControl(e.target)));
    })

    function formControl(formElement) {
        if (!formElement.checkValidity()) {
            let error;

            if (formElement.nextElementSibling?.className === "error-msg") {
                error = formElement.nextElementSibling;
            } else {
                error = document.createElement("small");
            }

            error.className = "error-msg";
            error.innerText = formElement.validationMessage;
            formElement.insertAdjacentElement("afterend", error);
            formElement.classList.add("error");

        } else {
            const errorMsg = formElement.nextElementSibling;

            if (errorMsg) {
                errorMsg.remove();
                formElement.classList.remove("error");
            }
        }
    }
}
