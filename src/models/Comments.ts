import { Model, DataTypes, Sequelize } from 'sequelize'

import { CommentsAttributes } from '../types/modelAttributes'

module.exports = (sequelize: Sequelize) => {
  class Comment extends Model<CommentsAttributes> implements CommentsAttributes {
    id!: string
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: true
  })
  return Comment
}
