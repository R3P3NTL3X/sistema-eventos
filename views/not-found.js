// Función para renderizar la página de error 404
export function renderNotFound() {
    const app = document.getElementById('app');
    app.innerHTML = `<h2>Page not found</h2>`;
}