// import inputs
let message = document.getElementById("alert");
let password = document.getElementById("password");
let confirmation = document.getElementById("confirm");
let checkMark = document.getElementById("valid");

password.addEventListener("blur", checkRequirements);
confirmation.addEventListener("input", validate);

function checkRequirements() {
    console.log(checkMark);
    // console.log(checkMark.style.display);
    if (password.value.length < 7) {
        password.className = "unmatching";
        message.textContent = "* Password must contain at least 7 characters"
        message.style.display = "block";
        return false;
    } else if (!password.value.match(/[a-z]/)){
        password.className = "unmatching";
        message.textContent = "* Password must contain at least 1 lowercase letter"
        message.style.display = "block";
        return false;
    } else if (!password.value.match(/[A-Z]/)){
        password.className = "unmatching";
        message.textContent = "* Password must contain at least 1 uppercase letter"
        message.style.display = "block";
        return false;
    } else if (!password.value.match(/[0-9]/)){
        password.className = "unmatching";
        message.textContent = "* Password must contain at least 1 number"
        message.style.display = "block";
        return false;
    } else if (!password.value.match(/[!@#$%^&*()_+=~`{}|;:'"/?.>,<-]/)){
        password.className = "unmatching";
        message.textContent = "* Password must contain at least 1 special character"
        message.style.display = "block";
        return false;
    } 
    message.textContent = "";
    message.style.display = "none";
    password.classList.remove("unmatching");
    return true;
}

function validate() {
    // if not matching
    if (password.value !== confirmation.value){
        password.className = "unmatching";
        confirmation.className = "unmatching";
        message.textContent = "* Passwords do not match";
        message.style.display = "block";
        checkMark.style.display = "none";
        return;
    }
    // If matching
    password.classList.remove("unmatching");
    confirmation.classList.remove("unmatching");
    message.textContent = "";
    checkMark.style.display = "block";
    return;
}

/*
.unmatching {
    outline: none;
    border: 2px solid #a23b26;
    border-radius: 4px;
}

.valid


#alert {
    display: none;
    color: #a23b26;
    font-size: .8rem;
}
*/