// import inputs
let alert = document.getElementById("alert");
let password = document.getElementById("password");
let confirmation = document.getElementById("confirm");

confirmation.addEventListener("focus", checkRequirements())
confirmation.addEventListener("input", validate());

function checkRequirements() {
    // if (password.value.length < 7) {
    //     alert.textContent = "Password must contain at least 7 characters"
    //     alert.style.display = "block";
    // } else if (password.value)
    console.log("alert value: " alert.value);
    console.log("alert type: ", typeof alert.value);

}


function validate() {
    // Validate password
    if (password.value !== confirmation.value){
        alert.style.display = "block";
    }
    console.log("alert value: " alert.value);
    console.log("alert type: ", typeof alert.value);
}

/*
.unmatching {
    outline: none;
    border: 2px solid #a23b26;
    border-radius: 4px;
}

#alert {
    display: none;
    color: #a23b26;
    font-size: .8rem;
}
*/