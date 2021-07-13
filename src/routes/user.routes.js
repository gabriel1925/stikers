const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
const passport = require('passport')
const { isAuthenticated, authenticatedviews } = require('../helpers/auth')

router.get('/singup',authenticatedviews,user.singup)
router.post('/singup',user.singuppost)
router.get('/singin',authenticatedviews,user.singin)
router.post('/singin', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/singin",
    failureFlash: true,
  }))
router.get('/logout', user.logout)
module.exports = router