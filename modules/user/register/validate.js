const {
    validateEmail,
    validateDateOfBirth
} = require('../../../utils/helpers')

module.exports = (data) => {
    let { email, dob } = data
    let errors = []

    if (!validateEmail(email)) {
        errors.push("Invalid Email")
    }

    if (!validateDateOfBirth(dob)) {
        errors.push("Invalid Date of Birth")
    }

    return errors
}

