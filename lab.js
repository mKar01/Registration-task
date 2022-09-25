const loginForm = document.querySelector(".login-form")
const regForm = document.querySelector(".reg-form")
const mail = document.getElementById("mail-input")
const password = document.getElementById("password-input")
const passwordConfirm = document.getElementById("password-input-confirm")
const loginMailInput = document.getElementById("login-mail-input")
const loginPasswordInput = document.getElementById("login-password-input")
const switchButtonStyle = document.getElementById("switch-button")
const switchHeaderText = document.getElementById("header-text")
const firstName = document.getElementById("first-name-input")
const lastName = document.getElementById("last-name-input")
const dob = document.getElementById("dob")
const genderMale = document.getElementById("male")
const genderFemale = document.getElementById("female")
const resetPassword = document.getElementById("reset-password")
const newPassword = document.getElementById("new-password")
const newPasswordConfirm = document.getElementById("re-new-password")
const genderLabel = document.querySelectorAll(".gender-label")
const profile = document.querySelector(".profile")
const bar = document.querySelector(".bar")
const profileEmail = document.querySelector(".profile-email")
const profileFirstName = document.querySelector(".profile-first-name")
const localStorageKey = "users"
let switchButton = false
const regForFirstName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/
const regForLastName = /(^[a-zA-Z][a-zA-Z\s]{0,50}[a-zA-Z]$)/
const regForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regForPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
if (!localStorage.getItem("users")) {
    localStorage.setItem("users",JSON.stringify([]))
}
if (!(JSON.parse(localStorage.getItem("users")).length === 0)) {
    switchButtonStyle.textContent = "Register"
    switchButton = true
    switchFormLogin()
}
if (localStorage.getItem("Active user")) {
    switchFormProfile()
    let users = JSON.parse(localStorage.getItem(localStorageKey))
    users.forEach(userObj => {
        if (userObj.mail === localStorage.getItem("Active user")) {
            profileInfo(userObj)
        }
    })
}
let user = {
    mail: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: ''
}


function cipherCaesar(str) {
    let newStr = "";
    for(let i = 0;i < str.length;i++){
        if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 122){
            newStr += String.fromCharCode((str.charCodeAt(i) + 13 - 65) % 26 + 65);
        }else{
            newStr += String.fromCharCode(str.charCodeAt(i));
        }
    }
    return newStr;
}


function mailValidation() {
    if (regForEmail.test(mail.value)){
        user.mail = mail.value
        mail.style.borderColor = "green"
        return true
    }
    else {
        mail.style.borderColor = "red"
        return false
    }
}


function passwordValidation() {
    if (regForPass.test(password.value)){
        user.password = password.value
        password.style.borderColor = "green"
        return true
    }
    else {
        password.style.borderColor = "red"
        return false
    }
}


function rePasswordValidation() {
    if (password.value === passwordConfirm.value && password.value){
        passwordConfirm.style.borderColor = "green"
        return true
    }
    else {
        passwordConfirm.style.borderColor = "red"
        return false
    }
}


function firstNameValidation() {
    if (regForFirstName.test(firstName.value)){
        user.firstName = firstName.value
        firstName.style.borderColor = "green"
        return true
    }
    else {
        firstName.style.borderColor = "red"
        return false
    }
}

function lastNameValidation() {
    if (regForLastName.test(lastName.value)){
        user.lastName = lastName.value
        lastName.style.borderColor = "green"
        return true
    }
    else {
        lastName.style.borderColor = "red"
        return false
    }
}


