const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const name = document.querySelector('.name');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');


openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

function show() {
  mainMenu.style.display = 'flex';
  mainMenu.style.top = '0';
}

function close() {
  mainMenu.style.top = '-150%';
}
function validateAndSubmit() {
  // Validate the form
  if (validateForm()) {
    // If validation passes, you can submit the form or perform other actions
    alert('Form submitted successfully!');
  }
}

function validateForm() {
  // Clear previous error messages
  clearErrorMessages();

  // name
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'PLEASE CHECK';
    return false;
  }

  // email
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'PLEASE CHECK';
    return false;
  }

  // phone
  const phoneInput = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneError.textContent = 'PLEASE CHECK';
    return false;
  }

  // message
  const messageInput = document.getElementById('message');
  const messageError = document.getElementById('messageError');
  if (messageInput.value.trim() === ' ') {
    messageError.textContent = 'PLEASE CHECK';
    return false;
  }
  return true;
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = 'PLEASE CHECK';
  });
}