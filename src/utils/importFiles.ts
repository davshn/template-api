import fs from 'fs'
import path from 'path'

import { controller } from '../types/auth'

export const importControllers = (basename: string, dirname: string): controller => {
  const controllers: controller = {}

  function filterFiles (file: string): boolean {
    return file.indexOf('.') !== 0 && file !== basename
  }

  async function joinFiles (file: string): Promise<void> {
    const controller = await import(path.join(dirname, './', file))
    controllers[file.slice(0, -3)] = controller.default
  }

  fs.readdirSync(path.join(dirname, './')).filter(filterFiles).forEach(joinFiles as any)

  return controllers
}
