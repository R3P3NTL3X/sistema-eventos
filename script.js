
// Importa las vistas y funciones 
import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderDashboard } from './views/dashboard.js';
import { renderCreateEvent } from './views/createEvent.js';
import { renderEditEvent } from './views/editEvent.js';
import { renderNotFound } from './views/not-found.js';
// Función para manejar el enrutamiento de la aplicación
const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/dashboard': renderDashboard,
    '/dashboard/events/create': renderCreateEvent,
    '/dashboard/events/edit': renderEditEvent,
    '/not-found': renderNotFound
};

function router() {
    const hash = window.location.hash.replace('#', '');
    const path = hash.split('?')[0];
    const user = JSON.parse(localStorage.getItem('user'));

    // Para Mostrar/ocultar enlaces según autenticación
    document.getElementById('login-link').style.display = user ? 'none' : '';
    document.getElementById('register-link').style.display = user ? 'none' : '';
    document.getElementById('logout-link').style.display = user ? '' : 'none';

    const render = routes[path] || renderNotFound;
    render();

document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.hash = '/login';
    router(); // Actualiza el menú inmediatamente
});
}
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);