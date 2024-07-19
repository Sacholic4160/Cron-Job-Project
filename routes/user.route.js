const express = require('express')
const { createTable, createUser } = require('../controller/user.controller.js')
const router = express.Router()


router.post('/table',createTable)
router.post('/user',createUser)

module.exports = router