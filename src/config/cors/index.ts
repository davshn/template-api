import { CorsOptions } from 'cors'

import Logger from '../logger/winston'

const whitelist: string[] = ['https://adoptapi.herokuapp.com', 'http://localhost:4000']

const corsConfig = {
  origin: function (origin: string, callback: Function) {
    if (whitelist.includes(origin) || origin === undefined) {
      callback(null, true)
    } else {
      Logger.error('CORS incorrecto ' + origin)
      // eslint-disable-next-line node/no-callback-literal
      callback('No permitido por CORS')
    }
  }
}

export default corsConfig as CorsOptions
