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

    // Creates an array and stores the text fields in it. This allows us to loop through the fields and validate them all at once.
    // The email field is included because it is checked separately by browser. 
    const textFields = [nameField, subjectField, questionField];

    //Loops through each text field 
    textFields.forEach(function (field) {
        field.addEventListener("input", function () {
            if (field.value.trim() === "") {
                field.setCustomValidity("This field is required. Please enter text.");
            } else {
                field.setCustomValidity("");
            }

            feedback.textContent = "";

        });
    });

    emailField.addEventListener("input", function () {
        feedback.textContent = "";
    });

    //
    messageForm.addEventListener("submit", function (event) {
        event.preventDefault();
    
        textFields.forEach(function (field) {
            if (field.value.trim() === "") {
                field.setCustomValidity("This field is required. Please enter text.");
            } else {
                field.setCustomValidity("");
            }
        });

        if (!messageForm.reportValidity()) {
            return;
        }

        feedback.textContent = 
            "Thank you " + nameField.value.trim() + " for your message! " +
            "We will get back to you as soon as possible. Please use the email link above to contact me." + 
            " This form does not send messages yet.";
        });


}