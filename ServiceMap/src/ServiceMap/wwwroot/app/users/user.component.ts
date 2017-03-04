import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './user';

@Component({
    selector: 'cr-user',
    templateUrl: './app/users/user.component.html'
})
export class UserComponent implements OnInit {
    userForm: FormGroup;
    user: User = new User();

    ngOnInit(): void {
        this.userForm = new FormGroup({
            email: new FormControl(),
            password: new FormControl(),
            numOfReqstPerDay: new FormControl(),
            isSuperUser: new FormControl(false),
            isLocked: new FormControl(false),
        });
    }

    save() {
        console.log(this.userForm);
        console.log('Saved: ' + JSON.stringify(this.userForm.value));
    }
}
