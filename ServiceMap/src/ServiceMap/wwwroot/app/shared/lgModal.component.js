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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var LgModalComponent = (function () {
    function LgModalComponent() {
    }
    LgModalComponent.prototype.show = function () {
        this.lgModalRef.show();
    };
    LgModalComponent.prototype.hide = function () {
        this.lgModalRef.hide();
    };
    return LgModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LgModalComponent.prototype, "myheader", void 0);
__decorate([
    core_1.ViewChild('lgModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], LgModalComponent.prototype, "lgModalRef", void 0);
LgModalComponent = __decorate([
    core_1.Component({
        selector: 'lg-modal',
        templateUrl: 'app/shared/lgModal.component.html'
    })
], LgModalComponent);
exports.LgModalComponent = LgModalComponent;
//# sourceMappingURL=lgModal.component.js.map