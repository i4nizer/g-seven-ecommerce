const { validateRequest } = require('../modules/request.mod')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const userMiddleware = {

    /**
     * Required
     *  username - 255 length
     *  firstname - 255 length
     *  lastname - 255 length
     *  password - min 8 length
     *  phone - 20 length
     *  email - use regex to validate [   ^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$   ]
     */
    validateSignUp: (req, res, next) => {
        
        // fields to validate
        const fields = [
            { name: 'username', min: 3, max: 255, required: true },
            { name: 'firstname', min: 3, max: 255, required: true },
            { name: 'lastname', min: 3, max: 255, required: true },
            { name: 'password', min: 8,  required: true },
            { name: 'phone', min: 4, max: 20, required: true },
            { name: 'role', min: 3, max: 50, required: false },
            { name: 'email', min: 3, max: 255, pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, required: true },
        ]

        // validate fields
        const valid = validateRequest(fields, req.body, res)

        // procceed to next handler
        if (valid === true) next()
    },
    
    /**
     * Required
     *  username - 255 length
     *  password - min 8 length
     */
    validateSignIn: (req, res, next) => {

        // fields to validate
        const fields = [
            { name: 'username', min: 3, max: 255, required: true },
            { name: 'password', min: 8, required: true },
            { name: 'role', max: 50, required: false },
        ]

        // validate fields
        const valid = validateRequest(fields, req.body, res)

        // procceed to next handler
        if (valid === true) next()
    },
    
    /**
     * Validate fields to that is to be updated.
     */
    validatePatch: (req, res, next) => {

        // fields to validate
        const fields = [
            { name: 'userId', min: 1, required: true },
            { name: 'username', min: 3, max: 255, required: false },
            { name: 'firstname', min: 3, max: 255, required: false },
            { name: 'lastname', min: 3, max: 255, required: false },
            { name: 'password', min: 8, required: false },
            { name: 'phone', min: 4, max: 20, required: false },
            { name: 'role', min: 3, max: 50, required: false },
            { name: 'email', min: 3, max: 255, pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, required: false },
        ]

        // validate fields
        const valid = validateRequest(fields, req.body, res)

        // procceed to next handler
        if (valid === true) next()
    },
    
    /**
     * Validate login token provided in the request cookies.
     */
    validateLoginToken: (req, res, next) => {

        // get token on cookies
        const loginToken = req.cookies['login-token']

        // jwt inevitably throws error for invalid token
        try {

            // get payload
            const payload = jwt.verify(loginToken, process.env.LOGIN_SECRET_KEY)

            // set userId for future process
            req.userId = payload.userId

            next()
        } catch (err) { 
            
            // the token may be invalid or expired
            res.redirect('/authentication/users/sign-in')
        }
    },

}


module.exports = userMiddleware