import { Request } from 'express'

export interface UserAttributes {
  id: string
  name: string
  lastname: string
  documentNumber: string
  documentType: documentTypes
  email: string
  phone: string
  password: string
  givenInAdoption: number
  deviceInfo: string
  isBaned: boolean
  isVerified: boolean
}

export enum documentTypes {
  CC = 'CC',
  NI = 'NI',
  CE = 'CE'
}

export interface DecodedRequest extends Request{
  user: any
}

export interface userToken{
  token: string
}
