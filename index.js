const express = require('express')
 const app= express();
 
const { Pool } = require('pg')
require('dotenv').config()

app.use(express.json());
/* const cron = require('node-cron')
 const fs = require('fs')

  cron.schedule('* * * * * *', () => {
console.log('running a task every second');
  const data = 'hie  i am adding this task every 10 seconds\n'

   fs.appendFile('data.txt',data, (err) => {
       if(err) throw err;
       console.log('File data added!')
    })
  }) */

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT

})
module.exports = pool

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()')
        console.log('connected to database')

    } catch (error) {
        console.log('error connecting to database', error)
    }
}
testConnection()
const sendMail = require('./cron.js')
sendMail();
const tableRouter = require('./routes/user.route')
app.use('/api',tableRouter)
 app.listen(3000, () => {

    console.log('Listening')
 })