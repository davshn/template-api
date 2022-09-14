import winston from 'winston'
import { LoggingWinston } from '@google-cloud/logging-winston'
import dotenv from 'dotenv'

dotenv.config()

const ENV = process.env.NODE_ENV as string
const loggingWinston = new LoggingWinston()

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp as string} ${info.level}: ${info.message as string}`
  )
)

const transportsDev = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/all.log' })
]

const transportsGoogle: [] = [
  /* new winston.transports.Console(),
  loggingWinston */
]

const transports = ENV === 'develop' ? transportsDev : transportsGoogle
console.log(ENV)
const Logger = winston.createLogger({
  level: 'info',
  levels,
  format,
  transports
})

export default Logger
