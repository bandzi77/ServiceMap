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
var environment_1 = require("./environments/environment");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var common_1 = require("@angular/common");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var AppComponent = (function () {
    function AppComponent(_http, location) {
        this._http = _http;
        this.location = location;
        this.isSuperUser = false;
    }
    ;
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkPermissions()
            .subscribe(function (data) { return _this.isSuperUser = data === true; }, function (error) { return console.error(error); });
    };
    AppComponent.prototype.checkPermissions = function () {
        return this._http.get(environment_1.apiUrl.getpermissions)
            .map(this._extractData)
            .do(this._logData)
            .catch(this.handleError);
    };
    AppComponent.prototype.onLogOut = function () {
        console.log('Wylogowanie u�ytkownika');
        this.logOut()
            .subscribe(
        //  TODO - DO POPRAWY
        function () { return location.reload(); });
        //data => data,
        //    error => console.error(<any>error));
    };
    AppComponent.prototype.logOut = function () {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //let body = JSON.stringify({n:"t"});
        //return this._http.post(apiUrl.logout, body, options)
        //    //.map(this.extractData)
        //    .map(res => <void>res.json())
        //    .do(this.logData)
        //    .catch(this.handleError);
        return this._http.get(environment_1.apiUrl.logout)
            .map(function (res) { return res.json(); })
            .do(this._logData)
            .catch(this.handleError);
    };
    AppComponent.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    AppComponent.prototype._extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    AppComponent.prototype._logData = function (data) {
        console.log('All: ' + JSON.stringify(data));
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'sm-app',
        templateUrl: 'app/app.component.html',
        styleUrls: ['/app.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http,
        common_1.Location])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map