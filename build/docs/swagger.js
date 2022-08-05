"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Documentation Adopt-Api',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:3000'
        },
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            newUser: {
                type: 'object',
                required: ['name', 'lastname', 'documentNumber', 'documentType', 'email', 'phone'],
                properties: {
                    name: {
                        type: 'string'
                    },
                    lastname: {
                        type: 'string'
                    },
                    documentNumber: {
                        type: 'integer'
                    },
                    documentType: {
                        type: 'string',
                        enum: ['CC', 'NI', 'CE']
                    },
                    email: {
                        type: 'string'
                    },
                    phone: {
                        type: 'integer'
                    }
                }
            }
        }
    }
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
