import { getEvents } from '../api.js';
import { getCurrentUser } from '../auth.js';
// Función para renderizar la página de inicio
export async function renderHome() {
    const app = document.getElementById('app');
    const events = await getEvents();
    const user = getCurrentUser();

    app.innerHTML = `
    <h2 class="avaliable">AVALIABLE EVENTS</h2>
    <ul>
        ${events.map(ev => `
            <li>
                ${ev.name} - ${ev.date} (Capacidad: ${ev.capacity})<br>
                <span style="color:#555;">${ev.description || ''}</span>
                ${user && user.role === 'visitor' ? `
                    <button onclick="window.registerEvent && window.registerEvent('${ev.id}')">Registrarse</button>
                ` : ''}
            </li>
        `).join('')}
    </ul>
    <div id="my-registrations"></div>
`;

    // Mostrar los registros del usuario visitante
    if (user && user.role === 'visitor') {
        const res = await fetch(`http://localhost:3000/registrations?userId=${user.id}`);
        const registrations = await res.json();
        const myEvents = events.filter(ev => registrations.some(r => String(r.eventId) === String(ev.id)));
        document.getElementById('my-registrations').innerHTML = `
            <h3>Mis registros</h3>
            <ul>
                ${myEvents.map(ev => {
                    // Encuentra el registro correspondiente
                    const reg = registrations.find(r => String(r.eventId) === String(ev.id));
                    return `
                        <li>
                            ${ev.name} - ${ev.date}
                            <button onclick="window.cancelRegistration && window.cancelRegistration('${reg.id}')">Cancelar</button>
                        </li>
                    `;
                }).join('')}
            </ul>
        `;
    }

    // Función global para registrar al usuario en el evento
    window.registerEvent = async (eventId) => {
        const event = events.find(ev => String(ev.id) === String(eventId));
        const res = await fetch(`http://localhost:3000/registrations?eventId=${eventId}`);
        const registrations = await res.json();

        if (registrations.length >= Number(event.capacity)) {
            alert('¡Este evento ya alcanzó su capacidad máxima!');
            return;
        }
        if (registrations.some(r => String(r.userId) === String(user.id))) {
            alert('Ya estás registrado en este evento.');
            return;
        }

        const registration = {
            userId: user.id,
            eventId: event.id
        };
        await fetch('http://localhost:3000/registrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registration)
        });
        alert('¡Registro exitoso!');
        renderHome();
    };

    // Función global para cancelar registro
    window.cancelRegistration = async (registrationId) => {
        await fetch(`http://localhost:3000/registrations/${registrationId}`, {
            method: 'DELETE'
        });
        // Espera breve para asegurar que el backend procese la eliminación
        setTimeout(() => {
            renderHome();
        }, 200);
    };
}