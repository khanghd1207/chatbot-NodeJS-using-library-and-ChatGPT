const express = require('express')
const passport = require('passport');
const csrf = require('csurf')
let csrfProtection = csrf({ cookie: true });
const account = express()
require('../passport');
account.use(passport.initialize());
account.use(passport.session());
let flag = true
function test(req, res, next) {
    if(flag){
        if (req.user) {
            req.logout()
            flag = false
            return next()
        }
        return next()
    }
    next()
}

account.use(test)
const accController = require('../controllers/accountController');


account.get('/', csrfProtection, accController.login)
account.get('/login', csrfProtection, accController.login)
account.get('/register', csrfProtection, accController.register)
account.get('/logout', accController.logout)
// account.get('/update:id', accController.update)
//----------------login Google----------------
account.get('/auth-google', passport.authenticate('google', { scope: ['email', 'profile'] }))
account.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
    }));
//----------------login Facebook----------------
account.get('/auth-facebook', passport.authenticate('facebook', { scope: 'email' }));
account.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
    }));
//----------------login local----------------
account.post('/auth/local', csrfProtection, passport.authenticate('local', { successRedirect: '/auth/local/success', failureRedirect: '/auth/local/failure' }));
//----------------local success----------------
account.get('/auth/local/success', accController.successLocal)
//----------------local Failure----------------
account.get('/auth/local/failure', accController.failureLocal)

//----------------success----------------
account.get('/auth/callback/success', accController.success)
//----------------Failure----------------
account.get('/auth/callback/failure', accController.failure)

account.post('/register', csrfProtection, accController.post_register)
// account.put('/update', accController.put_update)

account.get('/chatbot', accController.chatbot)

account.get('/account', accController.account)

module.exports = account