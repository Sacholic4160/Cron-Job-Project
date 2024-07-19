const config = require('./config/config.js')
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const pool = require('./index.js')

const sendMailToAllUser = async (emails) => {
   const transporter =  nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS:true,
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    })

    const mailOptions = {
        from : 'Cron-Job-Project',
        to: emails,
        subject: 'Cron Job Test',
        text: 'This is a test mail from cron job project'

    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Email sent: ' + info.response)
        }
    })
}

const sendMail = async () => {
    try {
        cron.schedule('*/10 * * * * *',  async () => {
const userData = await pool.query('SELECT * FROM users')
if(userData.rowCount > 0) {

    let email = [];
    userData.rows.map((keys)=> {
        email.push(keys.email)
    })
  sendMailToAllUser(email)
}
        })
    } catch (error) {
        
    }
}
module.exports = sendMail