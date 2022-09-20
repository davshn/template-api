import { Model, DataTypes, Sequelize } from 'sequelize'

import { PostAttributes } from '../types/modelAttributes'

module.exports = (sequelize: Sequelize) => {
  class Post extends Model<PostAttributes> implements PostAttributes {
    id!: string
    name!: string
    detail!: string
    image!: string
  }
  Post.init({
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
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false
  })
  return Post
}
