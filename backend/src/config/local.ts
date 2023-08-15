export default {
  port: 3001,
  secrets: {
    dbUrl:
      'postgresql://postgres:postgres@localhost:5432/ApiDesign?schema=public',
    jwt: 'secret',
    salts: 10
  }
}
