import throttle from 'lodash.throttle'

const STORAGE_KEY = 'feedback-form-state'
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput() {
  const formDataStringified = JSON.stringify({ email: form.email.value, message: form.message.value })
  localStorage.setItem(STORAGE_KEY, formDataStringified)
}

function populateTextarea() {
  if (JSON.parse(localStorage.getItem(STORAGE_KEY))) {
    form.email.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).email;
    form.message.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).message;
  }
}