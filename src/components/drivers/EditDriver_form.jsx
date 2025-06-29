
const EditDriverForm = () => {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-6">Edit Driver</h1>
            <form>
                {/* Form fields for editing a driver */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Driver Name</label>
                    <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">License Number</label>
                    <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" />
                </div>
                {/* Add more fields as necessary */}
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update Driver</button>
            </form>
        </div>
    );
}

export default EditDriverForm;