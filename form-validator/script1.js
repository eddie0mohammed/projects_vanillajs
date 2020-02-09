
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



// INPUT NOT EMPTY VALIDATION

//show success
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
}
//show error
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//getFieldName 
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}

const checkRequired = (arr) => {

    arr.forEach(elem => {
        if (elem.value.trim() === ''){
            //show error
            showError(elem, `${getFieldName(elem)} is required`);

        }else{
            //show success
            showSuccess(elem);

        }
    })
}

// -----------------------

// USERNAME VALIDATION

const checkLength = (input, min, max) => {

    input.parentElement.classList.remove('success');
    input.parentElement.classList.remove('error');

    if (input.value.length < min || input.value.length > max ){
        //show error
        showError(input, `${getFieldName(input)} must be between ${min} and ${max} characters.`);
    }else{
        //show success
        showSuccess(input);
        
    }
}

// EMAIL VALIDATION

// Check email is valid
function checkEmail(input) {

    input.parentElement.classList.remove('success');
    input.parentElement.classList.remove('error');

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }
  
//   PASSWORD VALIDATION

const checkPasswordsMatch = (pass1, pass2) => {

    if (pass2.value.trim() !== ''){

    
        pass2.parentElement.classList.remove('success');
        pass2.parentElement.classList.remove('error');


        let check = true;

        if (pass1.value.length !== pass2.value.length){
            check = false;
        }
        for (let i = 0; i < pass1.length; i++){
            if (pass1[i] !== pass2[i]){
                check = false;
            }
        }

        if (!check ){
            //show error
            showError(pass2, 'Passwords do not match')

        }else{
            // show success
            showSuccess(pass2)
        }
    }
}








//event listeners 

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkEmail(email);

    checkLength(password, 8, 25);
    checkPasswordsMatch(password, password2);
})