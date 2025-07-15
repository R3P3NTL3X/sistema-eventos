import { getCurrentUser } from '../auth.js';
import { getEvents, deleteEvent } from '../api.js';

// Función para renderizar el dashboard
export async function renderDashboard() {
    const app = document.getElementById('app');
    const user = getCurrentUser();
    const events = await getEvents();

    // Obtener todos los registros
    const res = await fetch('http://localhost:3000/registrations');
    const registrations = await res.json();

app.innerHTML = `
    <h2 class="welcome">Welcome, ${user.username}</h2>
    ${user.role === 'admin' ? `<a href="#/dashboard/events/create" class="btn-create">+ Crear Evento</a>` : ''}
    <div class="event-list">
        ${events.map(ev => {
            const count = registrations.filter(r => r.eventId === ev.id).length;
            return `
            <div class="event-card">
                <div class="event-title">${ev.name}</div>
                <div class="event-date">${ev.date}</div>
                <div class="event-desc">${ev.description || ''}</div>
                <div class="event-capacity">Registrados: ${count}/${ev.capacity}</div>
                ${
                    user.role === 'admin'
                    ? `<div class="event-actions">
                        <a href="#/dashboard/events/edit?id=${ev.id}" class="icon-btn" title="Editar">
                            <svg width="18" height="18" fill="none" stroke="#007aff" stroke-width="2" viewBox="0 0 24 24">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/>
                            </svg>
                        </a>
                        <button onclick="window.deleteEvent && window.deleteEvent('${ev.id}')" class="icon-btn" title="Eliminar">
                            <svg width="18" height="18" fill="none" stroke="#d32f2f" stroke-width="2" viewBox="0 0 24 24">
                              <path d="M3 6h18"/>
                              <path d="M8 6v14h8V6"/>
                              <path d="M10 10v6"/>
                              <path d="M14 10v6"/>
                              <path d="M5 6V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>`
                    : ''
                }
            </div>
            `;
        }).join('')}
    </div>
`;}
window.deleteEvent = async (id) => {
    await deleteEvent(id);
    renderDashboard();
};