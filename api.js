const BASE_URL = 'http://localhost:3000';
// Funciones para autenticación
export async function apiLogin(username, password) {
    const res = await fetch(`${BASE_URL}/users?username=${username}&password=${password}`);
    const users = await res.json();
    return users[0] || null;
}

export async function apiRegister(username, password, role) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, role})
    });
    return await res.json();
}

// CRUD para eventos y registros
export async function getEvents() {
    const res = await fetch(`${BASE_URL}/events`);
    return await res.json();
}

export async function createEvent(event) {
    const res = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    });
    return await res.json();
}

export async function updateEvent(id, event) {
    const res = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    });
    return await res.json();
}

export async function deleteEvent(id) {
    await fetch(`${BASE_URL}/events/${id}`, { method: 'DELETE' });
}
export async function getUsers() {
    const res = await fetch('http://localhost:3000/users');
    return await res.json();
}

export async function createUser(user) {
    const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return await res.json();
}