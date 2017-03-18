export class IUser {
    public _id: string;
    public email = '';
    public password = '';
    public isSuperUser = false;
    public isLocked = false;
    public limitOfRequestsPerDay?: number;
    public numberOfRequestsPerDay?: number;
}
