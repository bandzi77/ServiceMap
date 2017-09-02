"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var serviceTnt_list_component_1 = require("./serviceTnt-list.component");
var serviceTnt_guard_service_1 = require("./serviceTnt-guard.service");
var depot_detail_component_1 = require("./depot-detail.component");
var serviceTnt_filter_pipe_1 = require("./serviceTnt-filter.pipe");
var serviceTnt_service_1 = require("./serviceTnt.service");
var shared_module_1 = require("../shared/shared.module");
var ServiceTntModule = (function () {
    function ServiceTntModule() {
    }
    return ServiceTntModule;
}());
ServiceTntModule = __decorate([
    core_1.NgModule({
        declarations: [
            serviceTnt_list_component_1.ServiceTntListComponent,
            depot_detail_component_1.ServiceTntDetailComponent,
            serviceTnt_filter_pipe_1.ServicesTntFilterPipe
        ],
        imports: [
            shared_module_1.SmSharedModule,
            router_1.RouterModule.forChild([
                { path: 'serviceTnt', component: serviceTnt_list_component_1.ServiceTntListComponent },
                {
                    path: 'serviceTnt/:id',
                    canActivate: [serviceTnt_guard_service_1.ServiceTntDetailGuard],
                    component: depot_detail_component_1.ServiceTntDetailComponent
                },
            ]),
        ],
        providers: [
            serviceTnt_service_1.ServicesTntService,
            serviceTnt_guard_service_1.ServiceTntDetailGuard
        ]
    })
], ServiceTntModule);
exports.ServiceTntModule = ServiceTntModule;
//# sourceMappingURL=serviceTnt.module.js.map