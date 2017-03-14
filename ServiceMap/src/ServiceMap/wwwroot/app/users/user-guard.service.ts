import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { UserComponent } from './user.component';

@Injectable()
export class UserDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = Number(route.queryParams['id']);
        let email = route.queryParams['email'];
        if ((isNaN(id) || id < 0) || (id > 0 && (email==="undefined" || email==null ))) {
            alert('Niepoprawne adres http');
            // start a new navigation to redirect to list page
            this.router.navigate(['/welcome']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export class UserEditGuard implements CanDeactivate<UserComponent> {

    canDeactivate(component: UserComponent): boolean {
        if (component.userForm.dirty) {
            let productName = component.userForm.get('email').value || 'Nowy użytkownik';
            return confirm(`Opuszczenie strony spowoduje utratę danych użytkownika ${productName}?`);
        }
        return true;
    }
}
