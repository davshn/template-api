import morgan, { StreamOptions } from 'morgan'

import Logger from './winston'

const stream: StreamOptions = {
  write: (message) => Logger.info(message)
}

const morganMiddleware = morgan(
  'Request: :method  :url Response: :status :res[content-length] - :response-time ms',
  { stream }
)

export default morganMiddleware
