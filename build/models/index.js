"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DATABASE_URL } = process.env;
const basename = path_1.default.basename(__filename);
const modelDefiners = [];
const config = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};
const sequelize = new sequelize_1.Sequelize(DATABASE_URL, config);
fs_1.default.readdirSync(path_1.default.join(__dirname, './'))
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
    .forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    modelDefiners.push(require(path_1.default.join(__dirname, './', file)));
});
modelDefiners.forEach((model) => model(sequelize));
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1]
]);
sequelize.models = Object.fromEntries(capsEntries);
exports.default = sequelize;
