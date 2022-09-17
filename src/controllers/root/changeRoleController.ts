import { Request } from 'express'

import { models } from '../../models'

import { userModel } from '../../types/auth'

const changeRoleController = async (req: Request): Promise<any> => {
  const { userId } = req.body
  const { role } = req.body

  const user = await models.User.findOne({ where: { id: userId } }) as userModel
  user.set({ role: role })
  await user.save()
}

export default changeRoleController
