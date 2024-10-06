const { validateRequest } = require('../modules/request.mod');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userMiddleware = {

    /**
     * Validate Sign-Up Request
     * Fields:
     *  - username: required, 3-255 chars
     *  - firstname: required, 3-255 chars
     *  - lastname: required, 3-255 chars
     *  - password: required, min 8 chars
     *  - phone: required, 4-20 chars
     *  - email: required, must match regex
     *  - role: optional
     */
    validateSignUp: (req, res, next) => {
        const fields = [
            { name: 'username', min: 3, max: 255, required: true },
            { name: 'firstname', min: 3, max: 255, required: true },
            { name: 'lastname', min: 3, max: 255, required: true },
            { name: 'password', min: 8, required: true },
            { name: 'phone', min: 4, max: 20, required: true },
            { name: 'role', min: 3, max: 50, required: false },
            { name: 'email', min: 3, max: 255, pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, required: true },
        ];

        const valid = validateRequest(fields, req.body, res);
        if (valid === true) next();
    },

    /**
     * Validate Sign-In Request
     * Fields:
     *  - username: required, 3-255 chars
     *  - password: required, min 8 chars
     *  - role: optional
     */
    validateSignIn: (req, res, next) => {
        const fields = [
            { name: 'username', min: 3, max: 255, required: true },
            { name: 'password', min: 8, required: true },
            { name: 'role', max: 50, required: false },
        ];

        const valid = validateRequest(fields, req.body, res);
        if (valid === true) next();
    },

    /**
     * Validate Patch Request
     * Fields can be optional, depending on what is being updated.
     * Fields:
     *  - userId: required
     *  - username, firstname, lastname, password, phone, email: optional but validated
     */
    validatePatch: (req, res, next) => {
        const fields = [
            { name: 'userId', min: 1, required: true },
            { name: 'username', min: 3, max: 255, required: false },
            { name: 'firstname', min: 3, max: 255, required: false },
            { name: 'lastname', min: 3, max: 255, required: false },
            { name: 'password', min: 8, required: false },
            { name: 'phone', min: 4, max: 20, required: false },
            { name: 'role', min: 3, max: 50, required: false },
            { name: 'email', min: 3, max: 255, pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, required: false },
        ];

        const valid = validateRequest(fields, req.body, res);
        if (valid === true) next();
    },

    /**
     * Validate the login token from the cookies.
     * Attach the decoded user information to `req.user` if the token is valid.
     */
    validateLoginToken: (req, res, next) => {
        const loginToken = req.cookies['login-token'];

        if (!loginToken) {
            console.log('No login token found, redirecting to sign-in');
            return res.redirect('/authentication/users/sign-in');
        }

        try {
            const payload = jwt.verify(loginToken, process.env.LOGIN_SECRET_KEY);
            req.user = payload; // Attach the user info to the request
            next();
        } catch (err) {
            console.error('Invalid or expired token:', err);
            res.redirect('/authentication/users/sign-in');
        }
    },
};

module.exports = userMiddleware;
