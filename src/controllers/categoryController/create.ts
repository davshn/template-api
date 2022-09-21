import { Request } from 'express'

import { models } from '../../models'

const createController = async (req: Request): Promise<void> => {
  await models.Category.create({
    name: req.body.name,
    detail: req.body.detail,
    isPrivate: req.body.isPrivate
  })
}

export default createController
