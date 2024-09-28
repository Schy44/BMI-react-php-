import React, { useState } from 'react';
import '../style/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/BMI_USING_PHP/BMI-PHP-/php/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                // Store the username in localStorage
                localStorage.setItem('username', username);
                // Redirect to the Dashboard
                window.location.href = '/Dashboard';
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {message && <div className="alert">{message}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary btn-block">
                    Login
                </button>
            </form>
            <p className="text-center mt-3">
                Don't have an account? <a href="/register">Register here</a>.
            </p>
        </div>
    );
};

export default Login;
