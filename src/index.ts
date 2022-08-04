import dotenv from 'dotenv'

import server from './server'

dotenv.config()

const { PORT } = process.env;

//conection.sync({ force: false, logging: false }).then(() => {
  server.listen(PORT, () => {
    //Run server in PORT
    console.log("%s listening at " + PORT)
  });
//});