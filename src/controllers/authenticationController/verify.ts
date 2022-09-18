import { Request } from 'express'

import { models } from '../../models'
import { userModel } from '../../types/auth'

const verifyController = async (req: Request): Promise<void> => {
  const verifyToken = req.params.verifyToken
  const email = req.params.email
  const user = await models.User.findOne({ where: { email: email } }) as userModel
  console.log(verifyToken)
  if (verifyToken !== user.id) throw new Error('Error en la verificacion ')
  user.set({ isVerified: true })
  await user.save()
}

export default verifyController
