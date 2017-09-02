"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var page_component_1 = require("./page.component");
var common_1 = require("@angular/common");
var page_service_1 = require("./page.service");
var PageModule = (function () {
    function PageModule() {
    }
    return PageModule;
}());
PageModule = __decorate([
    core_1.NgModule({
        declarations: [
            page_component_1.PageComponent
        ],
        imports: [common_1.CommonModule
        ],
        exports: [page_component_1.PageComponent],
        providers: [
            page_service_1.PageService
        ]
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=page.module.js.map