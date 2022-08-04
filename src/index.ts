import express from 'express'
import dotenv from 'dotenv'

const server = express()
dotenv.config()

const { PORT } = process.env;

//Middlewares
server.use(express.json({ limit: "50mb" }))

//conection.sync({ force: false, logging: false }).then(() => {
  server.listen(PORT, () => {
    //Run server in PORT
    console.log("%s listening at " + PORT)
  });
//});