function dobValidation() {
    if (getAge(dob.value) >= 12){
        user.dob = dob.value
        dob.style.borderColor = "green"
        return true
    }
    else {
        dob.style.borderColor = "red"
        return false
    }
}
function getAge(DOB) {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function genderValidation() {
    if (genderMale.checked) {
        user.gender = genderMale.value
        genderLabel.forEach(label => {
            label.style.color = "black"
        })
        return true
    }
    else if (genderFemale.checked){
        user.gender = genderFemale.value
        genderLabel.forEach(label => {
            label.style.color = "black"
        })
        return true
    }
    else {
        genderLabel.forEach(label => {
            label.style.color = "red"
        })
        return false
    }
}


function userExistValidation() {
    let usersArr = JSON.parse(localStorage.getItem("users"))
    if (usersArr.some(user => user.mail.toUpperCase() === mail.value.toUpperCase()) || mail.value.length === 0){
        mail.style.borderColor = "red"
        return true
    }
    else {
        mail.style.borderColor = "green"
        return false
    }
}



function registration(event) {
    event.preventDefault()
    let isEmailValid = mailValidation()
    let isPasswordValid = passwordValidation()
    let isRePasswordValid = rePasswordValidation()
    let isFirstNameValid = firstNameValidation()
    let isLastNameValid = lastNameValidation()
    let isDobValid = dobValidation()
    let isGenderValid = genderValidation()
    let isUserExistValid = userExistValidation()
    if (isEmailValid && isPasswordValid && isRePasswordValid && isFirstNameValid && isLastNameValid && isDobValid && isGenderValid && !isUserExistValid){
        user.password = cipherCaesar(password.value)
        let localStorageData = localStorage.getItem(localStorageKey)
        let users = localStorageData ? JSON.parse(localStorageData) : []
        users.push(user)
        localStorage.setItem("users",JSON.stringify(users))
    }
    clearInputValue()
}


function login(event) {
    event.preventDefault()
    let users = JSON.parse(localStorage.getItem(localStorageKey));
    users.forEach(userObj => {
        if (userObj.mail === loginMailInput.value && userObj.password === cipherCaesar(loginPasswordInput.value)){
            localStorage.setItem("Active user", userObj.mail)
            switchFormProfile(userObj.mail)
            profileInfo(userObj)
        }
    })
    clearInputValue()
}


function clearInputValue() {
    loginMailInput.value = ""
    loginPasswordInput.value = ""
    password.value = ""
    passwordConfirm.value = ""
    mail.value = ""
    firstName.value = ""
    lastName.value = ""
    dob.value = ""
}


function logOut() {
    localStorage.removeItem("Active user")
    switchFormLogin()
}


function switchFormRegister() {
    loginForm.style.display = "none";
    bar.style.display = "flex"
    regForm.style.display = "flex";
}


function switchFormLogin() {
    regForm.style.display = "none";
    profile.style.display = "none"
    bar.style.display = "flex"
    loginForm.style.display = "flex";
    switchHeaderText.textContent = "REGISTRATION FORM"
}


function switchFormProfile() {
    loginForm.style.display = "none"
    regForm.style.display = "none"
    bar.style.display = "none"
    profile.style.display = "flex"
    switchHeaderText.textContent = "PROFILE FORM"
}

function profileInfo(userObj) {
    profileEmail.textContent = userObj.mail
    profileFirstName.textContent = userObj.firstName
}


function switchForm() {
    if (switchButton){
        switchButton = false
        switchButtonStyle.textContent = "Login"
        return switchFormRegister()
    }
    else if(!switchButton){
        switchButton = true
        switchButtonStyle.textContent = "Register"
        return switchFormLogin()
    }
}

function resetUserPassword(event) {
    event.preventDefault()
    let isNewPasswordValid = resetNewPasswordValidation()
    let isNewRePasswordValid = resetReNewPasswordValidation()
    let users = JSON.parse(localStorage.getItem(localStorageKey))
    users.forEach(userObj =>{
        if (userObj.mail === localStorage.getItem("Active user") && userObj.password === cipherCaesar(resetPassword.value) && isNewPasswordValid && isNewRePasswordValid){
            userObj.password = cipherCaesar(newPassword.value)
            localStorage.setItem("users",JSON.stringify(users))
        }
    })
    resetPassword.value = ""
    newPassword.value = ""
    newPasswordConfirm.value = ""
}


function resetNewPasswordValidation() {
    if (regForPass.test(newPassword.value)){
        newPassword.style.borderColor = "green"
        return true
    }
    else {
        newPassword.style.borderColor = "red"
        return false
    }
}


function resetReNewPasswordValidation() {
    if (newPassword.value === newPasswordConfirm.value && newPassword.value){
        newPasswordConfirm.style.borderColor = "green"
        return true
    }
    else {
        newPasswordConfirm.style.borderColor = "red"
        return false
    }
}


