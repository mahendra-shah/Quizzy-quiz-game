const joi = require("joi")

// for gamer/user validation
const validUser = ((req, res, next) => {
    try {
        const schemaValidate = joi.object({
            name: joi.string().required(),
            age: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
            role: joi.string()
        })
        let data = schemaValidate.validate(req.body)
        if (data.error) {
            res.send("Please fill all the fields properly")
            return
        }
        next()

    } catch (error) {
        res.send(error.message)
    }
})

// for quiz validation
const validQuiz = ((req, res, next) => {
    try {
        const schemaValidate = joi.object({
            category: joi.string().required(),
            question: joi.string().required(),
            A: joi.string().required(),
            B: joi.string().required(),
            C: joi.string().required(),
            D: joi.string().required(),
            correct: joi.string().required()
        })
        let data = schemaValidate.validate(req.body)
        if (data.error) {
            res.send("please fill all the fields properly")
            return
        }
        next()

    } catch (error) {
        res.send(error.message)
    }
})

module.exports = { validUser, validQuiz }