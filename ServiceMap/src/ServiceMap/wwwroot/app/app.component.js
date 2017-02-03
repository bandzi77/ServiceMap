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
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var AppComponent = (function () {
    function AppComponent(_http) {
        this._http = _http;
    }
    ;
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Czy jest super userem: ' + this.isSuperusers);
        this.getProducts()
            .subscribe(function (data) { return _this.isSuperusers = data; }, function (error) { return console.log(error); });
    };
    AppComponent.prototype.handleError = function (error) {
        /* In a real world app, we might use a remote logging infrastructure
        /sdfgsdf*/
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AppComponent.prototype.getProducts = function () {
        return this._http.get(environment_1.apiUrl.getpermissions)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'sm-app',
        templateUrl: 'app/app.component.html',
        styleUrls: ['/app.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map