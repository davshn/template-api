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
  const searchByName = req.query.searchByName as string
  const searchByLastname = req.query.searchByLastname as string
  const searchByRole = req.query.searchByRole as string
  const searchByIsBanned = req.query.searchByIsBanned
  const searchByIsVerified = req.query.searchByIsVerified

  const where: any = { [Op.and]: [] }

  if (searchByName !== undefined) where[Op.and].push({ name: { [Op.iLike]: '%' + searchByName + '%' } })
  if (searchByLastname !== undefined) where[Op.and].push({ lastname: { [Op.iLike]: '%' + searchByLastname + '%' } })
  if (searchByRole !== undefined) where[Op.and].push({ role: { [Op.eq]: searchByRole } })
  if (searchByIsBanned !== undefined) where[Op.and].push({ isBanned: { [Op.is]: searchByIsBanned } })
  if (searchByIsVerified !== undefined) where[Op.and].push({ isVerified: { [Op.is]: searchByIsVerified } })

  const { limit, offset } = getPagination(page as number, size as number)

  const users = await models.User.findAndCountAll({
    limit,
    offset,
    where: (where[Op.and].length !== 0) ? where : {},
    attributes: ['id', 'name', 'lastname', 'documentType', 'documentNumber', 'email', 'phone', 'profileAvatar', 'role', 'isBanned', 'isVerified'],
    order: [[orderBy as string, orderDirection as string]]
  }) as dataList

  const response = getPagingData(users, parseInt(page as string), limit)

  return response
}

export default listUsersController
