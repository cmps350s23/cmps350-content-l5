import jwt from "jsonwebtoken"

const DEFAULT_SIGN_OPTION = {
  expiresIn: "1h",
}

export function signJwt(payload, options = DEFAULT_SIGN_OPTION) {
  const secretKey = process.env.JWT_SECRET_KEY
  const token = jwt.sign(payload, secretKey, options)
  return token
}

export function verifyJwt(token) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY
    const user = jwt.verify(token, secretKey)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
