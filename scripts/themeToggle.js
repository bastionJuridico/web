export function setupThemeToggle(mainSelector) {
  const main = document.querySelector(mainSelector);
  const divContainer = document.createElement('div');
  divContainer.id = 'theme-toggle-container';
  main.insertBefore(divContainer, main.firstChild);

  // Botón de cambio de tema
  const btnToggle = document.createElement('button');
  btnToggle.id = 'btn-theme-toggle';
  btnToggle.setAttribute('aria-label', 'Cambiar tema claro/oscuro');

  // Botón volver al principio
  const btnTop = document.createElement('button');
  btnTop.id = 'btn-back-to-top';
  btnTop.innerHTML = `<span class="material-icons">vertical_align_top</span>`;
  btnTop.setAttribute('aria-label', 'Volver al principio de la página');

  divContainer.appendChild(btnToggle);
  divContainer.appendChild(btnTop);

  const body = document.body;

  // Función para actualizar el ícono del botón según el tema
  function updateButtonIcon() {
    if (body.classList.contains('dark-theme')) {
      // Modo oscuro activo: mostrar ícono de sol (para cambiar a claro)
      btnToggle.innerHTML = `<span class="material-icons">light_mode</span>`;
      btnToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      // Modo claro activo: mostrar ícono de luna (para cambiar a oscuro)
      btnToggle.innerHTML = `<span class="material-icons">dark_mode</span>`;
      btnToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  // Comprobar tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-theme');
  }

  updateButtonIcon();

  btnToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    updateButtonIcon();
  });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
