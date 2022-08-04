import { Model, DataTypes } from 'sequelize'

interface UserAttributes {
  id: string
  name: string
  lastname: string
  email: string
  password: string
  dateOfBirth: Date
  createdAdoptions: number
  deviceInfo: string
  isBaned: boolean
}

module.exports = (sequelize: any) => {
  class User extends Model<UserAttributes>
    implements UserAttributes {
    id!: string
    name!: string
    lastname!: string
    email!: string
    password!: string
    dateOfBirth!: Date
    createdAdoptions!: number
    deviceInfo!: string
    isBaned!: boolean
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
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    createdAdoptions: {
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
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  })
  return User
}
