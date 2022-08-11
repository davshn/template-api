import { Request } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { models } from '../models'
import { userToken } from '../types/types'

const { TOKEN_KEY } = process.env

export const registerController = async (req: Request): Promise<any> => {
  const salt = await bcrypt.genSalt(10)

  await models.User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    documentNumber: req.body.documentNumber,
    documentType: req.body.documentType,
    email: req.body.email.toLowerCase(),
    password: await bcrypt.hash(req.body.password, salt),
    phone: req.body.phone
  })
}

export const loginController = async (req: Request): Promise<userToken> => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password
  const deviceInfo = req.body.deviceInfo

  const user = await models.User.findOne({ where: { email } }) as any
  const isAuthenticated = await bcrypt.compare(password, user.password)
  if (user !== null && isAuthenticated) {
    const isBanned: boolean = user.isBanned
    const isVerified: boolean = user.isVerified

    if (!isVerified) throw new Error('Usuario no verificado')
    else if (isBanned) throw new Error('Usuario baneado')
    else {
      const salt = await bcrypt.genSalt(10)
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          deviceInfo: await bcrypt.hash(deviceInfo, salt)
        },
        TOKEN_KEY as string,
        {
          expiresIn: '1h'
        }
      )

      await user.set({ deviceInfo: deviceInfo })
      await user.save()

      const loggedUser = {
        token: token
      }
      return loggedUser
    }
  } else throw new Error('Datos incorrectos')
}
