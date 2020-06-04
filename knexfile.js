require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DEVELOPMENT_DB_HOST,
      database: process.env.DEVELOPMENT_DB,
      user: process.env.DEVELOPMENT_DB_USER,
      password: process.env.DEVELOPMENT_DB_PASSWORD
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
      useNullAsDefault: true
    }
  },

  production: {
    client: "mysql",
    connection: {
      host: process.env.PRODUCTION_DB_HOST ,
      database: process.env.PRODUCTION_DB,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 1000
    },
    migrations: {
      directory: "./migrations"
    }
  }

};