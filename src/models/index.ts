import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .filter((file: string) => file.indexOf('.') !== 0 && file !== basename).forEach(async (file) => {
    const model = await import(path.join(__dirname, './', file))
    model.default(sequelize)
  })

export const models = sequelize.models

export default sequelize
