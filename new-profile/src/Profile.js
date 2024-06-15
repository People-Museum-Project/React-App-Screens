// src/Profile.js
import React, { useState } from 'react';

function Profile() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem', 
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
    };

    const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
    };

    const inputStyle = {
        padding: '0.5rem',
        fontSize: '1rem',
    };

    return (
        <div>
            <h2>Create New Profile</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={inputStyle}>Create Profile</button>
            </form>
        </div>
    );
}

export default Profile;
