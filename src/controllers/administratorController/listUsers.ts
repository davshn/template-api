import { Request } from 'express'
import { Op } from 'sequelize'

import { getPagination, getPagingData } from '../../utils/pagination'
import { models } from '../../models'

import { dataList, pagingDataList } from '../../types/admin'

const listUsersController = async (req: Request): Promise<pagingDataList> => {
  const size = req.query.size ?? 0
  const page = req.query.page ?? 1
  const orderBy = req.query.orderBy ?? 'name'
  const orderDirection = req.query.orderDirection ?? 'ASC'
  const searchById = req.query.searchById as string
  const searchByName = req.query.searchByName as string
  const searchByLastname = req.query.searchByLastname as string
  const searchByDocumentNumber = req.query.searchByDocumentNumber as string
  const searchByEmail = req.query.searchByEmail as string
  const searchByPhone = req.query.searchByPhone as string
  const searchByRole = req.query.searchByRole as string
  const searchByIsBanned = req.query.searchByIsBanned
  const searchByIsVerified = req.query.searchByIsVerified

  const where: any = { [Op.and]: [] }

  if (searchById !== undefined) where[Op.and].push({ id: { [Op.eq]: searchById } })
  if (searchByName !== undefined) where[Op.and].push({ name: { [Op.iLike]: '%' + searchByName + '%' } })
  if (searchByLastname !== undefined) where[Op.and].push({ lastname: { [Op.iLike]: '%' + searchByLastname + '%' } })
  if (searchByDocumentNumber !== undefined) where[Op.and].push({ documentNumber: { [Op.eq]: searchByDocumentNumber } })
  if (searchByEmail !== undefined) where[Op.and].push({ email: { [Op.iLike]: '%' + searchByEmail + '%' } })
  if (searchByPhone !== undefined) where[Op.and].push({ phone: { [Op.eq]: searchByPhone } })
  if (searchByRole !== undefined) where[Op.and].push({ role: { [Op.eq]: searchByRole } })
  if (searchByIsBanned !== undefined) where[Op.and].push({ isBanned: { [Op.is]: searchByIsBanned } })
  if (searchByIsVerified !== undefined) where[Op.and].push({ isVerified: { [Op.is]: searchByIsVerified } })

  const { limit, offset } = getPagination(page as number, size as number)

  const users = await models.User.findAndCountAll({
    limit: limit,
    offset: offset,
    where: (where[Op.and].length !== 0) ? where : {},
    attributes: ['id', 'name', 'lastname', 'documentType', 'documentNumber', 'email', 'phone', 'profileAvatar', 'role', 'isBanned', 'isVerified'],
    order: [[orderBy as string, orderDirection as string]]
  }) as dataList

  const response = getPagingData(users, parseInt(page as string), limit)

  return response
}

export default listUsersController
