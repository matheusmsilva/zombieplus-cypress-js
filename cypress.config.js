const { defineConfig } = require("cypress");
require('dotenv').config()
const { Pool } = require("pg")

const DbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
}


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {

        executeSQL(sqlScript) {
          return new Promise((resolve, reject) => {
            const pool = new Pool(DbConfig)
            pool.query(sqlScript, (error, result) => {
              if (error) {
                reject(error)
              }

              resolve(result)
              pool.end()
            })
          })
        }

      })

    },
    baseUrl: process.env.WEB_URL,
    viewportHeight: 1080,
    viewportWidth: 1920
  },
});
