"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
function ipValidator(c) {
    var IP_REGEXP = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    return IP_REGEXP.test(c.value) ? rxjs_1.of(null) : rxjs_1.of({
        ipValidator: {
            valid: false
        }
    });
}
exports.ipValidator = ipValidator;
//# sourceMappingURL=common.js.map