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
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var ServicesTntService = (function () {
    function ServicesTntService(_http) {
        this._http = _http;
        this._serchServicesUrl = 'api/servicesTnt/GetServices';
        this._getDepotDetails = 'api/servicesTnt/GetDepotDetails';
    }
    ;
    ServicesTntService.prototype.getDepotDetails = function (depotFilter) {
        var searchParams = new http_1.URLSearchParams();
        searchParams.set('depotCode', depotFilter.depotCode);
        return this._http.get(this._getDepotDetails, { search: searchParams })
            .map(this.extractData)
            .do(function (data) { return console.log('All' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ServicesTntService.prototype.searchServicesTnt = function (serviceFilter, pageInfo) {
        var searchParams = new http_1.URLSearchParams();
        searchParams.set('postCode', serviceFilter.postCode);
        searchParams.set('cityName', serviceFilter.cityName);
        searchParams.set('orderBy', pageInfo.order_by);
        searchParams.set('currentPage', '' + pageInfo.current_page);
        searchParams.set('pageSize', '' + pageInfo.page_size);
        return this._http.get(this._serchServicesUrl, { search: searchParams })
            .map(this.extractData)
            .do(function (data) { return console.log('All' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // Działa
    // private handleError(error: Response) {
    //    console.error(error);
    //    return Observable.throw(error.json().error || 'Server error');
    // } 
    ServicesTntService.prototype.extractData = function (response) {
        var data = response.json();
        return data || {};
    };
    ServicesTntService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        var err;
        if (error instanceof http_1.Response) {
            errMsg = error.status + " - " + (error.statusText || '');
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
    return ServicesTntService;
}());
ServicesTntService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ServicesTntService);
exports.ServicesTntService = ServicesTntService;
//# sourceMappingURL=serviceTnt.service.js.map