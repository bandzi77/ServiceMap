"use strict";
//import './polyfills';
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
var core_1 = require("@angular/core");
//import { environment } from './environments/environment';
if (!/localhost/.test(document.location.host)) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map