import jwt from "jsonwebtoken"

export function signJwt(user, expiresIn = "1d") {
  // expiresIn is a string like "1h", "10h", "7d"
  const secretKey = process.env.JWT_SECRET_KEY
  const idToken = jwt.sign(user, secretKey, { expiresIn })
  return idToken
}

export function verifyJwt(idToken) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY
    const user = jwt.verify(idToken, secretKey)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
