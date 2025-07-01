import React, { useState } from 'react';
import { useAuth } from '../../utilities/AuthContext';
import UserHelper from '../../utilities/UserHelper';

const EditDriverForm = ({driver: formDriver, onSubmit}) => {

        // eslint-disable-next-line no-unused-vars
        const { user } = useAuth();
    
        const [formData, setFormData] = useState({
            name: formDriver.name || '',
            phone_number: formDriver.phone_number || '',
            status: formDriver.status || 'Active', // Default to 'Active' if not provided
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
            <h2>Edit Driver</h2>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Phone Number:
                    <input
                        type="phone"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>Status:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="Active"
                            checked={formData.status === "Active"}
                            onChange={handleChange}
                        />
                        Active
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="Inactive"
                            checked={formData.status === "Inactive"}
                            onChange={handleChange}
                        />
                        Inactive
                    </label>
                </div>
            </div>
            <button type="submit" className="p-3 rounded bg-yellow-400 hover:bg-yellow-600">Save Changes</button>
        </form>
    );
}

export default EditDriverForm;