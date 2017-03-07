export class IUser {
    public id: number;
    public email = '';
    public password = '';
    public isSuperUser = false;
    public isLocked = false;
    public numOfReqstPerDay?: number;
}
