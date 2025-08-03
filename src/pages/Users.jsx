import { useEffect, useState } from 'react';
import { useAuthContext } from '../utilities/AuthContext';
import UserHelper from '../utilities/UserHelper';
import { getRoles } from '../utilities/userUtils';
import { getUsers } from '../apis/management';
import Modal from '../components/Modal';
import EditUserForm from '../components/users/EditUser_form';
import { deleteUser, updateUser } from '../apis/user';

const Users = () => {

  const { user, isAuthenticated, jwt } = useAuthContext();
  const user_h = new UserHelper(user);
  const [users, setUsers] = useState([]);

  const [editUserModel, setEditUserModel] = useState({
    show: false,
    user: null
  });

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
    setEditUserModel({
      show: false,
      user: null
    });
    console.log("Updating user:", userData);
    const [data, error] = await updateUser(jwt, editUserModel.user.id, userData);
    if (error) {
      console.error("Error updating user:", error);
      fetchUsers(); // Optionally refetch users to get the latest data
      return;
    }
    console.log("User updated successfully:", data);
    fetchUsers(); // Refetch users to get the latest data
    // Optionally, you can refetch the users or update the state directly
  }

  const handleDeleteUser = async (userToDelete) => {
    setEditUserModel({
      show: false,
      user: null
    });
    console.log("Deleting user:", userToDelete);
    const [data, error] = await deleteUser(jwt, userToDelete.id);
    if (error) {
      console.error("Error deleting user:", error);
      return;
    }
    console.log("User deleted successfully:", data);
    fetchUsers(); // Refetch users to get the latest data
  }


  if (!isAuthenticated) {
    return <div>Please log in to access user management.</div>;
  }

  if (!user_h.isManager()) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      {editUserModel.show && (
          <Modal onClose={() => setEditUserModel({ show: false, user: null})} title={`Edit: ${editUserModel.user.name}`}>
              <EditUserForm user={editUserModel.user} onSubmit={handleUpdateUserForm} onDelete={handleDeleteUser}/>
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
            <tr key={thisUser.id} onClick={()=>{setEditUserModel({ show: true, user: thisUser })}}>
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