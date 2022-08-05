export interface UserAttributes {
  id: string
  name: string
  lastname: string
  documentNumber: string
  documentType: 'CC'| 'NI' | 'CE'
  email: string
  password: string
  givenInAdoption: number
  deviceInfo: string
  isBaned: boolean
  isVerified: boolean
}
