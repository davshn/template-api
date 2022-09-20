import { Model, DataTypes, Sequelize } from 'sequelize'

import { CommentsAttributes } from '../types/modelAttributes'

module.exports = (sequelize: Sequelize) => {
  class Comment extends Model<CommentsAttributes> implements CommentsAttributes {
    id!: string
    name!: string
    text!: string

    static associate (models: any): void {
      Comment.belongsTo(models.Post)
      Comment.belongsTo(models.User)
    }
  }
  Comment.init({
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
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: true
  })
  return Comment
}
