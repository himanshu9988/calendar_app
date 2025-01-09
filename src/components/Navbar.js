import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    };

    return (
        <nav>
            <Link to="/events">Events</Link>
            <Link to="/create-event">Create Event</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;
