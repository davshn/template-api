export interface UserAttributes {
  id: string
  name: string
  lastname: string
  documentNumber: number
  documentType: documentTypes
  email: string
  phone: number
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
