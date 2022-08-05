import { Model, DataTypes, Sequelize } from 'sequelize'
import { UserAttributes, documentTypes } from '../types'

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
    isBaned!: boolean
    isVerified!: boolean
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
      type: DataTypes.STRING,
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
    isBaned: {
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
