
export const getRoles = (role) => {
    let newRoles = []
    newRoles.push('User');
    if ((role & 1) == 1) newRoles.push('Driver');
    if ((role & 2) == 2) newRoles.push('Dispatcher');
    if ((role & 4) == 4) newRoles.push('Manager');
    if ((role & 8) == 8) newRoles.push('Owner');
    if ((role & 16) == 16) newRoles.push('Admin');
    return newRoles;
}