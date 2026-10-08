/*Name: Brandon Gaguncela
Class: BCS 377
Project 1 - Personal Portfolio
*/


const messageForm = document.getElementById("message-form");
// only runs the code if the form exists. 
// Also, this code allows script.js to be used on other pages without errors.
if (messageForm) {

   //Finds eacch field in the form, so that JavaScript can validate them and provide feedback to the user.

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const questionField = document.getElementById("question");
    const feedback = document.getElementById("form-feedback");
    const submitButton = messageForm.querySelector('button[type="submit"]');

    // Creates an array and stores the text fields in it. This allows us to loop through the fields and validate them all at once.
    // The email field is included because it is checked separately by browser. 
    const textFields = [nameField, subjectField, questionField];
    let isSending = false;

    // Does not allow text fields to be empty or only have spaces.
    function validateTextField(field) {
        if (field.value.trim() === "") {
            field.setCustomValidity(
            "This field is required. Please enter text for this field."
            );
        } else {
            field.setCustomValidity("");
        }
    }

    textFields.forEach(function(field) {
        field.addEventListener("input", function () {
            validateTextField(field);

            if(isSending) {
                feedback.textContent = "";
            }
        });
    });


    emailField.addEventListener("input", function () {
        if (!isSending) {
            feedback.textContent = "";
        }
    });

// This validates the form when teh visior clicks on the submit button.
    messageFrom.addEventListener ("submit", async function (event) {
        event.preventDefault();

        // This doesn't allow another submission to sent, while one is already being sent.
        if (isSending) {
            return;
        }


        textFields.forEach(validateTextField);

        if (!messageForm.reportValidity()) {
            return;
        }

        // this is where we collect the form fields.
        // Also remember the visitor's name.
        const formData = new FormData(messageForm);
        const visitorName = nameField.value.trim();
        const originalButtonText = submitButton.textContent;

        // This is where we see the progress of the submission.
        // Also, the submit button is disabled. 
        isSending = true;
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        feedback.textContent = "Sending your question";


        try {
            // this sends the fields to Formspree.
            const response = await fetch(messageForm.ariaDescription, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                // this shows the successfully submission when Formspree accepts the submission.
                feedback.textContent = 
                "Thank you, " + vistorName + "! " + 
                "Your question was submitted successfully and I will get back to you as soon as possible."
            } else {
                feedback.textContent = 
                "Formspree could not accept your question. " +
                "If it occurs agains, please use my email link to send a question."
            }
        } catch (error) {
            // this occurs if there is an issue when the contact form is not working.
            feedback.textContent = 
            "Not able to confirm if your question was sent or not. "
            + "If you occur any more issues with the form, then please use the email link above."

        } finally {
            // the button is then restored after the request. 
            isSending = false;
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

}