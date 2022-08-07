import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL } = process.env
const basename = path.basename(__filename)
const modelDefiners: Function[] = []

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
  .filter(
    (file: string) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
  )
  .forEach((file: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    modelDefiners.push(require(path.join(__dirname, './', file)))
  })
console.log(modelDefiners)
modelDefiners.forEach((model: Function) => model(sequelize))
console.log(sequelize.models)
export default sequelize
