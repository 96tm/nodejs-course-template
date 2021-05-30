"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Board {
    constructor({ id = uuid_1.v4(), title = 'Board', columns = [] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
}
exports.default = Board;
