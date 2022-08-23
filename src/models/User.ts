import { Model, DataTypes, Sequelize } from 'sequelize'
import { UserAttributes, documentTypes, userRoles, deviceTokens } from '../types/auth'

module.exports = (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string
    name!: string
    lastname!: string
    documentNumber!: string
    documentType!: documentTypes
    email!: string
    phone!: string
    password!: string
    deviceInfo!: deviceTokens
    role!: userRoles
    isBanned!: boolean
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
    deviceInfo: {
      type: DataTypes.JSON,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('USER', 'ADMIN', 'ROOT'),
      defaultValue: 'USER',
      allowNull: false
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
