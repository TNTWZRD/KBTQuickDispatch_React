import { useEffect, useState } from "react";
import { getDrivers } from "../../apis/driver";
import { useAuth } from "../../utilities/AuthContext";

const DriverList = () => {

    const {user, jwt} = useAuth();
    const [drivers, setDrivers] = useState();

    const fetchDrivers = async () => {
        const [data, error] = await getDrivers(jwt);
        if (error) {
            console.error("Error fetching drivers:", error);
            return;
        }
        setDrivers(data);
    }

    useEffect(() => {
        fetchDrivers();
    })

    return (
        <div className="mx-auto py-8 px-4 w-full sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Driver List</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Driver Name</th>
                        <th className="py-2 px-4 border-b">License Number</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers ? (
                        drivers.map((driver) => (
                            <tr key={driver.id}>
                                <td className="py-2 px-4 border-b">{driver.name}</td>
                                <td className="py-2 px-4 border-b">{driver.license_number}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-4">No drivers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default DriverList;