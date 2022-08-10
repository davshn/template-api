import server from './server'
import sequelize from './models'

const PORT = process.env.PORT ?? ''

void sequelize.sync({ force: true, logging: false }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at ' + PORT)
  })
})
