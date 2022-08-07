"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const versionProtection = (req, res, next) => {
    const { VERSION } = process.env;
    const version = req.header('Version');
    if (version !== VERSION) {
        res.status(426).send('La ultima version de la aplicacion es requerida');
    }
    else
        next();
};
exports.default = versionProtection;
