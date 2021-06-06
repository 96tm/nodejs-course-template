"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Column {
    constructor({ id = uuid_1.v4(), title = 'Column', order = '0', }) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
exports.default = Column;
