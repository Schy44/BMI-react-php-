import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this if you are using React Router
import '../style/register.css';

function Register() {
    const [formData, setFormData] = useState({ username: '', password: '', age: '', gender: 'Male' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost/BMI_USING_PHP/BMI-PHP-/php/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error') {
                    setMessage(data.message);
                } else {
                    setMessage(data.message);
                    // Redirect to login page after successful registration
                    setTimeout(() => {
                        navigate('/login'); // Adjust the path based on your routes
                    }, 2000); // Adjust the delay time as needed
                }
            })
            .catch(error => {
                console.error('Error parsing JSON:', error);
                setMessage('An unexpected error occurred.');
            });
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {message && <div className="alert">{message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    className="form-control"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <button type="submit" className="btn btn-primary btn-block">
                    Register
                </button>
            </form>
            {/* Add this section for the login option */}
            <div className="login-redirect">
                <p>Already have an account?</p>
                <button className="btn btn-secondary" onClick={handleLoginRedirect}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Register;
