import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Input validation
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
            });

            if (response.status === 201) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    setError('Invalid data provided. Please try again.');
                } else if (err.response.status === 409) {
                    setError('Username already exists. Please choose another.');
                } else {
                    setError('Failed to register. Please try again later.');
                }
            } else {
                setError('Network error. Please check your connection.');
            }
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: 'auto',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2 style={{ textAlign: 'center', color: '#333' }}>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Register
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </div>
    );
}

export default RegisterForm;
