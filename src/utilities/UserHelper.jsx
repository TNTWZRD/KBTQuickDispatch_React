export class UserHelper {
    constructor(user) {
        this.user = user;
        this.isDriver = this.isDriver.bind(this);
        this.isDispatcher = this.isDispatcher.bind(this);
        this.isManager = this.isManager.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.isSuperAdmin = this.isSuperAdmin.bind(this);
        this.namePlural = this.namePlural.bind(this);
        this.userNamePlural = this.userNamePlural.bind(this);
    }
    isDriver = () =>  {
        return this.user.roles.includes('driver');
    }
    isDispatcher = () => {
        return this.user.roles.includes('dispatcher') || this.isManager() || this.isAdmin() || this.isSuperAdmin();
    }
    isManager = () => {
        return this.user.roles.includes('manager') || this.isAdmin() || this.isSuperAdmin();
    }
    isAdmin = () => {
        return this.user.roles.includes('admin') || this.isSuperAdmin();
    }
    isSuperAdmin = () => {
        return this.user.roles.includes('superadmin');
    }
    namePlural = () => {
        return this.user.name.split(' ')[0] + '\'s';
    }
    userNamePlural = () => {
        return this.user.username+'\'s';
    }
}

export default UserHelper;