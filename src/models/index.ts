import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL } = process.env
const basename = path.basename(__filename)
const modelDefiners: any[] = []

const config = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(DATABASE_URL as string, config)

// Reading all models from files
fs.readdirSync(path.join(__dirname, './'))
  .filter(
    (file: string) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
  )
  .forEach((file: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    modelDefiners.push(require(path.join(__dirname, './', file)))
  })
// Inject models to sequelize
modelDefiners.forEach((model) => model(sequelize))
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1]
]);

(sequelize.models as any) = Object.fromEntries(capsEntries)

export default { ...sequelize.models, conection: sequelize }
