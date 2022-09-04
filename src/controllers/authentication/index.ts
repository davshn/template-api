import fs from 'fs'
import path from 'path'

import { controller } from '../../types/auth'

const basename = path.basename(__filename)
const controllers: controller = {}

fs.readdirSync(path.join(__dirname, './'))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .filter((file: string) => file.indexOf('.') !== 0 && file !== basename).forEach(async (file: string) => {
    const controller = await import(path.join(__dirname, './', file))
    controllers[file.slice(0, -3)] = controller.default
  })

export default controllers
