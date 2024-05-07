/* Get offer modal v1 */
if (document.getElementById("offer-v1")) {
    // Start ----------------------------------------- //
    const getOfferButton = document.querySelector("#get-offer-button"),
        offerContainer = document.querySelector("#offer-container"),
        closeButton = offerContainer ? offerContainer.querySelector("[data-offer-close]") : null,
        offerForm = offerContainer ? offerContainer.querySelector("form") : null;

    const openModal = () => {offerContainer.classList.add("active");}
    const closeModal = () => {offerContainer.classList.remove("active");}


// Open Offer Modal
    getOfferButton?.addEventListener("click", openModal);

// Close Offer Modal
    closeButton?.addEventListener("click", closeModal);

    const stepsContainer = offerContainer  ? offerContainer.querySelector(".steps-container") : null,
        stepsWrapper = offerContainer ? offerContainer.querySelector(".steps-wrapper") : null,
        steps = stepsWrapper ? stepsWrapper.querySelectorAll("[data-step]") : null;

    if (stepsContainer) {

        // Creating variables: prev step button, next step button, current step text and total steps number text.
        const prevStepButton = offerContainer.querySelector("[data-prev-step]"),
            nextStepButton = offerContainer.querySelector("[data-next-step]"),
            currentStep = offerContainer.querySelector("[data-current-step]"),
            totalStep = offerContainer.querySelector("[data-total-steps]");

        currentStep.innerHTML = "1";
        totalStep.innerHTML = steps.length.toString();

        // Creating variable: selectedItemsCount = We assign "0" to this variable because we want to control prev and next step buttons.
        let selectedItemsCount = 0;

        steps.forEach((step, index) => {

            // stepIndex = The index number that we assigned, realStepIndex = The index number that item's real index.
            let stepIndex = parseInt(step.getAttribute("data-step")),
                realStepIndex = index;

            // Creating inputs to get selected items (value) name of each step. We will use this later.
            if (step.querySelector("[data-step-items]")) {
                let dataInput = document.createElement("input");
                dataInput.type = "hidden";
                dataInput.name = `step-${stepIndex}`;
                step.insertAdjacentElement("afterbegin", dataInput);
            }

            // Set active first step
            if (realStepIndex === 0) {
                step.classList.add("active")

                // First step is active so there is no prev step. Set prev button disabled.
                prevStepButton.classList.add("disabled");

                // First step is active so there are no items selected yet. Set next button disabled.
                nextStepButton.classList.add("disabled");
            }

            // Creating variable: step items container.
            const stepItemsContainer = step.querySelectorAll("[data-step-items]");

            if (stepItemsContainer) {
                stepItemsContainer.forEach((container, containerIndex) => {
                    // Get selection type.
                    const selectionType = container.getAttribute("data-selection");

                    // Get all step items.
                    const stepItems = container.querySelectorAll(".item")

                    // Single selection function
                    const singeSelection = (index) => {
                        // Remove all item's "selected" class.
                        for (let i = 0; i < stepItems.length; i++) {
                            if (index !== i) {
                                stepItems[i].classList.remove("selected");
                            }
                            selectedItemsCount--;
                            if (selectedItemsCount < 0) selectedItemsCount = 0;
                            nextStepButton.classList.add("disabled");
                        }
                        // Toggle "selected" class to the clicked item.
                        stepItems[index].classList.toggle("selected");
                        selectedItemsCount += stepItems[index].classList.contains("selected") ? 1 : -1;

                        if (selectedItemsCount < 0) selectedItemsCount = 0;
                        if (stepItems[index].classList.contains("selected")) nextStepButton.classList.remove("disabled");

                        // console.log("Single selection: ", selectedItemsCount)
                    }

                    // Multiple selection function
                    const multipleSelection = (index) => {
                        stepItems[index].classList.toggle("selected")
                        selectedItemsCount += stepItems[index].classList.contains("selected") ? 1 : -1;
                        if (selectedItemsCount < 0) selectedItemsCount = 0;

                        // Disable next step button when selectedItemsCount is 0
                        nextStepButton.classList.toggle("disabled", selectedItemsCount === 0);

                        // console.log("Multiple selection: ", selectedItemsCount)
                    }

                    // Singe selection
                    if (selectionType === "single") {
                        stepItems.forEach((item, itemIndex) => {
                            item.addEventListener("click", (e) => singeSelection(itemIndex));
                        })
                    }

                    // Multiple selection
                    if (selectionType === "multiple") {
                        stepItems.forEach((item, itemIndex) => {
                            item.addEventListener("click", (e) => multipleSelection(itemIndex));
                        })
                    }
                })
            }
        })

        const controlNextButtonState = () => {
            // Reset each time when the next step is active.
            selectedItemsCount = 0;

            // if step is the last step, disable next button.
            nextStepButton.classList.toggle("disabled", parseInt(steps[currentIndex].getAttribute("data-step")) === steps.length - 1);
            // if step is the first step, disable prev button.
            prevStepButton.classList.toggle("disabled", parseInt(steps[currentIndex].getAttribute("data-step")) === 0);

            // Control active step's items for next button state
            if (steps[currentIndex].querySelector("[data-step-items]")) {

                // Get selected items number
                let selectedItemsLength = steps[currentIndex].querySelectorAll("[data-step-items] .item.selected").length;

                if (selectedItemsLength > 0) {
                    selectedItemsCount = selectedItemsLength;
                    nextStepButton.classList.remove("disabled");
                } else { nextStepButton.classList.add("disabled"); }

            }
            // console.log(selectedItemsCount)
        }

        const changeStep = step => {
            if (step) {
                step.classList.add("active")
                stepsWrapper.style.transform = `translateX(-${step.offsetLeft - (stepsContainer.offsetWidth - step.offsetWidth)}px)`
            }
        }


        // Next button actions
        // First step active so set current index to 0.
        let currentIndex = 0;
        nextStepButton.addEventListener("click", (e) => {
            steps.forEach((step, index) => {

                // Change active step
                if (step.classList.contains("active")) {
                    step.classList.remove("active");
                    prevStepButton.classList.remove("disabled");

                    let nextStep = steps[currentIndex + 1];
                    changeStep(nextStep);
                }
            })

            // Increase current index one by one
            currentIndex++;
            currentStep.innerHTML = (currentIndex + 1).toString();
            controlNextButtonState();
        })


        // Prev button actions
        prevStepButton.addEventListener("click", (e) => {
            steps.forEach((step, index) => {

                // Change active step
                if (step.classList.contains("active")) {
                    step.classList.remove("active");
                    prevStepButton.classList.remove("disabled");

                    let prevStep = steps[currentIndex - 1];
                    changeStep(prevStep);
                }
            })

            // Decrease current index one by one
            currentIndex--;
            currentStep.innerHTML = (currentIndex + 1).toString();
            controlNextButtonState();
        })


        // Offer form
        offerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Print the names of the selected options in the inputs
            steps.forEach((step, index) => {
                const chosenItemsTitle = step.querySelectorAll(".item.selected"),
                    inputs = step.querySelector("input[type='hidden']");

                // Reset input's value each submit.
                inputs.value = "";

                if (inputs) {
                    chosenItemsTitle.forEach((item, index) => {
                        inputs.value += item.getAttribute("data-name") + ", ";
                    })
                    // console.log(inputs.name, inputs.value)
                }
            })
        })
    } else {
        const warn = [
            'background: red',
            'color: white',
            'display: block',
            'text-align: center',
            'padding: 10px 5px',
            'border-radius: 5px',
            'margin: 10px 0'
        ].join(";");
        console.log("%c Steps container does not exist. Check HTML.", warn);
    }
}

