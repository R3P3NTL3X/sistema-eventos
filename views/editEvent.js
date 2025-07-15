import { getCurrentUser } from '../auth.js';
import { getEvents, updateEvent } from '../api.js';
// Función para renderizar el formulario de edición de eventos
export async function renderEditEvent() {
    const app = document.getElementById('app');
    const user = getCurrentUser();

    if (!user || user.role !== 'admin') {
        app.innerHTML = `<h2>No tienes permisos para editar eventos.</h2>`;
        return;
    }
// Obtiene el ID del evento desde los parámetros de la URL
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = params.get('id');
    const events = await getEvents();
    const event = events.find(ev => String(ev.id) === String(id));

    if (!event) {
        app.innerHTML = '<p>Evento no encontrado</p>';
        return;
    }
// Renderiza el formulario de edición
    app.innerHTML = `
        <h2>Editar Evento</h2>
        <form id="edit-event-form">
            <input type="text" name="name" value="${event.name}" required>
            <input type="date" name="date" value="${event.date}" required>
            <input type="number" name="capacity" value="${event.capacity}" required>
            <textarea name="description" required>${event.description || ''}</textarea>
            <button type="submit">save</button>
        </form>
    `;

    document.getElementById('edit-event-form').onsubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const date = e.target.date.value;
        const capacity = e.target.capacity.value;
        const description = e.target.description.value;
        await updateEvent(event.id, { id: event.id, name, date, capacity, description });
        window.location.hash = '/dashboard';
    };
}