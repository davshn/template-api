"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const models_1 = __importDefault(require("./models"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '';
void models_1.default.conection.sync({ force: true, logging: false }).then(() => {
    server_1.default.listen(PORT, () => {
        console.log('%s listening at ' + PORT);
    });
});
//    "start": "node build/index.js"
