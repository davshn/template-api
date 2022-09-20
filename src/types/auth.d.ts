import { Model } from 'sequelize/types'
import { UserAttributes } from './modelAttributes'

export enum documentTypes {
  CC = 'CC',
  NI = 'NI',
  CE = 'CE'
}

export enum userRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ROOT = 'ROOT'
}
export interface userModel extends Model<UserAttributes>, UserAttributes {}

export interface userToken {
  token: string
  refreshToken: string
}

export interface deviceTokens {
  [key: string]: string
}

export interface controller {
  [key: string]: Function
}
