import { Request } from 'express'

import { models } from '../../models'

import { userModel } from '../../types/auth'

const userDetailController = async (req: Request): Promise<userModel> => {
  const searchById = req.query.searchById as string
  const searchByDocumentNumber = req.query.searchByDocumentNumber as string
  const searchByEmail = req.query.searchByEmail as string
  const searchByPhone = req.query.searchByPhone as string

  const where: { [key: string]: string } = { }

  if (searchById !== undefined) where.id = searchById
  if (searchByDocumentNumber !== undefined) where.documentNumber = searchByDocumentNumber
  if (searchByEmail !== undefined) where.email = searchByEmail
  if (searchByPhone !== undefined) where.phone = searchByPhone

  const user = await models.User.findOne({
    where,
    attributes: ['id', 'name', 'lastname', 'documentType', 'documentNumber', 'email', 'phone', 'profileAvatar', 'role', 'isBanned', 'isVerified'],
    include: [{ model: models.Post, attributes: ['id', 'name'] }, { model: models.Comment, attributes: ['id', 'name'] }]
  }
  ) as userModel

  if (user === null) throw new Error('Ningun usuario coincide con la busqueda ')
  return user
}

export default userDetailController
