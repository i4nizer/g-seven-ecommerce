

const requestModule = {

    /**
     * Validate all required fields based on min, max, and regex pattern.
     * 
     * @param {{ name: string, min?: number, max?: number, pattern?: RegExp, required?: boolean }[]} fields - An array of field objects that will be used to validate.
     * @param {object} body - The object where the fields will be compared to.
     * @param {object} res - The response object used to send back validation errors.
     * 
     * @returns {boolean} - Returns true if all validations pass else sends an error response through res.
     */
    validateRequest: (fields, body, res) => {
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
    },

}


module.exports = requestModule