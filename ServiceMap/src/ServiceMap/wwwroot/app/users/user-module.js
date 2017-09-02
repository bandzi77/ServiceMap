"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var user_guard_service_1 = require("./user-guard.service");
var user_component_1 = require("./user.component");
var user_service_1 = require("./user.service");
var shared_module_1 = require("../shared/shared.module");
var user_list_component_1 = require("./user-list.component");
var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.ReactiveFormsModule,
            shared_module_1.SmSharedModule,
            router_1.RouterModule.forChild([
                { path: 'userlist', component: user_list_component_1.UserListComponent },
                {
                    path: 'adduser',
                    canDeactivate: [user_guard_service_1.UserEditGuard],
                    canActivate: [user_guard_service_1.UserDetailGuard],
                    component: user_component_1.UserComponent
                },
            ])
        ],
        declarations: [
            user_component_1.UserComponent,
            user_list_component_1.UserListComponent
        ],
        providers: [
            user_service_1.UserService,
            user_guard_service_1.UserDetailGuard,
            user_guard_service_1.UserEditGuard
        ]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=user-module.js.map