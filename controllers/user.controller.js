const userModel = require('../models/user.model')


const userController = {

    // sign up page request
    getSignUpPage: (req, res) => {

        
    },

    // api for user sign up
    postSignUp: async (req, res) => {
        
        // destruct credentials for arrangement
        const { username, email, password, firstname, lastname, phone, role = 'customer' } = req.body
        
        // send result
        await userModel.insert([username, email, password, firstname, lastname, phone, role])
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
    }


}


module.exports = userController