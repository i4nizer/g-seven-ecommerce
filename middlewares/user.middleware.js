/**
 * Validate all required fields based on min, max, and regex pattern.
 * 
 * @param {{ name: string, min?: number, max?: number, pattern?: RegExp, required?: boolean }[]} fields - An array of field objects that will be used to validate.
 * @param {object} body - The object where the fields will be compared to.
 * @param {object} res - The response object used to send back validation errors.
 * 
 * @returns {boolean} - Returns true if all validations pass else sends an error response through res.
 */
const validateRequest = (fields, body, res) => {
    // get missing reuired fields based on field name
    const missingFields = fields.filter(field => field?.required).map(field => field.name).filter(key => !body[key])
    if (missingFields.length !== 0) return res.status(400).send(`Missing: ${missingFields.join(', ')}`)
    
    // validate all fields
    for (const field of fields) {
        const value = body[field.name]

        // validate strings
        if (typeof value === 'string') {
            const length = value.trim().length
            
            if ('min' in field && length < field.min) return res.status(422).send(`${field.name} length is below ${field.min}.`)
            if ('max' in field && length > field.max) return res.status(422).send(`${field.name} length is above ${field.max}.`)
            if ('pattern' in field && !field.pattern.test(value)) return res.status(422).send(`${field.name} does not match the pattern ${field.pattern}.`)
        }
        // validate numbers
        else if (typeof value === 'number') {
            if ('min' in field && value < field.min) return res.status(422).send(`${field.name} is below ${field.min}.`)
            if ('max' in field && value > field.max) return res.status(422).send(`${field.name} is above ${field.max}.`)
        }
    }

    // passed
    return true
}


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
    }

}


module.exports = userMiddleware