export class UserHelper {
    constructor(user) {
        this.user = user;
        this.isDriver = this.isDriver.bind(this);
        this.isDispatcher = this.isDispatcher.bind(this);
        this.isManager = this.isManager.bind(this);
        this.isOwner = this.isOwner.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.namePlural = this.namePlural.bind(this);
        this.userNamePlural = this.userNamePlural.bind(this);
    }
    isDriver = () =>  {
        return this.user.roles.includes('driver');
    }
    isDispatcher = () => {
        return this.user.roles.includes('dispatcher') || this.isManager() || this.isOwner() || this.isAdmin();
    }
    isManager = () => {
        return this.user.roles.includes('manager') || this.isOwner() || this.isAdmin();
    }
    isOwner = () => {
        return this.user.roles.includes('owner') || this.isAdmin();
    }
    isAdmin = () => {
        return this.user.roles.includes('admin');
    }
    namePlural = () => {
        return this.user.name.split(' ')[0] + '\'s';
    }
    userNamePlural = () => {
        return this.user.username+'\'s';
    }
    getRole = () => {
        let role = 0
        if (this.isAdmin()) role |= 16;
        if (this.isOwner()) role |= 8
        if (this.isManager()) role |= 4
        if (this.isDispatcher()) role |= 2
        if (this.isDriver()) role |= 1
        return role;
    }
}

export default UserHelper;