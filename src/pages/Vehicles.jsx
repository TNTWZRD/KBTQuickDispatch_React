import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../utilities/AuthContext';
import { getVehicles, updateVehicle, deleteVehicle, addVehicle } from '../apis/vehicle.js';
import UserHelper from '../utilities/UserHelper';
import Modal from '../components/Modal';
import EditVehicleForm from '../components/vehicles/EditVehicle_form.jsx';
import NewVehicleForm from '../components/vehicles/NewVehicle_form.jsx';

const Vehicles = () => {
  const { user, isAuthenticated, jwt } = useAuthContext();
  const user_h = new UserHelper(user);
  const [vehicles, setVehicles] = useState([]);

  const [editVehicleModel, setEditVehicleModel] = useState({
    show: false,
    vehicle: null
  });

  const [addVehicleModel, setAddVehicleModel] = useState({
    show: false,
    vehicle: null
  });

  const fetchVehicles = async () => {
    const [_vehicles, error] = await getVehicles(jwt);
    if (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles(null);
    }
    console.log("Fetched vehicles:", _vehicles);
    setVehicles(_vehicles);
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchVehicles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);


  const handleUpdateVehicleForm = async (vehicleData) => {
    setEditVehicleModel({
      show: false,
      user: null
    });
    console.log("Updating vehicle:", vehicleData);
    const [data, error] = await updateVehicle(jwt, editVehicleModel.vehicle.id, vehicleData);
    if (error) {
      console.error("Error updating vehicle:", error);
      fetchVehicles(); // Optionally refetch users to get the latest data
      return;
    }
    console.log("Vehicle updated successfully:", data);
    fetchVehicles(); // Refetch users to get the latest data
  }

  const handleDeleteVehicle = async (vehicleToDelete) => {
    setEditVehicleModel({
      show: false,
      vehicle: null
    });
    console.log("Deleting vehicle:", vehicleToDelete);
    const [data, error] = await deleteVehicle(jwt, vehicleToDelete.id);
    if (error) {
      console.error("Error deleting vehicle:", error);
      return;
    }
    console.log("Vehicle deleted successfully:", data);
    fetchVehicles(); // Refetch users to get the latest data
  }

  const handleAddVehicle = async (vehicleData) => {
    setAddVehicleModel({
      show: false,
      vehicle: null
    });
    console.log("Adding vehicle:", vehicleData);
    const [data, error] = await addVehicle(jwt, vehicleData);
    if (error) {
      console.error("Error adding vehicle:", error);
      return;
    }
    console.log("Vehicle added successfully:", data);
    fetchVehicles(); // Refetch users to get the latest data
  }


  if (!isAuthenticated) {
    return <div>Please log in to access vehicle management.</div>;
  }

  if (!user_h.isManager()) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
        {/* Edit Vehicle */}
        {editVehicleModel.show && editVehicleModel.vehicle && (
            <Modal onClose={() => setEditVehicleModel({ show: false, vehicle: null})} title={`Edit: ${editVehicleModel.vehicle.nickname}`}>
                <EditVehicleForm vehicle={editVehicleModel.vehicle} onSubmit={handleUpdateVehicleForm} onDelete={handleDeleteVehicle}/>
            </Modal>
        )}

        {/* Add Vehicle */}
        {addVehicleModel.show&& (
            <Modal onClose={() => setEditVehicleModel({ show: false, vehicle: null})} title={`Create Vehicle`}>
                <NewVehicleForm onSubmit={handleAddVehicle}/>
            </Modal>
        )}

        <div className='flex justify-between items-center mb-4'>
            <span className='text-xl font-large p-2 mb-4'>Vehicle Management</span>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setAddVehicleModel({ show: true, vehicle: null })}
            >
            Add Vehicle
            </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nickname</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {console.log("Vehicles:", vehicles)}
            {vehicles && vehicles.map((thisVehicle) => (
                <tr key={thisVehicle.id} onClick={()=>{setEditVehicleModel({ show: true, vehicle: thisVehicle })}}>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{thisVehicle.nickname}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{thisVehicle.status}</td>
                </tr>
            ))}
            </tbody>
        </table>

    </div>
    );
}

export default Vehicles;