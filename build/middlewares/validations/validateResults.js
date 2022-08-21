"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const winston_1 = __importDefault(require("../../config/logger/winston"));
const validateResults = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        return next();
    }
    catch (err) {
        winston_1.default.warn('Error de validacion' + JSON.stringify(err.array()));
        res.status(422);
        res.json(err.array());
    }
};
exports.default = validateResults;
