import React, { useState } from 'react';
import { useAuthContext } from '../../utilities/AuthContext';

const EditUserForm = ({ user: formUser = {}, onSubmit, onDelete }) => {

    const { user } = useAuthContext();

    const [formData, setFormData] = useState({
        name: formUser.name || '',
        email: formUser.email || '',
        role: formUser.role || '',
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

    // Define roles and their values
    const roles = [
        { label: 'User', value: 0, disabled: true }, // User role is always present and cannot be unchecked
        { label: 'Driver', value: 1, disabled: false }, // Driver role can be checked/unchecked
        { label: 'Dispatcher', value: 2, disabled: false }, // Dispatcher role can be checked/unchecked
        { label: 'Manager', value: 4, disabled: false }, // Manager role can be checked/unchecked
        { label: 'Owner', value: 8, disabled: (!user.roles.includes('owner') && !user.roles.includes('admin')) }, // Admin role can be checked/unchecked, but only if user is admin
        { label: 'Admin', value: 16, disabled: (!user.roles.includes('admin')) }, // Super Admin role can be checked/unchecked, but only if user is super admin
    ];

    // Helper to get checked state from bitmask
    const isRoleChecked = (roleValue) => (formData.role & roleValue) === roleValue;

    // Handle checkbox change
    const handleRoleChange = (roleValue) => {
        setFormData(prev => {
            const currentRole = Number(prev.role) || 0;
            const newRole = isRoleChecked(roleValue)
                ? currentRole & ~roleValue // remove role
                : currentRole | roleValue; // add role
            return { ...prev, role: newRole };
        });
    };

    const handleDeleteUser = (_user) => async () => {
        if (_user.id === formUser.id && !user.roles.includes('manager') && !user.roles.includes('admin') && !user.roles.includes('owner')) {
            alert("You do not have permission to delete this user.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete user ${_user.name}? This action cannot be undone.`)) {
            console.log("Deleting user:", _user);
            onDelete(_user);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
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
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>Roles:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                    {roles.map(role => (
                        <label className={`${(role.disabled)? 'hidden': '' }`} key={role.value} style={(!role.disabled)?{ display: 'flex', alignItems: 'center', gap: 8 }:{}}>
                            <input
                                type="checkbox"
                                checked={isRoleChecked(role.value)}
                                onChange={() => handleRoleChange(role.value)}
                            />
                            {role.label}
                        </label>
                    ))}
                </div>
            </div>
            <button type="submit" className="p-3 rounded bg-yellow-400 hover:bg-yellow-600">Save Changes</button>
            {console.log("formUser.id", formUser.id, "user.id", user.id)}
            {console.log("formUser", formUser, "user", user)}
            <button type="button" onClick={handleDeleteUser(formUser)} className={`p-3 rounded bg-red-400 hover:bg-reg-500 ms-2 ${(formUser.id == user.id || !(user.roles.includes('manager') || user.roles.includes('admin') || user.roles.includes('owner')))? 'hidden': ''}`}>Delete</button>
        </form>
        </>
    );
};

export default EditUserForm;