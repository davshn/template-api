import { Request } from 'express'

import { getPagination, getPagingData } from '../../utils/pagination'
import { models } from '../../models'

import { dataList, pagingDataList } from '../../types/admin'

const listUsersController = async (req: Request): Promise<pagingDataList> => {
  const size = req.query.size ?? '0'
  const page = req.query.page ?? '1'
  const orderBy = req.query.size ?? 'name'
  const orderDirection = req.query.page ?? 'ASC'

  const where = {}

  const { limit, offset } = getPagination(parseInt(page as string), parseInt(size as string))

  const users = await models.User.findAndCountAll({
    limit: limit,
    offset: offset,
    where: where,
    attributes: ['id', 'name', 'lastname', 'documentType', 'documentNumber', 'email', 'phone', 'profileAvatar', 'role', 'isBanned', 'isVerified'],
    order: [[orderBy as string, orderDirection as string]]
  }) as dataList

  const response = getPagingData(users, parseInt(page as string), limit)

  return response
}

export default listUsersController
