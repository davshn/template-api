import { CorsOptions } from 'cors'

const whitelist: string[] = ['https://adoptapi.herokuapp.com']

const corsConfig = {
  origin: function (origin: string, callback: Function) {
    if (whitelist.includes(origin) || origin === undefined) {
      callback(null, true)
    } else {
      // eslint-disable-next-line node/no-callback-literal
      callback('No permitido por CORS')
    }
  }
}

export default corsConfig as CorsOptions
