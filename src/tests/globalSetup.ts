import dotenv from 'dotenv'

module.exports = async () => {
  dotenv.config()
  console.log('\nhello, this is just before tests start running')
}
