import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from './user';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'cr-user',
    templateUrl: './app/users/user.component.html'
})
export class UserComponent implements OnInit {
    private _inputType = {
        keydown: 'text',
        keyup: 'password'
    }

    inputType: string = "password";

    userForm: FormGroup;
    user: User = new User();
    emailMessage: string = '';
    passwordMessage: string = '';
    numOfReqstPerDay: string = '';

    private emailValidationMessages = {
        required: 'Wprowadź adres email',
        pattern: 'Niepoprawny adres email'
    };

    private passValidationMessages = {
        required: "Wprowadź hasło",
        pattern: "Niepoprawne hasło. Długość hasła powinna mieścić się w przedziale od 8 do 12 znaków.\n\r" +
                 "Hasło powinno zawierać litery oraz co najmniej jedną cyfrę i co najmniej jeden znak specjalny _!@#$%^&*()+-="
    };


    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[_a-z])(?=.+[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}")]],
            numOfReqstPerDay: ['', checkRange(1, 1000)],
            isSuperUser: false,
            isLocked: false,
            notification: 'email',
        });


        const emailControl = this.userForm.get('email');
        emailControl.valueChanges.subscribe(value =>
            this.setMessage(emailControl, this.emailValidationMessages, 'emailMessage'));

        const passwordControl = this.userForm.get('password');
        passwordControl.valueChanges.subscribe(value =>
            this.setMessage(passwordControl, this.passValidationMessages, 'passwordMessage'));

        this.userForm.get('isSuperUser').valueChanges
            .subscribe(value => this.setNotification(value));
    }
    onSetIsSuperUser() { }
    setNotification(ischecked: boolean): void {

        const emailControl = this.userForm.get('email');
        const numOfReqstPerDayControl = this.userForm.get('numOfReqstPerDay');
    
        if (ischecked) {
            this.emailValidationMessages.pattern = 'Adres nie należy do domeny @tnt.com'
            emailControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@tnt.com')]);
            numOfReqstPerDayControl.clearValidators();
      
        }
        else {
            this.emailValidationMessages.pattern = 'Niepoprawny adres email'
            emailControl.setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+')]);
            numOfReqstPerDayControl.setValidators([Validators.required,checkRange(1, 1000)]);

        }

        emailControl.updateValueAndValidity();
        numOfReqstPerDayControl.updateValueAndValidity();
    }

    setMessage(c: AbstractControl, ValidationMessages: Object, resultObject: string): void {
        this[resultObject] = '';
        if ((c.touched || c.dirty) && c.errors) {
            this[resultObject] = Object.keys(c.errors).map(key =>
                ValidationMessages[key]).join(' ');
        }
    }


    private onEyeEvent(event: MouseEvent): void {
        if (event.type === 'mousedown' && event.button === 0) {
            this.inputType = this._inputType.keydown;
        }
        if ((event.type === 'mouseup' && event.button === 0) || event.type === 'mouseleave') {
            this.inputType = this._inputType.keyup;
        }
    }

    save() {
        console.log(this.userForm);
        console.log('Saved: ' + JSON.stringify(this.userForm.value));
    }
}


function checkRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        };
        return null;
    };
}
