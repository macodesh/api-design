export default {
  port: process.env.PORT,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
    salts: process.env.BCRYPT_SALTS
  }
}
