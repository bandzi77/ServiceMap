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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("./environments/environment");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var toastr_service_1 = require("./shared/toastr.service");
var common_1 = require("@angular/common");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var AppComponent = (function () {
    function AppComponent(_http, location, toastr, vcr, toastService) {
        this._http = _http;
        this.location = location;
        this.toastr = toastr;
        this.toastService = toastService;
        this.currentUser = {
            isSuperUser: undefined,
            userEmail: null
        };
        this.toastr.setRootViewContainerRef(vcr);
    }
    ;
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.busyIndicator = this.checkPermissions()
            .subscribe(function (result) {
            return _this.currentUser = result;
        }, function (error) { return console.error(error); });
    };
    AppComponent.prototype.checkPermissions = function () {
        return this._http.get(environment_1.apiUrl.getpermissions)
            .map(this._extractData)
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
        common_1.Location,
        ng2_toastr_1.ToastsManager,
        core_1.ViewContainerRef,
        toastr_service_1.ToastrService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map