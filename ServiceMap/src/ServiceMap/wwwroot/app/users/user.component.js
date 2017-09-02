"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var user_1 = require("./user");
var user_service_1 = require("./user.service");
require("rxjs/add/operator/debounceTime");
var common_1 = require("@angular/common");
var toastr_service_1 = require("../shared/toastr.service");
var UserComponent = (function () {
    function UserComponent(fb, route, router, userService, location, toastService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.location = location;
        this.toastService = toastService;
        this.pageTitle = '';
        this._inputType = {
            keydown: 'text',
            keyup: 'password'
        };
        this.inputType = "password";
        this.user = new user_1.IUser();
        this.userNameMessage = '';
        this.emailMessage = '';
        this.passwordMessage = '';
        this.limitPerDayMessage = '';
        this.userNameRegEx = '^[0-9]+$';
        this.emailTntRegEx = '[a-zA-Z0-9._%+-]+@(TNT.COM|tnt.com)';
        this.regExpEmail = new RegExp(this.emailTntRegEx);
        this.emailRegEx = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+'; //'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+';
        this.passwordRegEx = '(?=.*\\d)(?=.*[a-zA-Z])(?=.+[_\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}';
        this.patternEmailTnt = 'Niepoprawny adres email z domeny tnt.com.';
        this.patternEmail = 'Niepoprawny adres email.';
        this.isDisabledCheckBoxTntAccount = false;
        this.userNameValidationMessages = {
            required: 'Numer Klienta jest wymagana.',
            pattern: 'Dopuszczalne znaki to cyfry.',
            minlength: 'Wymagana długość to 9 cyfr.'
        };
        this.emailValidationMessages = {
            required: 'Email jest wymagany.',
            pattern: this.patternEmail,
            maxlength: 'Email nie może przekraczać 250 znaków.'
        };
        this.passValidationMessages = {
            required: "Hasło jest wymagane.",
            pattern: "Hasło nie spełnia wymagań.",
            minlength: 'Hasło jest za krótkie.',
            maxlength: 'Hasło jest za długie.'
        };
        this.limitOfRequestsPerDayMessage = {
            required: "Limit zapytań jest wymagany.",
            range: "Wprowadź wartość z przedziału od 1 do 500"
        };
    }
    UserComponent.prototype.ngOnInit = function () {
        // Tworzy rective form
        this._createReactiveUserForm();
        // Ustawia komunikaty dla walidatorów
        this._setMessageForValidators();
        // Tworzy obiekt z danymi użytkownika do edycji
        this._userInit();
    };
    UserComponent.prototype.onBack = function () {
        this.location.back();
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserComponent.prototype._createReactiveUserForm = function () {
        this.userForm = this.fb.group({
            _id: "0",
            tntUserName: [null, this._getUserNameValidators()],
            email: [{ value: '', disabled: true }, this._getEmailValidators()],
            password: [null, this._getPassswordValidators()],
            limitOfRequestsPerDay: [null, this._getLimitPerDayValidators()],
            isSuperUser: false,
            isLocked: false
        });
    };
    // Tworzy obiekt z danymi użytkownika do edycji
    UserComponent.prototype._userInit = function () {
        var _this = this;
        this.sub = this.route.queryParams.subscribe(function (params) {
            var user = {
                _id: String(params['_id']),
                tntUserName: String(params['tntUserName']),
                email: String(params['email']),
                password: '',
                limitOfRequestsPerDay: Number(params['limitOfRequestsPerDay']),
                isSuperUser: String(params['isSuperUser']) === "true",
                isLocked: String(params['isLocked']) === "true"
            };
            _this.onUserRetrieved(user);
        });
    };
    // Metoda wypełniająca danymi formularz jeśli jest w trybie edycji użytkownika, jeśli nie wyświetla pusty
    UserComponent.prototype.onUserRetrieved = function (user) {
        this.user = user;
        if (this.userForm) {
            this.userForm.enable();
        }
        if (this.user._id === "0") {
            this.resetForm();
            this.pageTitle = 'Dodaj nowego użytkownika';
        }
        else {
            this.pageTitle = "Edytuj u\u017Cytkownika: " + this.user.email;
            // Blokuje pola kluczowe do edycii
            this.userForm.get('email').disable();
            this.userForm.get('password').disable();
            // Nie pozwala na zmianę typu konta jeśli email nie był z domeny TNT
            if (!this.regExpEmail.test(this.user.email)) {
                this.userForm.get('isSuperUser').disable();
                this.isDisabledCheckBoxTntAccount = true;
            }
            // Wypełnia formularz do edycji danymi z query params
            this.userForm.patchValue({
                _id: this.user._id === "undefined" ? 0 : this.user._id,
                tntUserName: this.user.tntUserName === "undefined" ? null : this.user.tntUserName,
                email: this.user.email === "undefined" ? null : this.user.email,
                password: '********',
                limitOfRequestsPerDay: isNaN(this.user.limitOfRequestsPerDay) ? null : this.user.limitOfRequestsPerDay,
                isSuperUser: this.user.isSuperUser,
                isLocked: this.user.isLocked
            });
        }
    };
    UserComponent.prototype.setNotification = function (ischecked) {
        var emailControl = this.userForm.get('email');
        var limitOfRequestsPerDayControl = this.userForm.get('limitOfRequestsPerDay');
        // zmiania reguły walidatora w zależnośći od tego czy jest to konto z domeny TNT
        if (ischecked) {
            this.emailValidationMessages.pattern = this.patternEmailTnt;
            emailControl.setValidators(this._getTntEmailValidators());
            limitOfRequestsPerDayControl.reset();
            limitOfRequestsPerDayControl.clearValidators();
        }
        else {
            this.emailValidationMessages.pattern = this.patternEmail;
            emailControl.setValidators(this._getEmailValidators());
            limitOfRequestsPerDayControl.setValidators(this._getLimitPerDayValidators());
        }
        emailControl.updateValueAndValidity();
        limitOfRequestsPerDayControl.updateValueAndValidity();
    };
    UserComponent.prototype.setMessage = function (c, ValidationMessages, resultObject) {
        this[resultObject] = '';
        if ((c.touched || c.dirty) && c.errors) {
            this[resultObject] = Object.keys(c.errors).map(function (key) {
                return ValidationMessages[key];
            }).join(' ');
        }
    };
    UserComponent.prototype.onEyeEvent = function (event) {
        if (event.type === 'mousedown' && event.button === 0 && this.user._id === "0") {
            this.inputType = this._inputType.keydown;
        }
        if (((event.type === 'mouseup' && event.button === 0) || event.type === 'mouseleave') && this.user._id === "0") {
            this.inputType = this._inputType.keyup;
        }
    };
    UserComponent.prototype.deleteUser = function () {
        var _this = this;
        if (this.user._id === "0") {
            // Dla nowego użytkownika, tylko czyści formularz
            this.resetForm();
        }
        else {
            if (confirm("Czy chcesz usun\u0105\u0107 u\u017Cytkownika: " + this.user.email + "?")) {
                this.busyIndicator = this.userService.deleteUser(this.user._id)
                    .subscribe(function (result) {
                    _this.onDeleteComplete(result, _this.user);
                }, function (error) {
                    return _this.errorMessage = error;
                });
            }
        }
    };
    UserComponent.prototype.saveUser = function () {
        var _this = this;
        // Zabezpieczenie przed wpisaniem pustych znaków
        this.userForm.get('tntUserName').setValue(this.userForm.get('tntUserName').value.trim());
        if (this.userForm.dirty && this.userForm.valid) {
            // Copy the form values over the product object values
            var p = Object.assign({}, this.user, this.userForm.value);
            this.busyIndicator = this.userService.saveUser(p)
                .subscribe(function (result) {
                _this.onSaveComplete(result, _this.user);
            }, function (error) { return _this.errorMessage = error; });
        }
        else if (!this.userForm.dirty) {
        }
        console.log(this.userForm);
        console.log('Saved: ' + JSON.stringify(this.userForm.value));
    };
    UserComponent.prototype.onDeleteComplete = function (res, user) {
        if (res.success) {
            this.toastService.success({
                message: res.message
            });
            this.onBack();
        }
        else {
            this.toastService.error({
                message: res.message,
            });
        }
        // Reset the form to clear the flags
        // this.userForm.reset();
        // TODO
        //this.router.navigate(['/userlist']);
        //this.onBack()
    };
    UserComponent.prototype.onSaveComplete = function (res, user) {
        if (res.success) {
            this.resetForm();
            this.toastService.success({
                message: res.message
            });
            if (user._id !== "0") {
                this.onBack();
            }
        }
        else {
            this.toastService.error({
                message: res.message
            });
        }
    };
    UserComponent.prototype.resetForm = function () {
        this.userForm.reset();
        this.userForm.patchValue({
            _id: "0",
            isSuperUser: false,
            isLocked: false
        });
    };
    UserComponent.prototype._setMessageForValidators = function () {
        var _this = this;
        var userNameControl = this.userForm.get('tntUserName');
        userNameControl.valueChanges.debounceTime(0).subscribe(function (value) {
            return _this.setMessage(userNameControl, _this.userNameValidationMessages, 'userNameMessage');
        });
        var emailControl = this.userForm.get('email');
        emailControl.valueChanges.debounceTime(0).subscribe(function (value) {
            return _this.setMessage(emailControl, _this.emailValidationMessages, 'emailMessage');
        });
        var passwordControl = this.userForm.get('password');
        passwordControl.valueChanges.debounceTime(0).subscribe(function (value) {
            return _this.setMessage(passwordControl, _this.passValidationMessages, 'passwordMessage');
        });
        var limitOfRPerDayControl = this.userForm.get('limitOfRequestsPerDay');
        limitOfRPerDayControl.valueChanges.debounceTime(0).subscribe(function (value) {
            return _this.setMessage(limitOfRPerDayControl, _this.limitOfRequestsPerDayMessage, 'limitPerDayMessage');
        });
        this.userForm.get('isSuperUser').valueChanges
            .subscribe(function (value) { return _this.setNotification(value); });
    };
    UserComponent.prototype._getUserNameValidators = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.pattern(this.userNameRegEx),
            forms_1.Validators.minLength(9),
            forms_1.Validators.maxLength(9)
        ]);
    };
    UserComponent.prototype._getEmailValidators = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.maxLength(250),
            forms_1.Validators.pattern(this.emailRegEx)
        ]);
    };
    UserComponent.prototype._getTntEmailValidators = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.maxLength(250),
            forms_1.Validators.pattern(this.emailTntRegEx)
        ]);
    };
    UserComponent.prototype._getPassswordValidators = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.maxLength(12),
            forms_1.Validators.pattern(this.passwordRegEx)
        ]);
    };
    UserComponent.prototype._getLimitPerDayValidators = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            checkRange(1, 500)
        ]);
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'cr-user',
        templateUrl: './app/users/user.component.html',
        styleUrls: ['./app/users/user.component.css'],
        animations: [
            core_1.trigger('shrinkOut', [
                core_1.state('true', core_1.style({ opacity: 1 })),
                core_1.state('void', core_1.style({ opacity: 0 })),
                core_1.transition(':enter', core_1.animate('0ms ease-in-out')),
                core_1.transition(':leave', core_1.animate('0ms ease-in-out')) //300ms ease-in-out
            ])
        ]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.ActivatedRoute,
        router_1.Router,
        user_service_1.UserService,
        common_1.Location,
        toastr_service_1.ToastrService])
], UserComponent);
exports.UserComponent = UserComponent;
function checkRange(min, max) {
    return function (c) {
        // Requred będzie odpowiada za brak danych
        if ((c.value || "").length == 0) {
            return null;
        }
        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        ;
        return null;
    };
}
//# sourceMappingURL=user.component.js.map