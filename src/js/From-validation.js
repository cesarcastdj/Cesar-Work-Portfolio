document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();  // Evitar el envío predeterminado

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const submitButton = document.querySelector('.btn-form');

  let isValid = true;

  // Limpiar mensajes de error anteriores
  document.getElementById('name-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('message-error').textContent = '';
  document.getElementById('form-success').textContent = '';

  // Validar Nombre: No vacío y solo letras
  const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  if (!name || /\d/.test(name)) {
    document.getElementById('name-error').textContent = 'The name is required and cannot contain numbers.';
    isValid = false;
  } else if (!nameRegex.test(name)) {
    document.getElementById('name-error').textContent = 'Name must contain only letters.';
    isValid = false;
  }

  // Validar Email: Contiene "@" y termina en ".com"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.includes('@') || !email.endsWith('.com')) {
    document.getElementById('email-error').textContent = 'Email must contain "@" and end with ".com".';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Validar Mensaje: Máx 500 caracteres
  if (message.length > 500) {
    document.getElementById('message-error').textContent = 'Message cannot exceed 500 characters.';
    isValid = false;
  }

  // Si el formulario es válido, deshabilitar el botón y enviar
  if (isValid) {
    submitButton.disabled = true; // Deshabilitar botón al enviar
    document.getElementById('form-success').textContent = 'Form is valid and sending...';

    try {
      const response = await fetch('https://formspree.io/f/xldrqvla', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      });

      if (response.ok) {
        document.getElementById('form-success').textContent = 'Your message has been sent successfully!';
        document.getElementById('contactForm').reset();  // Reiniciar el formulario
      } else {
        const data = await response.json();
        document.getElementById('form-success').textContent = 'Error sending message.';
      }
    } catch (error) {
      document.getElementById('form-success').textContent = 'There was an error sending the message.';
    } finally {
      submitButton.disabled = false; // Rehabilitar botón después del envío
    }
    console.log(response);
  }
});

// Contador de caracteres para el textarea
const messageTextarea = document.getElementById('message');
const characterCounter = document.getElementById('char-count');

messageTextarea.addEventListener('input', function () {
  const remaining = 500 - messageTextarea.value.length;
  characterCounter.textContent = `${remaining}/500`;

  if (remaining < 0) {
    messageTextarea.value = messageTextarea.value.substring(0, 500);
    characterCounter.textContent = `0/500`;
    document.getElementById('message-error').textContent = 'Message cannot exceed 500 characters.';
  } else {
    document.getElementById('message-error').textContent = '';
  }
});