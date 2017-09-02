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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.baseUrl = 'api/users';
        this.getUsersUrl = 'api/users/GetUsers';
    }
    UserService.prototype.getUsers = function (userFilter) {
        var searchParams = new http_1.URLSearchParams();
        searchParams.set('email', userFilter.email);
        searchParams.set('showLockedOnly', String(userFilter.showLockedOnly));
        return this.http.get(this.getUsersUrl, { search: searchParams })
            .map(this._extractData)
            .do(function (data) { return console.log('getUsers' + JSON.stringify(data)); })
            .catch(this._handleError);
    };
    UserService.prototype.getUser = function (user) {
        if (user._id === '0') {
            return Observable_1.Observable.of(this.initializeUser());
        }
        ;
        return Observable_1.Observable.of(user);
    };
    UserService.prototype.deleteUser = function (_id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "/" + _id;
        return this.http.delete(url, options)
            .map(this._extractData)
            .do(function (data) { return console.log('deleteUser: ' + JSON.stringify(data)); })
            .catch(this._handleError);
    };
    UserService.prototype.saveUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        if (user._id === "0") {
            return this._addUser(user, options);
        }
        return this._updateUser(user, options);
    };
    UserService.prototype._addUser = function (user, options) {
        return this.http.post(this.baseUrl, user, options)
            .map(this._extractData)
            .do(function (data) { return console.log('addUser: ' + JSON.stringify(data)); })
            .catch(this._handleError);
    };
    UserService.prototype._updateUser = function (user, options) {
        var url = this.baseUrl + "/" + user._id;
        return this.http.put(url, user, options)
            .map(this._extractData)
            .do(function (data) { return console.log('updateUser: ' + JSON.stringify(data)); })
            .catch(this._handleError);
    };
    UserService.prototype._extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    UserService.prototype._handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        var err;
        if (error instanceof http_1.Response) {
            errMsg = error.status + " - " + (error.statusText || '');
            // Wylogowanie użytkownika poprzez odświeżenie strony- do dalszej analizy
            if (error.status === 401) {
                location.reload();
                return Observable_1.Observable.throw(errMsg);
            }
            try {
                var body = error.json() || '';
                err = body.error || JSON.stringify(body);
            }
            catch (e) {
                err = ' More info: ' + e.stack;
            }
            finally {
                errMsg = errMsg + ("" + (err || 'brak'));
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    UserService.prototype.initializeUser = function () {
        // Return an initialized object
        return {
            _id: '0',
            tntUserName: null,
            email: null,
            password: null,
            limitOfRequestsPerDay: null,
            numberOfRequestsPerDay: null,
            isSuperUser: false,
            isLocked: false
        };
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map