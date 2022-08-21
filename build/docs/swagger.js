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
            url: 'https://adoptapi.herokuapp.com'
        },
        {
            url: 'http://localhost:4000'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        responses: {
            200: {
                description: 'Success.'
            },
            400: {
                description: 'Bad request.'
            },
            422: {
                description: 'Validation error.'
            },
            401: {
                description: 'Invalid User.'
            }
        },
        schemas: {
            newUser: {
                type: 'object',
                required: ['name', 'lastname', 'documentNumber', 'documentType', 'email', 'password', 'phone'],
                properties: {
                    name: {
                        type: 'string'
                    },
                    lastname: {
                        type: 'string'
                    },
                    documentNumber: {
                        type: 'string'
                    },
                    documentType: {
                        type: 'string',
                        enum: ['CC', 'NI', 'CE']
                    },
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    phone: {
                        type: 'string'
                    }
                }
            },
            userLogin: {
                type: 'object',
                required: ['email', 'password', 'deviceInfo'],
                properties: {
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    deviceInfo: {
                        type: 'string'
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
