import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventForm({ onEventAdded, eventToEdit, onEventUpdated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (eventToEdit) {
            setTitle(eventToEdit.title);
            setDescription(eventToEdit.description);
            setDateTime(eventToEdit.date_time);
        } else {
            setTitle('');
            setDescription('');
            setDateTime('');
        }
    }, [eventToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('accessToken');
            const url = eventToEdit
                ? `http://localhost:8000/api/events/${eventToEdit.id}/`
                : 'http://localhost:8000/api/events/';
            const method = eventToEdit ? 'put' : 'post';

            const response = await axios[method](
                url,
                { title, description, date_time: dateTime },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200 || response.status === 201) {
                setSuccess(eventToEdit ? 'Event updated successfully!' : 'Event added successfully!');
                if (eventToEdit) {
                    onEventUpdated(response.data);
                } else {
                    onEventAdded(response.data);
                }
                setTitle('');
                setDescription('');
                setDateTime('');
            }
        } catch (err) {
            setError('Failed to save event. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="event-form">
            <h2>{eventToEdit ? 'Edit Event' : 'Add New Event'}</h2>
            <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
            />
            <button type="submit">{eventToEdit ? 'Update Event' : 'Add Event'}</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </form>
    );
}

export default EventForm;
