"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopy = void 0;
const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));
exports.deepCopy = deepCopy;
