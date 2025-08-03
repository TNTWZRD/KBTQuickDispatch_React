import NewDriverForm from "../components/drivers/NewDriver_form";
import Modal from "../components/Modal";
import React, { useState } from "react";
import { useAuthContext } from "../utilities/AuthContext";
import DriverList from "../components/drivers/DriverList";
import { createDriver } from "../apis/driver";

const Drivers = () => {
    const [showNewDriverModal, setShowNewDriverModal] = useState(false);

    const { user, jwt, isAuthenticated } = useAuthContext();

    if (!user || !isAuthenticated) {
        return <div className="text-center text-red-500">You must be logged in to manage drivers.</div>;
    }

    const handleNewDriverSubmit = async (driverData) => {
        setShowNewDriverModal(false);
        console.log("New driver data submitted:", driverData);
        const [data, error] = await createDriver(jwt, driverData);
        if (error) {
            console.error("Error creating driver:", error);
            return;
        }
        console.log("Driver created successfully:", data);
        if (window && window.location) {
            // Simple way to refresh the DriverList by reloading the page
            window.location.reload();
        }
    }

    return (
        <>
        {showNewDriverModal && (
            <Modal onClose={() => setShowNewDriverModal(false)}>
                <NewDriverForm onSubmit={handleNewDriverSubmit}/>
                {/* <h1 className="text-2xl font-bold mb-6">Add New Driver</h1> */}
            </Modal>
        )}
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Manage Drivers</h1>
            <div className="flex flex-col mt-4">
                
                <button onClick={() => setShowNewDriverModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add New Driver
                </button>


                <DriverList />
                
            </div>
        </div>
        </>
    );
}
export default Drivers;