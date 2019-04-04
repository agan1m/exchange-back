const { validationResult } = require('express-validator/check');


exports.signup = (req, res, next) => {
    const {email, password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({
            errors: errors.array(),
            message: 'failer'
        })
    }
    res.json({
        message: 'success',
    })
}