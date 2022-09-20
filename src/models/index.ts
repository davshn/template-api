import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'

const { DATABASE_URL } = process.env
const basename = path.basename(__filename)

const config = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(DATABASE_URL as string, config)

fs.readdirSync(path.join(__dirname, './'))
  .filter((file: string) => file.indexOf('.') !== 0 && file !== basename).forEach((async (file: string) => {
    const model = require(path.join(__dirname, './', file))
    console.log(model)
    model(sequelize)
  }) as any)

export const models: any = sequelize.models

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate !== undefined) {
    models[modelName].associate(models)
  }
})

export default sequelize
