declare global {
  namespace Express {
    interface Request {
      user?: decodedToken
    }
  }
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
  givenInAdoption: number
  deviceInfo: string
  isBanned: boolean
  isVerified: boolean
}

export enum documentTypes {
  CC = 'CC',
  NI = 'NI',
  CE = 'CE'
}

export interface userToken {
  token: string
}

export interface decodedToken{
  id: string
  email: string
  deviceInfo: string
}
