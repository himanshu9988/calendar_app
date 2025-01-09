import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function EventCalendar() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('accessToken');

                if (!token) {
                    setError('You are not authorized. Please log in.');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/events/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const formattedEvents = response.data.map((event) => ({
                    id: event.id,
                    title: event.title,
                    start: new Date(event.date_time),
                    end: new Date(event.date_time), // Assuming single-day events
                }));

                setEvents(formattedEvents);
            } catch (err) {
                setError('Failed to fetch events. Please try again.');
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div style={{ height: '500px', margin: '20px' }}>
            <h2>Your Event Calendar</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default EventCalendar;
