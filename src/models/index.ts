import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL } = process.env
const basename = path.basename(__filename)

const db: any = {}
const config = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize.Sequelize(DATABASE_URL as string, config)

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
  })
  .forEach((file: any) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
