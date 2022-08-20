"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = ['https://adoptapi.herokuapp.com'];
const corsConfig = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whitelist.includes(origin) || origin === undefined) {
            callback(null, true);
        }
        else {
            // eslint-disable-next-line node/no-callback-literal
            callback('No permitido por CORS');
        }
    }
};
exports.default = corsConfig;
