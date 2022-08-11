"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class User extends sequelize_1.Model {
    }
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        documentNumber: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        documentType: {
            type: sequelize_1.DataTypes.ENUM('CC', 'NI', 'CE'),
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            validate: { isEmail: true },
            allowNull: false,
            unique: true
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        givenInAdoption: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0
        },
        deviceInfo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        isBanned: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        isVerified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'User',
        timestamps: false
    });
    return User;
};
