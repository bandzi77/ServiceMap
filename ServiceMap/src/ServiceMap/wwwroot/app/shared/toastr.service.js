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
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var Subject_1 = require("rxjs/Subject");
var ToastrService = (function () {
    function ToastrService(toastrMg) {
        this.toastrMg = toastrMg;
        this.subject = new Subject_1.Subject();
    }
    ToastrService.prototype.success = function (toastr) {
        this.toastrMg.success(toastr.message, 'Success!', toastr.options);
    };
    ToastrService.prototype.error = function (toastr) {
        this.toastrMg.error(toastr.message, 'Błąd!', toastr.options || { dismiss: 'click' });
    };
    ToastrService.prototype.info = function (toastr) {
        this.toastrMg.info(toastr.message, 'Informacja!', toastr.options);
    };
    ToastrService.prototype.warning = function (toastr) {
        this.toastrMg.warning(toastr.message, 'Uwaga!', toastr.options);
    };
    return ToastrService;
}());
ToastrService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager])
], ToastrService);
exports.ToastrService = ToastrService;
//# sourceMappingURL=toastr.service.js.map