import { Component } from '@angular/core';
import { IUser } from './user';

@Component({
    templateUrl: 'app/users/user-list.component.html'
})

export class UserListComponent {
    users: IUser[];
    public pageTitle: string = 'Lista Użytkowników';
}
