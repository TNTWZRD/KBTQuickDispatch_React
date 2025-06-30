import React, { useState } from 'react';

const EditUserForm = ({ user = {}, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Edit User</h2>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", rounded: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", rounded: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Role:
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", rounded: '4px', padding: '8px' }}
                    >
                        <option value="">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="dispatcher">Dispatcher</option>
                        <option value="driver">Driver</option>
                        <option value="user">User</option>
                    </select>
                </label>
            </div>
            <button type="submit" className=" p-3 rounded bg-yellow-400 hover:bg-yellow-600">Save Changes</button>
        </form>
    );
};

export default EditUserForm;