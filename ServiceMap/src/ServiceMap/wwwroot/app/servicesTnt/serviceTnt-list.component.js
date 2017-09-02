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
var serviceTnt_service_1 = require("./serviceTnt.service");
var lgModal_component_1 = require("../shared/lgModal.component");
var primeng_1 = require("primeng/primeng");
var toastr_service_1 = require("../shared/toastr.service");
var ServiceTntListComponent = (function () {
    function ServiceTntListComponent(_serviceTntService, _route, toastService) {
        this._serviceTntService = _serviceTntService;
        this._route = _route;
        this.toastService = toastService;
        this.pageTitle = "Mapa Serwisowa";
        this.imageWidth = 50;
        this.imageMargin = 2;
        this.postCode = '';
        this.cityName = '';
        this.isInitWindow = false;
    }
    ServiceTntListComponent.prototype.ngOnInit = function () {
        var id = +this._route.snapshot.params['currentPage'];
        this.paging = this._getPage();
        this.pageInfo = this._getPageInfo();
        this.requestsPerDay = this._getRequestsPerDay();
        this.cols = [
            { field: 'depotCode', header: 'Kod Depotu' },
            { field: 'town', header: 'Miasto' },
            { field: 'fromPostcode', header: 'Kod pocztowy od' },
            { field: 'toPostcode', header: 'Kod pocztowy do' },
            { field: 'sobota', header: 'Doręczenie sobotnie' },
            { field: 'eX9', header: '9 Express' },
            { field: 'eX10', header: '10 Express' },
            { field: 'eX12', header: '12 Express' },
            { field: 'priority', header: 'Przesyłka priorytetowa' },
            //{ field: 'wieczorneDostarczenie', header: 'Wieczorne dostarczenie' },
            //{ field: 'standardDeliveryOd', header: 'Doręcznia < br > od' },
            //{ field: 'standardDeliveryDo', header: 'Doręcznia < br >do' }
            { field: 'pickUpDomesticZgl', header: 'Zamówienia kuriera krajowego do' },
            { field: 'dateTimePickUpEksportSmZgl', header: 'Zamówienie kuriera międzynarodowego do' },
            //{ field: 'samochodZwindaDostepnyWstandardzie', header: 'ISamochod z winda< br > dostepny w standardzie' },
            { field: 'diplomatNextDay', header: 'Najwcześniejsza dostawa przesyłki pozasystemowej' },
            { field: 'serwisPodmiejski', header: 'Serwis Podmiejski' },
            { field: 'serwisMiejski', header: 'Serwis Miejski ' },
            { field: 'pickUpDomesticCzas', header: 'Minimalny czas na odbiór przesyłki drogowej' },
            { field: 'pickUpEksportSmCzas', header: 'Minimalny czas na odbiór przesyłki lotniczej' }
        ];
        this.columnOptions = [];
        for (var i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
    };
    //TODO - usunąć
    ServiceTntListComponent.prototype._getPage = function () {
        return {
            totalCount: 0,
            pageSize: 25
        };
    };
    ServiceTntListComponent.prototype._getPageInfo = function () {
        return {
            order_by: null,
            current_page: 3,
            page_size: 25
        };
    };
    ServiceTntListComponent.prototype._getRequestsPerDay = function () {
        return {
            numberOfRequestsPerDay: null,
            limitOfRequestsPerDay: null
        };
    };
    ServiceTntListComponent.prototype._getData = function (filtr) {
        var _this = this;
        this.busyIndicator = this._serviceTntService.searchServicesTnt(filtr, this.pageInfo)
            .subscribe(function (result) {
            _this.servicesTnt = result.serviceTnt;
            _this.paging = result.paging;
            _this.requestsPerDay = result.requestsPerDay;
            _this.onGetComplete(result.result);
        }, function (error) { return _this.errorMessage = error; });
    };
    ServiceTntListComponent.prototype.onSearchService = function () {
        console.log('testowanie init');
        this.dataTable.rows;
        var filtr = this._createServiceFilter();
        this.pageInfo.current_page = 0;
        this._getData(filtr);
        this.dataTable.first = 0;
        this.isInitWindow = true;
    };
    ServiceTntListComponent.prototype.onLazyLoading = function () {
        var filtr = this._createServiceFilter();
        this._getData(filtr);
    };
    ServiceTntListComponent.prototype._createServiceFilter = function () {
        var _serviceFilter = {
            postCode: this.postCode,
            cityName: this.cityName,
        };
        return _serviceFilter;
    };
    ServiceTntListComponent.prototype.onClick = function (item) {
        var _this = this;
        var filtr = { depotCode: item };
        this.busyIndicator = this._serviceTntService.getDepotDetails(filtr).subscribe(function (result) {
            _this.depotTnt = result.depotDetails;
            _this.lgModalRef.show();
        }, function (error) { return _this.errorMessage = error; });
    };
    ServiceTntListComponent.prototype.loadPageLazy = function (event) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
        //imitate db connection over a network
        //setTimeout(() => {
        //    if (this.datasource) {
        //        this.cars = this.datasource.slice(event.first, (event.first + event.rows));
        //    }
        //}, 250);
        if (this.isInitWindow) {
            this.pageInfo.order_by = this._setOrderBy(event.sortField, event.sortOrder);
            this.pageInfo.current_page = (event.first / event.rows);
            this.pageInfo.page_size = event.rows;
            this.onLazyLoading();
        }
    };
    ServiceTntListComponent.prototype._setOrderBy = function (sortField, sortOrder) {
        var result = null;
        if (sortField == undefined || sortField == null) {
            return result;
        }
        result = sortField;
        if (sortOrder == undefined || sortOrder == null) {
            return result;
        }
        return result = result + " " + ((sortOrder === -1) ? 'desc' : 'asc');
    };
    ServiceTntListComponent.prototype.onGetComplete = function (res) {
        if (!res.success) {
            this.toastService.error({
                message: res.message
            });
        }
    };
    return ServiceTntListComponent;
}());
__decorate([
    core_1.ViewChild('lgModal'),
    __metadata("design:type", lgModal_component_1.LgModalComponent)
], ServiceTntListComponent.prototype, "lgModalRef", void 0);
__decorate([
    core_1.ViewChild('dataTable'),
    __metadata("design:type", primeng_1.DataTable)
], ServiceTntListComponent.prototype, "dataTable", void 0);
__decorate([
    core_1.ViewChild('multiselect'),
    __metadata("design:type", primeng_1.MultiSelect)
], ServiceTntListComponent.prototype, "multi", void 0);
ServiceTntListComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/servicesTnt/serviceTnt-list.component.html',
        styleUrls: ['app/servicesTnt/serviceTnt-list.component.css']
    }),
    __metadata("design:paramtypes", [serviceTnt_service_1.ServicesTntService,
        router_1.ActivatedRoute,
        toastr_service_1.ToastrService])
], ServiceTntListComponent);
exports.ServiceTntListComponent = ServiceTntListComponent;
//# sourceMappingURL=serviceTnt-list.component.js.map