import {
    trigger,
    state,
    style,
    transition,
    animate, Component, OnInit, OnDestroy
} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from './user';
import { UserService } from './user.service';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
//import { GenericValidator } from '../shared/generic-validator';

@Component({
    selector: 'cr-user',
    templateUrl: './app/users/user.component.html',
    styleUrls: ['./app/users/user.component.css'],
    animations: [
        trigger('shrinkOut', [
            state('true', style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition(':enter', animate('0ms ease-in-out')),
            transition(':leave', animate('0ms ease-in-out'))//300ms ease-in-out
        ])
    ]
})
export class UserComponent implements OnInit, OnDestroy {

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
    limitOfRequestsPerDay: string = '';
    private sub: Subscription;
    private emailTntRegEx: string = '[a-zA-Z0-9._%+-]+@(TNT.COM|tnt.com)';
    private regExpEmail = new RegExp(this.emailTntRegEx);
    emailRegEx: string = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+'; //'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+';
    passwordRegEx: string = '(?=.*\\d)(?=.*[a-zA-Z])(?=.+[_\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}'
    patternEmailTnt: string = 'Niepoprawny adres email z domeny tnt.com.';
    patternEmail: string = 'Niepoprawny adres email.';

    private emailValidationMessages = {
        required: 'Email jest wymagany.',
        pattern: this.patternEmail,
        maxlength: 'Email nie może przekraczać 250 znaków.'
    };

    private passValidationMessages = {
        required: "Hasło jest wymagane.",
        pattern: "Hasło nie spełnia wymagań.",
        minlength: 'Hasło jest za krótkie.',
        maxlength: 'Hasło jest za długie.'
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private location: Location) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            _id: "0",
            email: [{ value: '', disabled: true }, [
                Validators.required,
                Validators.maxLength(250),
                Validators.pattern(this.emailRegEx)]],
            password: ['', [Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
            Validators.pattern(this.passwordRegEx)]],
            limitOfRequestsPerDay: ['', checkRange(1, 1000)],
            isSuperUser: false,
            isLocked: false
        });

        const emailControl = this.userForm.get('email');
        emailControl.valueChanges.debounceTime(0).subscribe(value =>
            this.setMessage(emailControl, this.emailValidationMessages, 'emailMessage'));


        const passwordControl = this.userForm.get('password');
        passwordControl.valueChanges.debounceTime(0).subscribe(value =>
            this.setMessage(passwordControl, this.passValidationMessages, 'passwordMessage'));

        this.userForm.get('isSuperUser').valueChanges
            .subscribe(value => this.setNotification(value));

        this.sub = this.route.queryParams.subscribe(
            params => {
                let user = <IUser>{
                    _id: String(params['_id']),
                    email: String(params['email']),
                    password: '',
                    limitOfRequestsPerDay: Number(params['limitOfRequestsPerDay']),
                    isSuperUser: String(params['isSuperUser'])==="true",
                    isLocked: String(params['isLocked'])==="true"
                }
                this.onUserRetrieved(user);
            }
        );
    }

    onBack() {
        this.location.back();
    }

    ngOnDestroy(): void {
           this.sub.unsubscribe();
    }

    onUserRetrieved(user: IUser): void {
        this.user = user;

        if (this.userForm) {
            this.userForm.enable();
        }

        if (this.user._id === "0") {
            this.userForm.reset();
            this.userForm.patchValue({
                _id: "0",
                isSuperUser: false,
                isLocked: false
            });
            this.pageTitle = 'Dodaj nowego użytkownika';
        } else {
            this.pageTitle = `Edytuj użytkownika: ${this.user.email}`;
            this.userForm.get('email').disable();
            this.userForm.get('password').disable();
            if (!this.regExpEmail.test(this.user.email)) {
                this.userForm.get('isSuperUser').disable();
            }

            this.userForm.patchValue({
                _id: this.user._id === "undefined" ? '' : this.user._id,
                email: this.user.email === "undefined" ? '' : this.user.email,
                password: '********',
                limitOfRequestsPerDay: isNaN(this.user.limitOfRequestsPerDay) ? '' : this.user.limitOfRequestsPerDay,
                isSuperUser: this.user.isSuperUser,
                isLocked: this.user.isLocked
            });
        }
    }

    setNotification(ischecked: boolean): void {
        const emailControl = this.userForm.get('email');
        const limitOfRequestsPerDayControl = this.userForm.get('limitOfRequestsPerDay');

        if (ischecked) {
            this.emailValidationMessages.pattern = this.patternEmailTnt;
            emailControl.setValidators([Validators.required, Validators.pattern(this.emailTntRegEx)]);
            limitOfRequestsPerDayControl.reset();
            limitOfRequestsPerDayControl.clearValidators();
        }
        else {
            this.emailValidationMessages.pattern = this.patternEmail;
            emailControl.setValidators([Validators.required, Validators.pattern((this.emailRegEx))]);
            limitOfRequestsPerDayControl.setValidators([Validators.required, checkRange(1, 1000)]);
        }

        emailControl.updateValueAndValidity();
        limitOfRequestsPerDayControl.updateValueAndValidity();
    }

    setMessage(c: AbstractControl, ValidationMessages: Object, resultObject: string): void {
        this[resultObject] = '';
        if ((c.touched || c.dirty) && c.errors) {
            this[resultObject] = Object.keys(c.errors).map(key =>
                ValidationMessages[key]).join(' ');
        }
    }

    private onEyeEvent(event: MouseEvent): void {
        if (event.type === 'mousedown' && event.button === 0 && this.user._id === "0") {
            this.inputType = this._inputType.keydown;
            //this.dupa = 'active';
        }
        if (((event.type === 'mouseup' && event.button === 0) || event.type === 'mouseleave') && this.user._id === "0") {
            this.inputType = this._inputType.keyup;
            //this.dupa = 'inactive';
        }
    }

    deleteUser(): void {
        if (this.user._id === "0") {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Czy chcesz usunąć użytkownika: ${this.user.email}?`)) {
                this.userService.deleteUser(this.user._id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveUser() {
        if (this.userForm.dirty && this.userForm.valid) {
            // Copy the form values over the product object values
            let p = Object.assign({}, this.user, this.userForm.value);

            this.userService.saveUser(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.userForm.dirty) {
            this.onSaveComplete();
        }


        console.log(this.userForm);
        console.log('Saved: ' + JSON.stringify(this.userForm.value));
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.userForm.reset();
        // TODO
        //this.router.navigate(['/userlist']);
        this.onBack()
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
