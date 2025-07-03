import { useEffect, useState } from "react";
import { deleteDriver, getDrivers, updateDriver } from "../../apis/driver";
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
        console.log("Fetched drivers:", data);
        setDrivers(data);
    }

    const [driverEditModel, setDriverEditModel] = useState({
        show: false,
        driver: null
    });

    useEffect(() => {
        fetchDrivers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditDriver = async (driver) => {
        setDriverEditModel({
            show: false,
            driver: null
        });
        if (driver.delete) {
            const [data, error] = await deleteDriver(jwt, driver.driver_id);
            if (error) {
                console.error("Error deleting driver:", error);
                return;
            }
            console.log("Driver deleted successfully:", data);
            // Optionally, you can refetch the drivers or update the state directly
            fetchDrivers();
            return;
        }
        const [data, error] = await updateDriver(jwt, driverEditModel.driver.id, driver);
        if (error) {
            console.error("Error updating driver:", error);
            return;
        }
        console.log("Driver updated successfully:", data);
        // Optionally, you can refetch the drivers or update the state directly
        fetchDrivers();
    }

    return (
        <>
        {(driverEditModel.show) && (
            <Modal onClose={() => setDriverEditModel({ show: false, driver: null }) } title={`Edit: ${driverEditModel.driver.name}`}>
                <EditDriverForm driver={driverEditModel.driver} onSubmit={handleEditDriver}/>
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
                        <th className="py-2 px-4 border-b">Avtive?</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers ? (
                        drivers.map((driver) => (
                            <tr key={driver.id} onClick={() => {
                                setDriverEditModel({ show: true, driver: driver})
                            }} className="cursor-pointer hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{driver.name}</td>
                                <td className="py-2 px-4 border-b">{driver.phone_number}</td>
                                <td className="py-2 px-4 border-b">{driver.status? '✅' : '❌'}</td>
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