import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './EventForm';

function EventList() {
    const [events, setEvents] = useState([]);
    const [eventToEdit, setEventToEdit] = useState(null); 

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('http://localhost:8000/api/events/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    const handleEventAdded = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    const handleEventUpdated = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
        setEventToEdit(null);
    };

    const deleteEvent = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`http://localhost:8000/api/events/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    const handleEditClick = (event) => {
        setEventToEdit(event);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Your Events</h1>
            <EventForm
                onEventAdded={handleEventAdded}
                eventToEdit={eventToEdit}
                onEventUpdated={handleEventUpdated}
            />
            <ul>
                {events.map((event) => (
                    <li key={event.id} className="event-item">
                        <div>
                            <strong>{event.title}</strong> - {new Date(event.date_time).toLocaleString()}
                            <p>{event.description}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEditClick(event)}
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button onClick={() => deleteEvent(event.id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
