import { login } from '../auth.js';
// Función para renderizar la página de inicio de sesión
export function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <form id="login-form">
         <h1 class="login">Login</h1>
         <p>username</p>
            <input type="text" name="username" required>
            <p>password</p>
            <input type="password" name="password" required>
            <button type="submit" class="button">Sing in</button>
        </form>
    `;
    document.getElementById('login-form').onsubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const ok = await login(username, password);
        if (ok) window.location.hash = '/dashboard';
        else alert('thats username or password is incorrect');
    };
}