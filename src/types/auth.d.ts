import { Model } from 'sequelize/types'

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
export interface UserAttributes {
  id: string
  name: string
  lastname: string
  documentNumber: string
  documentType: documentTypes
  email: string
  phone: string
  password: string
  profileAvatar: string
  deviceInfo: deviceTokens
  role: userRoles
  isBanned: boolean
  isVerified: boolean
}

export interface userModel extends Model<UserAttributes>, UserAttributes{}

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