/* Get offer modal v2 */
if (document.getElementById("offer-v2")) {
    // Start ----------------------------------------- //
    const getOfferButton = document.querySelector("#get-offer-button"),
        offerContainer = document.querySelector("#offer-container"),
        closeButton = offerContainer ? offerContainer.querySelector("[data-offer-close]") : null,
        offerForm = offerContainer ? offerContainer.querySelector("form") : null;

    const openModal = () => {offerContainer.classList.add("active");}
    const closeModal = () => {offerContainer.classList.remove("active");}


// Open Offer Modal
    getOfferButton?.addEventListener("click", openModal);

// Close Offer Modal
    closeButton?.addEventListener("click", closeModal);

    const stepsContainer = offerContainer  ? offerContainer.querySelector(".steps-container") : null,
        stepsWrapper = offerContainer ? offerContainer.querySelector(".steps-wrapper") : null,
        steps = stepsWrapper ? stepsWrapper.querySelectorAll("[data-step]") : null;

    if (stepsContainer) {

        // Creating variables: prev step button, next step button, current step text and total steps number text.
        const prevStepButton = offerContainer.querySelector("[data-prev-step]"),
            nextStepButton = offerContainer.querySelector("[data-next-step]"),
            currentStep = offerContainer.querySelector("[data-current-step]"),
            totalStep = offerContainer.querySelector("[data-total-steps]");

        currentStep.innerHTML = "1";
        totalStep.innerHTML = steps.length.toString();

        // Creating variable: selectedItemsCount = We assign "0" to this variable because we want to control prev and next step buttons.
        let selectedItemsCount = 0;

        steps.forEach((step, index) => {

            // stepIndex = The index number that we assigned, realStepIndex = The index number that item's real index.
            let stepIndex = parseInt(step.getAttribute("data-step")),
                realStepIndex = index;

            // Creating inputs to get selected items (value) name of each step. We will use this later.
            if (step.querySelector("[data-step-items]")) {
                let dataInput = document.createElement("input");
                dataInput.type = "hidden";
                dataInput.name = `step-${stepIndex}`;
                step.insertAdjacentElement("afterbegin", dataInput);
            }

            // Set active first step
            if (realStepIndex === 0) {
                step.classList.add("active")

                // First step is active so there is no prev step. Set prev button disabled.
                prevStepButton.classList.add("disabled");

                // First step is active so there are no items selected yet. Set next button disabled.
                nextStepButton.classList.add("disabled");
            }

            // Creating variable: step items container.
            const stepItemsContainer = step.querySelectorAll("[data-step-items]");

            if (stepItemsContainer) {
                stepItemsContainer.forEach((container, containerIndex) => {
                    // Get selection type.
                    const selectionType = container.getAttribute("data-selection");

                    // Get all step items.
                    const stepItems = container.querySelectorAll(".item")

                    // Single selection function
                    const singeSelection = (index) => {
                        // Remove all item's "selected" class.
                        for (let i = 0; i < stepItems.length; i++) {
                            if (index !== i) {
                                stepItems[i].classList.remove("selected");
                            }
                            selectedItemsCount--;
                            if (selectedItemsCount < 0) selectedItemsCount = 0;
                            nextStepButton.classList.add("disabled");
                        }
                        // Toggle "selected" class to the clicked item.
                        stepItems[index].classList.toggle("selected");
                        selectedItemsCount += stepItems[index].classList.contains("selected") ? 1 : -1;

                        if (selectedItemsCount < 0) selectedItemsCount = 0;
                        if (stepItems[index].classList.contains("selected")) nextStepButton.classList.remove("disabled");

                        // console.log("Single selection: ", selectedItemsCount)
                    }

                    // Multiple selection function
                    const multipleSelection = (index) => {
                        stepItems[index].classList.toggle("selected")
                        selectedItemsCount += stepItems[index].classList.contains("selected") ? 1 : -1;
                        if (selectedItemsCount < 0) selectedItemsCount = 0;

                        // Disable next step button when selectedItemsCount is 0
                        nextStepButton.classList.toggle("disabled", selectedItemsCount === 0);

                        // console.log("Multiple selection: ", selectedItemsCount)
                    }

                    // Singe selection
                    if (selectionType === "single") {
                        stepItems.forEach((item, itemIndex) => {
                            item.addEventListener("click", (e) => singeSelection(itemIndex));
                        })
                    }

                    // Multiple selection
                    if (selectionType === "multiple") {
                        stepItems.forEach((item, itemIndex) => {
                            item.addEventListener("click", (e) => multipleSelection(itemIndex));
                        })
                    }
                })
            }
        })

        const controlNextButtonState = () => {
            // Reset each time when the next step is active.
            selectedItemsCount = 0;

            // if step is the last step, disable next button.
            nextStepButton.classList.toggle("disabled", parseInt(steps[currentIndex].getAttribute("data-step")) === steps.length - 1);
            // if step is the first step, disable prev button.
            prevStepButton.classList.toggle("disabled", parseInt(steps[currentIndex].getAttribute("data-step")) === 0);

            // Control active step's items for next button state
            if (steps[currentIndex].querySelector("[data-step-items]")) {

                // Get selected items number
                let selectedItemsLength = steps[currentIndex].querySelectorAll("[data-step-items] .item.selected").length;

                if (selectedItemsLength > 0) {
                    selectedItemsCount = selectedItemsLength;
                    nextStepButton.classList.remove("disabled");
                } else { nextStepButton.classList.add("disabled"); }

            }
            // console.log(selectedItemsCount)
        }

        const changeStep = step => {
            if (step) {
                step.classList.add("active")
                stepsWrapper.style.transform = `translateX(-${step.offsetLeft - (stepsContainer.offsetWidth - step.offsetWidth)}px)`
            }
        }


        // Next button actions
        // First step active so set current index to 0.
        let currentIndex = 0;
        nextStepButton.addEventListener("click", (e) => {
            steps.forEach((step, index) => {

                // Change active step
                if (step.classList.contains("active")) {
                    step.classList.remove("active");
                    prevStepButton.classList.remove("disabled");

                    let nextStep = steps[currentIndex + 1];
                    changeStep(nextStep);
                }
            })

            // Increase current index one by one
            currentIndex++;
            currentStep.innerHTML = (currentIndex + 1).toString();
            controlNextButtonState();
        })


        // Prev button actions
        prevStepButton.addEventListener("click", (e) => {
            steps.forEach((step, index) => {

                // Change active step
                if (step.classList.contains("active")) {
                    step.classList.remove("active");
                    prevStepButton.classList.remove("disabled");

                    let prevStep = steps[currentIndex - 1];
                    changeStep(prevStep);
                }
            })

            // Decrease current index one by one
            currentIndex--;
            currentStep.innerHTML = (currentIndex + 1).toString();
            controlNextButtonState();
        })


        // Offer form
        offerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Print the names of the selected options in the inputs
            steps.forEach((step, index) => {
                const chosenItemsTitle = step.querySelectorAll(".item.selected"),
                    inputs = step.querySelector("input[type='hidden']");

                // Reset input's value each submit.
                inputs.value = "";

                if (inputs) {
                    chosenItemsTitle.forEach((item, index) => {
                        inputs.value += item.getAttribute("data-name") + ", ";
                    })
                    // console.log(inputs.name, inputs.value)
                }
            })
        })
    } else {
        const warn = [
            'background: red',
            'color: white',
            'display: block',
            'text-align: center',
            'padding: 10px 5px',
            'border-radius: 5px',
            'margin: 10px 0'
        ].join(";");
        console.log("%c Steps container does not exist. Check HTML.", warn);
    }
}
