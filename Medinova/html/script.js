// Función para redirigir al dashboard
function redirectToDashboard(event) {
  event.preventDefault();
  window.location.href = "dashboard.html";
}

// Función para alternar la visibilidad de la contraseña
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const passwordIcon = document.querySelector('.toggle-password');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordIcon.textContent = ' 👁️‍🗨️'; // Cambia a icono de ocultar
  } else {
    passwordInput.type = 'password';
    passwordIcon.textContent = '👁️‍🗨️'; // Cambia a icono de mostrar
  }
}











const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});