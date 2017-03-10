import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from './user';
import { UserService } from './user.service';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'cr-user',
    templateUrl: './app/users/user.component.html',
    styleUrls: ['./app/users/user.component.css']
})
export class UserComponent implements OnInit {
    pageTitle: string = '';
    errorMessage: string;
    private _inputType = {
        keydown: 'text',
        keyup: 'password'
    }

    inputType: string = "password";
    user: IUser = new IUser();
    userForm: FormGroup;
    emailMessage: string = '';
    passwordMessage: string = '';
    numOfReqstPerDay: string = '';
    private sub: Subscription;

    private emailValidationMessages = {
        required: 'Wprowadź adres email',
        pattern: 'Niepoprawny adres email'
    };

    private passValidationMessages = {
        required: "Wprowadź hasło",
        pattern: "Niepoprawne hasło. Długość hasła powinna mieścić się w przedziale od 8 do 12 znaków.\n\r" +
        "Hasło powinno zawierać litery oraz co najmniej jedną cyfrę i co najmniej jeden znak specjalny _!@#$%^&*()+-="
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            id: 0,
            email: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
            password: ['', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[_a-z])(?=.+[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}")]],
            numOfReqstPerDay: ['', checkRange(1, 1000)],
            isSuperUser: false,
            isLocked: false
        });

        const emailControl = this.userForm.get('email');
        emailControl.valueChanges.subscribe(value =>
            this.setMessage(emailControl, this.emailValidationMessages, 'emailMessage'));

        const passwordControl = this.userForm.get('password');
        passwordControl.valueChanges.subscribe(value =>
            this.setMessage(passwordControl, this.passValidationMessages, 'passwordMessage'));

        this.userForm.get('isSuperUser').valueChanges
            .subscribe(value => this.setNotification(value));

        this.sub = this.route.queryParams.subscribe(
            params => {

                let user = <IUser>{
                    id: Number(params['id']),
                    email: String(params['email']),
                    password: '',
                    numOfReqstPerDay: Number(params['numOfReqstPerDay']),
                    isSuperUser: Boolean(params['isSuperUser']),
                    isLocked: Boolean(params['isLocked'])
                }
                this.onUserRetrieved(user);

            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onUserRetrieved(user: IUser): void {
        if (this.userForm) {
            this.userForm.reset();
            this.userForm.enable();
        }
        this.user = user;

        if (this.user.id === 0) {
            this.pageTitle = 'Dodaj nowe konto';
        } else {
            this.pageTitle = `Edytuj konto: ${this.user.email}`;
            this.userForm.get('email').clearValidators();
            this.userForm.get('email').disable();
            this.userForm.get('password').clearValidators();
            this.userForm.get('password').disable();

            this.userForm.patchValue({
            id: isNaN(this.user.id)? 0 : this.user.id,
            email: this.user.email === "undefined" ? '' : this.user.email,
            password: '',
            numOfReqstPerDay: isNaN(this.user.numOfReqstPerDay) ? '' : this.user.numOfReqstPerDay,
            isSuperUser: this.user.isSuperUser,
            isLocked: this.user.isLocked
        });
            // Update the data on the form
        }
    }

    setNotification(ischecked: boolean): void {

        const emailControl = this.userForm.get('email');
        const numOfReqstPerDayControl = this.userForm.get('numOfReqstPerDay');

        if (ischecked) {
            this.emailValidationMessages.pattern = 'Adres nie należy do domeny @tnt.com'
            emailControl.setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@tnt.com')]);
            numOfReqstPerDayControl.clearValidators();
        }
        else {
            this.emailValidationMessages.pattern = 'Niepoprawny adres email'
            emailControl.setValidators([Validators.required, Validators.pattern(('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+'))]);
            numOfReqstPerDayControl.setValidators([Validators.required, checkRange(1, 1000)]);
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
