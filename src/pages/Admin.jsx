import React from 'react';
import { useAuthContext } from '../utilities/AuthContext';

const Admin = () => {

  const { user } = useAuthContext();
  if (!user) {
    return <div>Please log in to access settings.</div>;
  }
  if (!user.roles || !user.roles.includes('admin')) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      <h1>Settings Management</h1>
      <p>This page will allow you to manage Settings.</p>
      {/* Add user management components here */}
    </div>
  );
}

export default Admin;