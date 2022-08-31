//form validation:

const form = document.querySelector('#contact-form');
const projectName = document.querySelector('#project-name');
const projectEmail = document.querySelector('#email');
const projectSite = document.querySelector('#site');

const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isSiteValid = (site) => {
    const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(site);
}

const showError = (input, message) => {
    const formField = input;

    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const checkName = () => {
    let valid;

    if (!isRequired(projectName)) {
        showError(projectName, 'Project name is required');
        return valid = false;
    } else {
        return valid = true;
    }
}

const checkEmail = () => {
    let valid;

    if (!isRequired(projectEmail) || !isEmailValid(projectEmail)) {
        showError(projectEmail, 'Email not valid');
        return valid = false;
    } else {
        return valid = true;
    }
}

const checkSite = () => {
    let valid;

    if (!isRequired(projectSite) || !isSiteValid(projectSite)) {
        showError(projectSite, 'Site is not valid');
        return valid = false;
    } else {
        return valid = true;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameValid = checkName()
    let siteValid = checkSite()
    let emailValid = checkEmail()

    let inputsValid = nameValid && siteValid && emailValid;

    if(inputsValid) {
        window.open('https://calendly.com/bencoservices', '_blank');   
        console.log('success') 
    }
})
