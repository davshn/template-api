import { Request } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { models } from '../models'
import { userToken } from '../types/types'

const { TOKEN_KEY } = process.env

export const loginController = async (req: Request): Promise<userToken> => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password
  const deviceInfo = req.body.deviceInfo

  const user = await models.User.findOne({ where: { email } }) as any

  if ((user !== null) && (await bcrypt.compare(password, user.password))) {
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
  } else throw new Error('Datos incorrectos')
}
