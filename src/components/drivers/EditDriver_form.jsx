import React, { useState } from 'react';
import { useAuth } from '../../utilities/AuthContext';
import UserHelper from '../../utilities/UserHelper';

const EditDriverForm = ({driver: formDriver, onSubmit}) => {

        const { user } = useAuth();
        const user_h = new UserHelper(user);
    
        const [formData, setFormData] = useState({
            name: formDriver.name || '',
            phone_number: formDriver.phone_number || '',
            status: formDriver.status, // Default to 'Active' if not provided
        });

        console.log("EditDriverForm initialized with data:", formData);
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleCheckChange = (e) => {
            const { name, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: checked ? 1 : 0, // Convert checkbox to 1 or 0
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
                <label>
                    <input
                        type="checkbox"
                        name="status"
                        checked={(formData.status == 1) ? true : false}
                        onChange={handleCheckChange}
                        style={{ marginRight: 8 }}
                    />
                    Active
                </label>
            </div>
            <button type="submit" className="p-3 rounded bg-yellow-400 hover:bg-yellow-600">Save Changes</button>
            {user_h.isManager() && (
                <button type="button" className="p-3 rounded bg-red-400 hover:bg-red-600 ml-4" onClick={() => onSubmit({ ...formData, delete: true, driver_id: formDriver.id })}>
                    Delete Driver
                </button>
            )}
        </form>
    );
}

export default EditDriverForm;