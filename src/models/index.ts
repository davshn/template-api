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
    const model = await import(path.join(__dirname, './', file))
    model.default(sequelize)
  }) as any)

export const models = sequelize.models

export default sequelize
