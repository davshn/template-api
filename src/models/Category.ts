import { Model, DataTypes, Sequelize } from 'sequelize'

import { CategoryAttributes } from '../types/categories'

module.exports = (sequelize: Sequelize) => {
  class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    id!: string
    name!: string
    detail!: string
    image!: string
    isPrivate!: boolean

    static associate (models: any): void {
      Category.hasMany(models.Subcategory)
    }
  }
  Category.init({
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
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false
  })
  return Category
}
