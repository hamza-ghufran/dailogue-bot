const {
    EMAIL_REGEX,
    DOB_REGEX
} = require('./constant')
const sendTextMessage = require('./send-message')

module.exports = {
    validateEmail: (email) => {
        return EMAIL_REGEX.test(String(email).toLowerCase());
    },
    validateDateOfBirth: (dob) => {
        return DOB_REGEX.test(dob);
    },
    listRequirements: (userId) => {
        return setTimeout(() => {
            sendTextMessage(userId,
                `
            Please provide with the following details in order
            1.Email:
            2.Your name:
            3.Password:
            4.Date of Birth: dd/mm/yyyy
            `)
        }, 1500)
    },
    registerHandler: (err, res) => {
        if (err) {
            console.log(err)
        }

        if (res.code === 'USER_CREATED') {
            sendTextMessage(res.user_id, 'Lets Start with our dailogues')
        }

        if (res.code === 'INVALID ARGUMENTS') {
            sendTextMessage(res.user_id, res.message)
        }

        if (res.code === 'NEW_USER') {
            sendTextMessage(res.user_id, "You seem like a new User, Consider registering first")
        }
    }

}