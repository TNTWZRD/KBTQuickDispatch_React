import { useEffect, useState } from 'react';
import { useAuth } from '../utilities/AuthContext';
import UserHelper from '../utilities/UserHelper';
import { getRoles } from '../utilities/userUtils';
import { getUsers } from '../apis/management';
import Modal from '../components/Modal';
import EditUserForm from '../components/users/EditUser_form';

const Users = () => {

  const { user, isAuthenticated, jwt } = useAuth();
  const user_h = new UserHelper(user);
  const [users, setUsers] = useState([]);

  const [showEditUserModel, setShowNewDriverModal] = useState(false);
  const [editUserObject, setEditUserObject] = useState(null);

  const fetchUsers = async () => {
    try {
      const [_users, _error] = await getUsers(jwt);
      setUsers(_users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers(null);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);


  const handleUpdateUserForm = async (userData) => {
    alert("Update user form submitted with data: " + JSON.stringify(userData));
  }

  const handleDeleteUser = async (userToDelete) => {
    setShowNewDriverModal(false);
    setEditUserObject(null);
    console.log("Deleting user:", userToDelete);

  }


  if (!isAuthenticated) {
    return <div>Please log in to access user management.</div>;
  }

  if (!user_h.isManager()) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      {showEditUserModel && (
          <Modal onClose={() => setShowNewDriverModal(false)} title={`Edit: ${editUserObject.name}`}>
              <EditUserForm user={editUserObject} onSubmit={handleUpdateUserForm} onDelete={handleDeleteUser}/>
          </Modal>
      )}
      <span className='text-xl font-large p-2 mb-4'>User Management</span>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block">Roles</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users != null && users.map((thisUser) => (
            <tr key={thisUser.id} onClick={()=>{setEditUserObject(thisUser); setShowNewDriverModal(true)}}>
            {console.log("User:", thisUser)}
            {console.log("User roles ", thisUser.name, ': ', getRoles(thisUser.role))}
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{thisUser.username}</td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{thisUser.email}</td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:block">
                {thisUser != null && getRoles(thisUser.role).map(role => (
                  <span key={role} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {role}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Users;