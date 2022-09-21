import { Request } from 'express'

import { models } from '../../models'

const createSubcategoryController = async (req: Request): Promise<void> => {
  await models.Subcategory.create({
    name: req.body.name,
    detail: req.body.detail,
    CategoryId: req.body.categoryId
  })
}

export default createSubcategoryController
