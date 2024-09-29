document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let isValid = true;

  // Clear previous error messages
  document.getElementById('name-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('message-error').textContent = '';

  // Validación 1: Campos vacíos
  if (!name || !email || !message) {
    if (!name) document.getElementById('name-error').textContent = 'Name is required.';
    if (!email) document.getElementById('email-error').textContent = 'Email is required.';
    if (!message) document.getElementById('message-error').textContent = 'Message is required.';
    isValid = false;
  }

  // Validación 2: Nombre solo letras
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    document.getElementById('name-error').textContent = 'Name must contain only letters';
    isValid = false;
  }

  // Validación 3: Email con @ y termina en .com
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email) || !email.endsWith('.com')) {
    document.getElementById('email-error').textContent = 'Email must be valid and end with .com';
    isValid = false;
  }

  // Validación 4: Longitud máxima de mensaje
  if (message.length > 500) {
    document.getElementById('message-error').textContent = 'Message cannot exceed 500 characters.';
    isValid = false;
  }

  if (isValid) {
    alert('Form is valid and ready to send!');
  }
});

// Contador de caracteres para el textarea
const messageTextarea = document.getElementById('message');
const characterCounter = document.getElementById('char-count');

messageTextarea.addEventListener('input', function () {
  const remaining = 500 - messageTextarea.value.length;
  characterCounter.textContent = `${remaining}/500`;
});