import { Model, DataTypes, Sequelize } from 'sequelize'
import { UserAttributes, documentTypes } from '../types/types'

module.exports = (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string
    name!: string
    lastname!: string
    documentNumber!: string
    documentType!: documentTypes
    email!: string
    password!: string
    givenInAdoption!: number
    deviceInfo!: string
    isBanned!: boolean
    isVerified!: boolean
    phone!: string
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    documentNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    documentType: {
      type: DataTypes.ENUM('CC', 'NI', 'CE'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    givenInAdoption: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    deviceInfo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  })
  return User
}
