//form validation:

const form = document.querySelector('.contact-form');
const projectName = document.getElementById('project-name');
const projectEmail = document.getElementById('email');
const projectSite = document.getElementById('site');

const isRequired = value => value === '' ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isSiteValid = (site) => {
    const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(site);
}

const showError = (input, message) => {
    input.parentElement.querySelector('.error-message').style.display = "block";
    input.parentElement.querySelector('.error-message').innerHTML = message;

    input.scrollIntoView();
};

const checkName = () => {
    if (isRequired(projectName.value) === false) {
        showError(projectName, 'Project name is required');
        return false;
    } else {
        return true;
    }
}

const checkEmail = () => {
    if (!isEmailValid(projectEmail.value)) {
        showError(projectEmail, 'Email not valid');
        return false;
    } else {
        return true;
    }
}

const checkSite = () => {
    let valid;

    if (!isRequired(projectSite.value) || !isSiteValid(projectSite.value)) {
        showError(projectSite, 'Site is not valid');
        return valid = false;
    } else {
        return valid = true;
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    let nameValid = checkName()
    let siteValid = checkSite()
    let emailValid = checkEmail()

    let inputsValid = nameValid && siteValid && emailValid;

    if(inputsValid) {
        document.querySelector('.error-message').style.display="none";

        let productCheckboxValues = [];
        let launchDateRadioValue;
        let interestCheckboxValues = [];
        let howSoonRadioValue;
        let budgetRadioValue;

        //find selected product checkboxes 
        var productCheckboxes = document.getElementsByName('product');

        for (var i = 0, length = productCheckboxes.length; i < length; i++) {
            if (productCheckboxes[i].checked) {
                // do whatever you want with the checked radio
                productCheckboxValues.push(productCheckboxes[i].value);
            }
        }

        //launch date radio value
        var launchDateRadios = document.getElementsByName('launch-date');

        for (var i = 0, length = launchDateRadios.length; i < length; i++) {
            if (launchDateRadios[i].checked) {
                // do whatever you want with the checked radio
                launchDateRadioValue = launchDateRadios[i].value;
 
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }

        //find selected interest checkboxes 
        var interestCheckboxes = document.getElementsByName('interest');

        for (var i = 0, length = interestCheckboxes.length; i < length; i++) {
            if (interestCheckboxes[i].checked) {
                // do whatever you want with the checked radio
                interestCheckboxValues.push(interestCheckboxes[i].value);
            }
        }

        //how-soon radio value
        var howSoonRadios = document.getElementsByName('how-soon');

        for (var i = 0, length = howSoonRadios.length; i < length; i++) {
            if (howSoonRadios[i].checked) {
                // do whatever you want with the checked radio
                howSoonRadioValue = howSoonRadios[i].value;
 
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }

        //bugdet radio value
        var budgetRadios = document.getElementsByName('budget');

        for (var i = 0, length = budgetRadios.length; i < length; i++) {
            if (budgetRadios[i].checked) {
                // do whatever you want with the checked radio
                budgetRadioValue = budgetRadios[i].value;

                // only one radio can be logically checked, don't check the rest
                break;
            }
        }

        const productMessage = convertArrayToString(productCheckboxValues);
        const interestMessage = convertArrayToString(interestCheckboxValues);

        const messageToSend = `
            Project Name: ${projectName.value} /     --     / 
            Project Email: ${projectEmail.value} /     --     / 
            Project Site: ${projectSite.value} /     --     / 

            Products: ${productMessage} /     --     / 
            Interests: ${interestMessage} /     --     / 
            How Soon Would you like to begin: ${howSoonRadioValue} /     --     / 
            Launch Date: ${launchDateRadioValue} /     --     / 
            Budget: ${budgetRadioValue} /     --          --     / 

            Message: ${document.getElementById('message1').value}
        `
        form.message.value = messageToSend;

        emailjs.sendForm('benco_services', 'contact_form', '#contact-form')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert("Thank you for your response.");
                window.open('https://www.calendly.com/bencoservices', '_blank');
            }, function(error) {
                console.log('FAILED...', error);
            });
    }
})

function convertArrayToString(array) {
    let message;
    for (var i = 0, length = array.length; i < length; i++) {
        message = `${message}, ${array[i]}`
    }
    return message;
}