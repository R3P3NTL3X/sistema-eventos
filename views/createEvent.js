import { getCurrentUser } from '../auth.js';
import { createEvent } from '../api.js';

// Función para renderizar el formulario de creación de eventos
export function renderCreateEvent() {
    const app = document.getElementById('app');
    const user = getCurrentUser();

    // Solo los administradores pueden crear eventos
    if (!user || user.role !== 'admin') {
        app.innerHTML = `<h2>U dont has the permissions for do this action.</h2>`;
        return;
    }

    // Renderiza el formulario de creación de eventos
    app.innerHTML = `
        <h2>Create event</h2>
        <form id="create-event-form">
            <input type="text" name="name" placeholder="name" required>
            <input type="date" name="date" required>
            <input type="number" name="capacity" placeholder="Capacity" required>
            <textarea name="description" placeholder="Description" required></textarea>
            <button type="submit">Create</button>
        </form>
    `;

    // Maneja el envío del formulario
    document.getElementById('create-event-form').onsubmit = async (e) => {
        e.preventDefault(); 
        //Obtiene los valores del formulario
        const name = e.target.name.value; 
        const date = e.target.date.value; 
        const capacity = e.target.capacity.value; 
        const description = e.target.description.value; 

        // Llama a la función para crear el evento en la base de datos
        await createEvent({ name, date, capacity, description });

        // Redirige al dashboard después de crear el evento
        window.location.hash = '/dashboard';
    };
}