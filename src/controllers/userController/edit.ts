import { Request } from 'express'
import bcrypt from 'bcrypt'

import { models } from '../../models'
import { decodedToken } from '../../types/types'
import { userModel } from '../../types/auth'

const editController = async (req: Request): Promise<void> => {
  const userInfo = req.user as decodedToken
  const user = await models.User.findOne({ where: { id: userInfo.id } }) as userModel

  if (req.body.name !== undefined) { user.set({ name: req.body.name }) }
  if (req.body.lastname !== undefined) { user.set({ lastname: req.body.lastname }) }
  if (req.body.phone !== undefined) { user.set({ phone: req.body.phone }) }
  if (req.body.password !== undefined) {
    const salt = await bcrypt.genSalt(10)
    user.set({ password: await bcrypt.hash(req.body.password, salt) })
  }
  await user.save()
}

export default editController
