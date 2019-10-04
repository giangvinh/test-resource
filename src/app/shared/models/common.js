"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@angular/material");
function getPaginatorIntl() {
    var paginatorIntl = new material_1.MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = "Số dòng trên trang";
    paginatorIntl.getRangeLabel = function (page, pageSize, length) {
        var to = Math.min((page + 1) * pageSize, length);
        var from = Math.min((page) * pageSize + 1, length);
        return from + " ~ " + to + " trong s\u1ED1 " + length;
    };
    return paginatorIntl;
}
exports.getPaginatorIntl = getPaginatorIntl;
//# sourceMappingURL=common.js.map