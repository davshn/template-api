import { Model, DataTypes, Sequelize } from 'sequelize'
import { documentTypes, userRoles, deviceTokens } from '../types/auth'
import { UserAttributes } from '../types/modelAttributes'

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
    profileAvatar!: string
    deviceInfo!: deviceTokens
    role!: userRoles
    isBanned!: boolean
    isVerified!: boolean

    static associate (models: any): void {
      User.hasMany(models.Comment)
      User.hasMany(models.Post)
      User.belongsToMany(models.Post, {
        through: 'PostFollowed'
      })
    }
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileAvatar: {
      type: DataTypes.STRING,
      allowNull: true
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
