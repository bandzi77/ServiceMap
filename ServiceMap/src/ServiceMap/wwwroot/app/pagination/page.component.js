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
var page_service_1 = require("./page.service");
var PageComponent = (function () {
    function PageComponent(_pageservice) {
        this._pageservice = _pageservice;
        this.pageClicked = new core_1.EventEmitter();
        this.pager = {};
    }
    PageComponent.prototype.ngOnChanges = function () {
        this.pager = this._pageservice.getPager(this.totalCount, 1, this.pageSize);
    };
    ;
    PageComponent.prototype.ngOnInit = function () {
        this.pager = this._pageservice.getPager(this.totalCount, 1, this.pageSize);
    };
    ;
    PageComponent.prototype.onSetPage = function (page) {
        if ((page < 1 || page > this.pager.totalPages) || (page == 1 && this.pager.totalPages == 1) || (page == this.pager.currentPage)) {
            return;
        }
        this.pageClicked.emit(page);
        this.pager = this._pageservice.getPager(this.totalCount, page, this.pageSize);
    };
    ;
    return PageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PageComponent.prototype, "totalCount", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PageComponent.prototype, "pageSize", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PageComponent.prototype, "pageClicked", void 0);
PageComponent = __decorate([
    core_1.Component({
        selector: 'page-app',
        templateUrl: 'app/pagination/page.component.html',
        styleUrls: ['app/pagination/page.component.css']
    }),
    __metadata("design:paramtypes", [page_service_1.PageService])
], PageComponent);
exports.PageComponent = PageComponent;
//# sourceMappingURL=page.component.js.map