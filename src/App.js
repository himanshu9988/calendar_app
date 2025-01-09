import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventCalendar from './components/EventCalendar';
import './styles.css'; // Ensure to import the updated styles

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/calendar" /> : <LoginForm onLogin={handleLogin} />}
                />
                <Route
                    path="/register"
                    element={isLoggedIn ? <Navigate to="/calendar" /> : <RegisterForm />}
                />
                <Route
                    path="/calendar"
                    element={isLoggedIn ? <CalendarPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/event-calendar"
                    element={isLoggedIn ? <EventCalendarPage /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

const WelcomePage = () => (
    <div className="welcome-container">
        <h1>Welcome to the Calendar App</h1>
        <p>Organize your events easily with a personalized calendar.</p>
        <a href="/login" className="button-link">Login</a>
        <a href="/register" className="button-link">Register</a>
    </div>
);

const CalendarPage = () => (
    <div>
        <h1>Calendar</h1>
        <EventList />
        
    </div>
);

const EventCalendarPage = () => (
    <div>
        <h1>Your Event Calendar</h1>
        <EventCalendar />
    </div>
);

export default App;
