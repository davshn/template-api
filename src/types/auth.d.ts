export interface UserAttributes {
  id: string
  name: string
  lastname: string
  documentNumber: string
  documentType: documentTypes
  email: string
  phone: string
  password: string
  deviceInfo: string
  role: userRoles
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

export enum userRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ROOT = 'ROOT'
}
