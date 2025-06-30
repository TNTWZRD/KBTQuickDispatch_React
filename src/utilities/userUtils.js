
export const getRoles = (role) => {
    let newRoles = []
    if (role & 1 == 1) newRoles.push('Driver');
    if (role & 2 == 2) newRoles.push('Dispatcher');
    if (role & 4 == 4) newRoles.push('Manager');
    if (role & 8 == 8) newRoles.push('Admin');
    if (role == 0 || role == null || role == undefined) {
        newRoles.push('User');
    }
    return newRoles;
}