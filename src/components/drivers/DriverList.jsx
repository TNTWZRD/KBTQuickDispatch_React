import { useEffect, useState } from "react";
import { getDrivers } from "../../apis/driver";
import { useAuth } from "../../utilities/AuthContext";
import EditDriverForm from "./EditDriver_form";
import Modal from "../Modal";

const DriverList = () => {

    const {jwt} = useAuth();
    const [drivers, setDrivers] = useState();

    const fetchDrivers = async () => {
        const [data, error] = await getDrivers(jwt);
        if (error) {
            console.error("Error fetching drivers:", error);
            return;
        }
        if (!data || data.length === 0) {
            console.warn("No drivers found.");
            setDrivers(null);
            return;
        }
        setDrivers(data);
    }

    const [showEditDriverModel, setShowEditDriverModel] = useState(false);
    const [editDriverObject, setEditDriverObject] = useState(null);

    useEffect(() => {
        fetchDrivers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditDriver = async (driver) => {
        setEditDriverObject(null);
        setShowEditDriverModel(false);
        console.log("Editing driver:", driver);
    }

    return (
        <>
        {showEditDriverModel && (
            <Modal onClose={() => setShowEditDriverModel(false) } title={`Edit: ${editDriverObject.name}`}>
                <EditDriverForm driver={editDriverObject} onSubmit={handleEditDriver}/>
                {/* <h1 className="text-2xl font-bold mb-6">Add New Driver</h1> */}
            </Modal>
        )}
        <div className="">
            <h1 className="text-2xl font-bold mb-6">Driver List</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Driver Name</th>
                        <th className="py-2 px-4 border-b">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers ? (
                        drivers.map((driver) => (
                            <tr key={driver.id} onClick={() => {
                                setEditDriverObject(driver);
                                setShowEditDriverModel(true);
                            }} className="cursor-pointer hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{driver.name}</td>
                                <td className="py-2 px-4 border-b">{driver.phone_number}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-4">No drivers found. Try adding one?</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}
export default DriverList;