// Recuperation of DOM element
const firstNameError = document.querySelector(".firstName-error");
const lastNameError = document.querySelector(".lastName-error");
const emailError = document.querySelector(".email-error");
const messageError = document.querySelector(".message-error");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const sendBtn = document.querySelector("#send-btn");
const modal = document.querySelector("#contact_modal");
const modalMessageBtn = document.querySelector(".contact_button");
const closeModalMessageBtn = document.querySelector(".close-modal-message");
const formular = document.querySelector("#contactForm");
const successPage = document.querySelector(".success-page");
const closeModalSuccessBtn = document.querySelector(".close-success-page");

// Function to open and close the modal

modalMessageBtn.addEventListener("click", openModalMessage);
function openModalMessage() {
  modal.style.display = "block";
}

closeModalMessageBtn.addEventListener("click", closeModalMessage);
function closeModalMessage() {
  modal.style.display = "none";
}

closeModalSuccessBtn.addEventListener("click", closeSuccessPage);
function closeSuccessPage() {
  successPage.style.display = "none";
  firstNameValidation = false;
  lastNameValidation = false;
  emailValidation = false;
  messageValidation = false;
}

// Creation of validation const
let firstNameValidation = false;
let lastNameValidation = false;
let emailValidation = false;
let messageValidation = false;

// creation of regex for each const
const nameRegex = /^(?=.{2,25}$)[A-Za-zÀ-ÿ]+(?:[- ][A-Za-zÀ-ÿ]+)?$/;
const emailRegex = /^[a-zA-ZÀ-ÿ0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/;
const messageRegex = /^[\s\S]{10,500}$/;

// creation of function for success or error of the input data
const green = "rgb(0, 255, 0)";
const red = "rgb(255, 0, 0)";
const neutral = "#db8876";
const transparent = "0";
const appear = "1";

function successData(elem, errorElem) {
  elem.style.borderColor = green;
  errorElem.style.opacity = transparent;
}

function errorData(elem, errorElem) {
  elem.style.borderColor = red;
  errorElem.style.opacity = appear;
}

function resetData(...elems) {
  elems.forEach((elem) => {
    elem.style.borderColor = neutral;
  });
}

// function of validation for the user input
// firstName
firstName.addEventListener("input", (e) => {
  if (e.currentTarget.value.match(nameRegex)) {
    successData(firstName, firstNameError);
    firstNameValidation = true;
  } else {
    errorData(firstName, firstNameError);
    firstNameValidation = false;
  }
});
// lastName
lastName.addEventListener("input", (e) => {
  if (e.currentTarget.value.match(nameRegex)) {
    successData(lastName, lastNameError);
    lastNameValidation = true;
  } else {
    errorData(lastName, lastNameError);
    lastNameValidation = false;
  }
});
// email
email.addEventListener("input", (e) => {
  if (e.currentTarget.value.match(emailRegex)) {
    successData(email, emailError);
    emailValidation = true;
  } else {
    errorData(email, emailError);
    emailValidation = false;
  }
});
// message
message.addEventListener("input", (e) => {
  if (e.currentTarget.value.match(messageRegex)) {
    successData(message, messageError);
    messageValidation = true;
  } else {
    errorData(message, messageError);
    messageValidation = false;
  }
});

//
sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    firstNameValidation &&
    lastNameValidation &&
    emailValidation &&
    messageValidation
  ) {
    resetData(firstName, lastName, email, message);
    formular.reset();
    modal.style.display = "none";
    successPage.style.display = "flex";
  }
  if (firstNameValidation === false) {
    errorData(firstName, firstNameError);
  }
  if (lastNameValidation === false) {
    errorData(lastName, lastNameError);
  }
  if (emailValidation === false) {
    errorData(email, emailError);
  }
  if (messageValidation === false) {
    errorData(message, messageError);
  }
});
