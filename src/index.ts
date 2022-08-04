import server from './server'
import db from './models'

const PORT = process.env.PORT ?? ''

void db.conection.sync({ force: true, logging: false }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at ' + PORT)
  })
})
