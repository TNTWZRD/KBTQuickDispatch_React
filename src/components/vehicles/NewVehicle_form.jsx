import React, { useState } from 'react';

const NewVehicleForm = ({onSubmit}) => {

    const [formData, setFormData] = useState({
        nickname: '',
        license_plate: '',
        make: '',
        model: '',
        year: '',
        color: '',
        vin: '',
        description: '',
        short_notes: '',
        status: 1
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
        <>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Nickname:
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    License Plate:
                    <input
                        type="text"
                        name="license_plate"
                        value={formData.license_plate}
                        onChange={handleChange}
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Make:
                    <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Model:
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Year:
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Color:
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    VIN:
                    <input
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleChange}
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Short Notes:
                    <input
                        type="text"
                        name="short_notes"
                        value={formData.short_notes}
                        onChange={handleChange}
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Status:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{ width: '100%', backgroundColor: "white", borderRadius: '4px', padding: '8px' }}
                    >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                </label>
            </div>

            <button type="submit" className="p-3 rounded bg-yellow-400 hover:bg-yellow-600">Create Vehicle</button>
        </form>
        </>
    );
};

export default NewVehicleForm;