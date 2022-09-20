declare global {
  namespace Express {
    interface Request {
      user?: decodedToken
    }
  }
}

export interface decodedToken {
  id: string
  email: string
}
