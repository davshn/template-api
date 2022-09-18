import { Request } from 'express'

import { models } from '../../models'

import { userModel } from '../../types/auth'

const banUserController = async (req: Request): Promise<void> => {
  const { userId } = req.body
  const { ban } = req.body

  const user = await models.User.findOne({ where: { id: userId } }) as userModel

  if (user === null) throw new Error('Usuario no encontrado ')

  user.set({ isBanned: ban })
  await user.save()
}

export default banUserController
