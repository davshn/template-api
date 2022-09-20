import { Model, DataTypes, Sequelize } from 'sequelize'

import { SubcategoryAttributes } from '../types/modelAttributes'

module.exports = (sequelize: Sequelize) => {
  class Subcategory extends Model<SubcategoryAttributes> implements SubcategoryAttributes {
    id!: string
    name!: string
    detail!: string
    image!: string

    static associate (models: any): void {
      Subcategory.belongsTo(models.Category)
      Subcategory.hasMany(models.Post)
    }
  }
  Subcategory.init({
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
    modelName: 'Subcategory',
    timestamps: false
  })
  return Subcategory
}
