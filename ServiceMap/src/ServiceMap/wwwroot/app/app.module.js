"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var shared_module_1 = require("./shared/shared.module");
var welcome_component_1 = require("./home/welcome.component");
var serviceTnt_module_1 = require("./servicesTnt/serviceTnt.module");
var user_service_1 = require("./users/user.service");
var forms_1 = require("@angular/forms");
var serviceTnt_list_component_1 = require("./servicesTnt/serviceTnt-list.component");
var user_module_1 = require("./users/user-module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            // TODO - Do usuniecia
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forRoot([
                //{ path: 'welcome', component: WelcomeComponent },
                //{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
                //{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
                { path: 'serviceTnt', component: serviceTnt_list_component_1.ServiceTntListComponent },
                { path: '', redirectTo: 'serviceTnt', pathMatch: 'full' },
                { path: '**', redirectTo: 'serviceTnt', pathMatch: 'full' },
            ]),
            shared_module_1.SmSharedModule,
            user_module_1.ProductModule,
            serviceTnt_module_1.ServiceTntModule
        ],
        declarations: [
            app_component_1.AppComponent,
            welcome_component_1.WelcomeComponent
        ],
        providers: [user_service_1.UserService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map