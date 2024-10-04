const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const userController = {

    // page for sign-up
    getSignUpPage: (req, res) => res.render('sign-up'),

    // page for sign-in
    getSignInPage: (req, res) => res.render('sign-in'),



    // api to sign-up
    postSignUp: async (req, res) => {

        // destruct credentials for arrangement
        const { username, email, password, firstname, lastname, phone, role = 'customer' } = req.body
        
        // hash password
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

        // send result
        await userModel.insert([username, email, hashedPassword, firstname, lastname, phone, role])
            .then(result => res.redirect('/authentication/users/sign-in'))
            .catch(err => res.status(500).send(err))
    },
    
    // api to sign-in
    postSignIn: async (req, res) => {
        
        // destruct credentials for arrangement
        const { username, password, role = 'customer' } = req.body

        // hash password
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

        // set token to cookies
        const onAuth = result => {
            // Check if user exists
            if (result[0].length == 0) return res.status(404).send('User not found')

            const payload = { username: username, role: role }
            const duration = 7 * 24 * 60 * 60
            const token = jwt.sign(payload, process.env.LOGIN_SECRET_KEY, { expiresIn: duration })

            // set cookie and redirect to homepage
            res.cookie('login-token', token, { maxAge: duration * 1000, httpOnly: true })
            res.redirect('/')
        }
        
        // check if user exists
        await userModel.readByUsernamePassword(username, hashedPassword)
            .then(onAuth)
            .catch(err => res.status(500).send(err))
    },



    // api to update user
    patchUser: async (req, res) => {

        // fields to update
        const id = req.body.userId
        const fields = req.body

        // send result
        await userModel.updateById(id, fields)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
    },



    // api to delete user
    deleteUser: async (req, res) => {

        // user to delete
        const id = req.body.userId

        // send result
        await userModel.deleteById(id)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
    },

}


module.exports = userController