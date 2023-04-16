"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByField = void 0;
const sortByField = (arr, sortField) => arr.sort((itemA, itemB) => itemA[sortField] - itemB[sortField]);
exports.sortByField = sortByField;
