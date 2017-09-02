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
var user_service_1 = require("./user.service");
var router_1 = require("@angular/router");
var UserListComponent = (function () {
    function UserListComponent(_userService, _route, router) {
        this._userService = _userService;
        this._route = _route;
        this.router = router;
        this.tntUserName = '';
        this.email = '';
        this.showLockedOnly = false;
        this.pageTitle = 'Lista Użytkowników';
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Do filtrowania kolumny Uprawnienia administratora oraz konto zablokowane
        this.checkSelector = [];
        this.checkSelector.push({ label: 'Wszystkie', value: null });
        this.checkSelector.push({ label: 'Tak', value: 'true' });
        this.checkSelector.push({ label: 'Nie', value: 'false' });
        this.sub = this._route.queryParams.subscribe(function (params) {
            _this.email = params.hasOwnProperty('email') ? params['email'] : '';
            _this.showLockedOnly = params['showLockedOnly'] === "true";
            if (params.hasOwnProperty('email')) {
                _this.onSearchUsers();
            }
        });
    };
    UserListComponent.prototype.ngOnDestroy = function () {
        //this.sub.unsubscribe();
    };
    UserListComponent.prototype.onSearchUsers = function () {
        console.log('Wyszukiwanie użytkowników');
        this.router.navigate(['/userlist'], { queryParams: { email: this.email, showLockedOnly: this.showLockedOnly } });
        var filtr = this._createUserFilter();
        this._getData(filtr);
    };
    UserListComponent.prototype.onSelectUser = function (user) {
        this.router.navigate(['/adduser'], { queryParams: { _id: user._id, tntUserName: user.tntUserName, email: user.email, limitOfRequestsPerDay: user.limitOfRequestsPerDay, isSuperUser: user.isSuperUser, isLocked: user.isLocked } });
    };
    UserListComponent.prototype._getData = function (filtr) {
        var _this = this;
        this.busyIndicator = this._userService.getUsers(filtr)
            .subscribe(function (result) {
            _this.users = result.users;
        }, function (error) { return _this.errorMessage = error; });
    };
    UserListComponent.prototype._createUserFilter = function () {
        var _userFilter = {
            email: this.email,
            showLockedOnly: this.showLockedOnly
        };
        return _userFilter;
    };
    return UserListComponent;
}());
UserListComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/users/user-list.component.html',
        styleUrls: ['app/users/user-list.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map