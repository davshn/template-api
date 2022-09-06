import jwt from 'jsonwebtoken'

const { TOKEN_KEY } = process.env
const { TOKEN_REF_KEY } = process.env

export const signAuthToken = (userId: string, userEmail: string): string => {
  const token = jwt.sign(
    {
      id: userId,
      email: userEmail
    },
    TOKEN_KEY as string,
    {
      expiresIn: '1h'
    }
  )
  return token
}

export const signRefreshToken = (tokenId: string, userEmail: string): string => {
  const token = jwt.sign(
    {
      id: tokenId,
      email: userEmail
    },
    TOKEN_REF_KEY as string,
    {
      expiresIn: '30d'
    }
  )
  return token
}
