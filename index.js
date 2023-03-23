// Form submission
const submit = document.getElementById('submit');

// Inputs
const inputs = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    confirm: document.getElementById('confirm')
}

// Requirements for input validation 
const patterns = {
    firstName: [/[A-Z]/],
    lastName: [/[A-Z]/],
    email: [/[\S]{1,}[@][\S]{1,}[.][\S]{1,}/],
    phone: [/[0-9]{3}-[0-9]{3}-[0-9]{4}/],
    password: [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*()_+=~`{}|;:'"/?.>,<-]/]
}

// Displays for input validation 
const checkMark = document.getElementById('valid');

const alerts = {
    firstName: document.getElementById('firstNameAlert'),
    lastName: document.getElementById('lastNameAlert'),
    email: document.getElementById('emailAlert'),
    phone: document.getElementById('phoneAlert'),
    password: document.getElementById('passwordAlert'),
    confirm: document.getElementById('confirmAlert')
};

const messages = {
    firstName: ['First name must contain only letters', 'First name required'],
    lastName: ['Last name must contain only letters', 'Last name required'],
    email: ['Please use a valid email', 'Email required'],
    phone: ['Please use a valid phone number', 'Phone number required'],
    password: [
        'Password must contain at least 1 lowercase letter',
        'Password must contain at least 1 uppercase letter',
        'Password must contain at least 1 number',
        'Password must contain at least 1 special character',
        'Password must contain at least 7 characters'
    ],
    confirm: 'Passwords do not match'
};


// Adds and removes styling for invalid inputs
function styleInputs(message, name){
    let alert = alerts[name];

    if (message === true) { // If input is valid
        submit.removeAttribute('disabled');
        alert.style.display = 'none';
        inputs[name].classList.remove('invalid');
        return;
    } // If invalid
    submit.setAttribute('disabled', true);
    alert.textContent = message;
    alert.style.display = 'block';
    inputs[name].className = 'invalid';
    return;
}

// Formats phone number
function formatNumber(e) {
    let clone = '';
    let num = e.target.value 

    // Remove special chars
    num = (num.replace(/[^0-9]/g, ""));

    // Limit length
    if (num.length > 10) num = num.slice(0, 10)

    // Add hyphens (000-000-0000)
    for (let i = 0; i < num.length; i++){
        clone += num[i];
        if (i === 2 || i === 5) {
            clone += '-';
        }
    }
    e.target.value = clone;
}


// Checks if inputs match requirements
function checkRequirements(name, value, errors) {
    let requirements = patterns[name];

    // If input is blank
    if (!value) {
        let index = errors.length - 1;
        return errors[index];
    }

    for (let i = 0; i < requirements.length; i++) {
        // If value does not match requirements
        if (!requirements[i].test(value)) {
            return errors[i]; // error message
        }
    }
    return true;
}

// Checks if any previous inputs match requirements
function checkPrevious (e) {
    const names = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirm'];
    let errorCt = 0;

    // Find starting index
    let i;
    if (e.target.id === 'submit') {
        // If reached by 'submit' index is end of array
        i = names.length - 2
    } else {
        // Find index of current input
        i = names.indexOf(e.target.name);
        if (i <= 0) return;
        i--; // Find index before current input index
    }

    // Check inputs for validity, and display appropriate styling
    for (i; i > -1; i--) {
        let name = names[i];
        console.log('name: ', name);
        let message = checkRequirements(name, inputs[name].value, messages[name]);
        console.log('message: ', message);
        errorCt += message === true ? 0 : 1;
        styleInputs(message, name);
    }
    
    // If error count is 0, and id is 'submit'
    if (errorCt === 0 && e.target.id === 'submit'){
        console.log("fishy success");
    }
    return;
}



// Checks if pwd confirmation matches requirements
function checkConfirm(value, error) {
    // Get password input value
    let pwd = inputs.password;

    // If confirmation is blank or password is blank/invalid, do nothing
    if (!value || !pwd.value || pwd.className === 'invalid') {
        checkMark.style.display = 'none'; // Hide check mark
        return 'exit';
    }
    // If confirmation doesn't match password
    if (value !== inputs.password.value) {
        checkMark.style.display = 'block'; // Hide check mark
        return error; // error message
    }
    checkMark.style.display = 'block'; // Display check mark
    return true;
}

// Sends input to validation function and
// applies corresponding styles based on result
function checkInput(e){
    const {name, value} = e.target;
    let errors = messages[name];
    let validCheck;

    // CheckConfirm first
    if (name === 'confirm') {
        validCheck = checkConfirm(value, errors);
        if (validCheck === 'exit') return;
    } else if (name === 'password' && value.length < 7) {
        validCheck = errors[errors.length - 1];
    } else {
        // Check requirements
        validCheck = checkRequirements(name, value, errors);
    }
    styleInputs(validCheck, name);
}

// Events for form validation
submit.addEventListener('click', checkPrevious); // submission
// Check first name
inputs.firstName.addEventListener('blur', checkInput);
// Check last name
inputs.lastName.addEventListener('focus', checkPrevious);
inputs.lastName.addEventListener('blur', checkInput);
// Check email
inputs.email.addEventListener('focus', checkPrevious);
inputs.email.addEventListener('blur', checkInput);
// Check phone
inputs.phone.addEventListener('focus', checkPrevious);
inputs.phone.addEventListener('input', formatNumber);
inputs.phone.addEventListener('blur', checkInput);
// Check password
inputs.password.addEventListener('focus', checkPrevious);
inputs.password.addEventListener('blur', checkInput);
// Check password confirmation
inputs.confirm.addEventListener('focus', checkPrevious);
inputs.confirm.addEventListener('input', checkInput);