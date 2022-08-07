import { Request } from 'express'
import bcrypt from 'bcrypt'

import db from '../models'

export const registerController = async (req: Request): Promise<any> => {
  const salt = await bcrypt.genSalt(10)

  await db.models.User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    documentNumber: req.body.documentNumber,
    documentType: req.body.documentType,
    email: req.body.email.toLowerCase(),
    password: await bcrypt.hash(req.body.password, salt),
    phone: req.body.phone
  })
}
