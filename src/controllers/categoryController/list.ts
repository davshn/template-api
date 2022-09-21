
import { models } from '../../models'

const listController = async (): Promise<any> => {
  const categories = await models.Category.findAll({
    include: [{ model: models.Subcategory }],
    order: ['name']
  })

  return categories
}

export default listController
