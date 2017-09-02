"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var CustomOption = (function (_super) {
    __extends(CustomOption, _super);
    function CustomOption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animate = 'fade'; // you can override any options available
        _this.newestOnTop = false;
        _this.showCloseButton = true;
        return _this;
    }
    return CustomOption;
}(ng2_toastr_1.ToastOptions));
exports.CustomOption = CustomOption;
//# sourceMappingURL=toastr-custom-option.js.map