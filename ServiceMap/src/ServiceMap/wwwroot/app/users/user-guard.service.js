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
var router_1 = require("@angular/router");
var UserDetailGuard = (function () {
    function UserDetailGuard(router) {
        this.router = router;
    }
    UserDetailGuard.prototype.canActivate = function (route) {
        var id = String(route.queryParams['_id']);
        var email = route.queryParams['email'];
        if ((id === 'undefined' || id == null) || (id !== '0' && (email === 'undefined' || email == null))) {
            alert('Niepoprawny adres http');
            // start a new navigation to redirect to list page
            this.router.navigate(['/userlist']);
            // abort current navigation
            return false;
        }
        ;
        return true;
    };
    return UserDetailGuard;
}());
UserDetailGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], UserDetailGuard);
exports.UserDetailGuard = UserDetailGuard;
var UserEditGuard = (function () {
    function UserEditGuard() {
    }
    UserEditGuard.prototype.canDeactivate = function (component) {
        if (component.userForm.dirty) {
            var productName = component.userForm.get('email').value || 'nowego użytkownika';
            return confirm("Opuszczenie strony spowoduje utrat\u0119 danych dla " + productName + "?");
        }
        return true;
    };
    return UserEditGuard;
}());
UserEditGuard = __decorate([
    core_1.Injectable()
], UserEditGuard);
exports.UserEditGuard = UserEditGuard;
//# sourceMappingURL=user-guard.service.js.map