export class User {

    constructor(
        public email = '',
        public password = '',
        public isSuperUser = false,
        public isLocked = false,
        public numOfReqstPerDay?: number
    ) { }
} 
