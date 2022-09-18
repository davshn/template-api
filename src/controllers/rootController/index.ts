import path from 'path'
import { importControllers } from '../../utils/importFiles'

const basename = path.basename(__filename)
const dirname = __dirname

const controllers = importControllers(basename, dirname)

export default controllers
