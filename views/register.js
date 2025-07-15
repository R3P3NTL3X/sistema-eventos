import { getUsers, createUser } from '../api.js';

export function renderRegister() {
    const app = document.getElementById('app');
    app.innerHTML = `
       <form id="login-form">
         <h1 class="login">REGISTER</h1>
            <h3>Full name</h3>
            <input type="text" name="name"required>
            <h3>EMAIL</h3>
            <input type="email" name="email" required>
            <h3>Username</h3>
            <input type="text" name="username" required>
            <h3>Password</h3>
            <input type="password" name="password" required>
            <h3>Confirm Password</h3>
            <input type="password" name="confirmPassword" required>
            <button type="submit" class="button">REGISTER NOW</button>
        </form>
    `;

    document.getElementById('register-form').onsubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();
        const password = e.target.password.value;

        // Trae todos los usuarios
        const users = await getUsers();
        // Valida si ya existe el nombre de usuario
        if (users.some(u => u.username === username)) {
            alert('this name is alredy in use. choose another.');
            return;
        }

        await createUser({ username, password, role: 'visitor' });
        alert('¡register sucesfully! U can go our login alredy.');
        window.location.hash = '/login';
    };
}
