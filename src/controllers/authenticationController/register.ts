import { Request } from 'express'
import bcrypt from 'bcrypt'

import { models } from '../../models'

const registerController = async (req: Request): Promise<void> => {
  const salt = await bcrypt.genSalt(10)

  await models.User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    documentNumber: req.body.documentNumber,
    documentType: req.body.documentType,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    phone: req.body.phone
  })
}

export default registerController
