export class IUser {
    public _id: number;
    public email = '';
    public password = '';
    public isSuperUser = false;
    public isLocked = false;
    public numOfReqstPerDay?: number;
}
