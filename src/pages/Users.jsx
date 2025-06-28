import React from 'react';
import { useAuth } from '../utilities/AuthContext';
import UserHelper from '../utilities/UserHelper';

const Users = () => {

  const { user, isAuthenticated } = useAuth();
  const user_h = new UserHelper(user);

  if (!isAuthenticated) {
    return <div>Please log in to access user management.</div>;
  }

  if (!user_h.isManager()) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      <h1>Users Management</h1>
      <p>This page will allow you to manage users.</p>
      {/* Add user management components here */}
    </div>
  );
}

export default Users;