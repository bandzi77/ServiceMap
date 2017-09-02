"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular2_busy_1 = require("angular2-busy");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var page_module_1 = require("../pagination/page.module");
var lgModal_component_1 = require("./lgModal.component");
var toastr_service_1 = require("./toastr.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var toastr_custom_option_1 = require("./toastr-custom-option");
var primeng_1 = require("primeng/primeng");
var SmSharedModule = (function () {
    function SmSharedModule() {
    }
    return SmSharedModule;
}());
SmSharedModule = __decorate([
    core_1.NgModule({
        declarations: [
            lgModal_component_1.LgModalComponent
        ],
        exports: [
            common_1.CommonModule,
            angular2_busy_1.BusyModule,
            forms_1.FormsModule,
            lgModal_component_1.LgModalComponent,
            ng2_bootstrap_1.ModalModule,
            page_module_1.PageModule,
            ng2_bootstrap_1.PopoverModule,
            ng2_bootstrap_1.TooltipModule,
            ng2_toastr_1.ToastModule,
            primeng_1.DataTableModule,
            primeng_1.SharedModule,
            primeng_1.MultiSelectModule,
            primeng_1.ToggleButtonModule,
            primeng_1.DropdownModule
        ],
        imports: [
            common_1.CommonModule,
            angular2_busy_1.BusyModule.forRoot(new angular2_busy_1.BusyConfig({
                backdrop: true,
                delay: 0,
                minDuration: 0
            })),
            ng2_bootstrap_1.ModalModule.forRoot(),
            ng2_bootstrap_1.PopoverModule.forRoot(),
            ng2_bootstrap_1.TooltipModule.forRoot(),
            ng2_toastr_1.ToastModule.forRoot(),
            primeng_1.DropdownModule
        ],
        providers: [
            toastr_service_1.ToastrService,
            {
                provide: { ToastOptions: ng2_toastr_1.ToastOptions },
                useClass: toastr_custom_option_1.CustomOption,
            }
        ]
    })
], SmSharedModule);
exports.SmSharedModule = SmSharedModule;
//# sourceMappingURL=shared.module.js.map