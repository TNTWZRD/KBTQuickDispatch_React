import NewDriverForm from "../components/drivers/NewDriver_form";
import Modal from "../components/Modal";
import React, { useState } from "react";
import { useAuth } from "../utilities/AuthContext";
import DriverList from "../components/drivers/DriverList";

const Drivers = () => {
    const [showNewDriverModal, setShowNewDriverModal] = useState(false);

    const user = useAuth();

    if (!user || !user.isAuthenticated) {
        return <div className="text-center text-red-500">You must be logged in to manage drivers.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Manage Drivers</h1>
            <div className="flex flex-col mt-4">
                
                <button onClick={() => setShowNewDriverModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add New Driver
                </button>

                {showNewDriverModal && (
                    <Modal onClose={() => setShowNewDriverModal(false)}>
                        <NewDriverForm />
                        {/* <h1 className="text-2xl font-bold mb-6">Add New Driver</h1> */}
                    </Modal>
                )}

                <DriverList />
                
            </div>
        </div>
    );
}
export default Drivers;