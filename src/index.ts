/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import server from './server'
import sequelize from './models'

const PORT = process.env.PORT ?? ''

void sequelize.sync({ force: false, logging: false }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at ' + PORT)
  })
})
