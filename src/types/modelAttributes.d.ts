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

export interface CategoryAttributes {
  id: string
  name: string
  detail: string
  image: string
  isPrivate: boolean
}

export interface SubcategoryAttributes {
  id: string
  name: string
  detail: string
  image: string
}

export interface PostAttributes {
  id: string
  name: string
  detail: string
  image: string
}

export interface CommentsAttributes {
  id: string
  name: string
  text: string
}
