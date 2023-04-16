"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeToCamel = void 0;
const snakeToCamel = (string) => {
    let words = string.split('_');
    words[0] = words[0].toLowerCase();
    for (let i = 1; i < words.length; i++) {
        words[i] =
            words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join('');
};
exports.snakeToCamel = snakeToCamel;
