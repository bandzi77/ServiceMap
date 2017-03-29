import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser, IUserFilter } from './user';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'app/users/user-list.component.html',
    styleUrls: ['app/users/user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {
    private busyIndicator: Subscription;
    users: IUser[];
    private sub: Subscription;
    private email: string = '';
    private showLockedOnly: boolean = false;
    errorMessage: string;

    public pageTitle: string = 'Lista Użytkowników';

    constructor(private _userService: UserService, private _route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.sub = this._route.queryParams.subscribe(
            params => {
                this.email = params.hasOwnProperty('email') ? params['email'] : '';
                this.showLockedOnly = params['showLockedOnly'] === "true";
                if (params.hasOwnProperty('email')) {
                    this.onSearchUsers();
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private onSearchUsers() {
        console.log('Wyszukiwanie użytkowników');
        // Powoduje, że po powrocie odświeża listę
        this.router.navigate(['/userlist'], { queryParams: { email: this.email, showLockedOnly: this.showLockedOnly } });
        let filtr = this._createUserFilter();
        this._getData(filtr);
    }


    private _getData(filtr: IUserFilter) {
        this.busyIndicator = this._userService.getUsers(filtr)
            .subscribe(result => {
                this.users = result.users;
            },
            error => this.errorMessage = <any>error);
    }

    _createUserFilter(): IUserFilter {
        let _userFilter: IUserFilter =
            {
                email: this.email,
                showLockedOnly: this.showLockedOnly
            };
        return _userFilter;
    }

}
