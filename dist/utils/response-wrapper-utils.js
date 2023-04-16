"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapSuccessResponse = void 0;
const wrapSuccessResponse = (res, data) => {
    console.log(`Success\n ${JSON.stringify(data)}`);
    return res.status(200).json({ result: data });
};
exports.wrapSuccessResponse = wrapSuccessResponse;
