import { apiLogin, apiRegister } from './api.js';
// Funciones para manejar la autenticación de usuarios
export async function login(username, password) {
    const user = await apiLogin(username, password);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem('user');
}

export async function register(username, password, role) {
    return await apiRegister(username, password, role);
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}