module.exports = function(req, res, next) {
    if (!req.body.dob) return next();
    const today = new Date();
    const birthDate = new Date(req.body.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    try {
        if (age >= 18) {
            req.age = age
            next()
        } else {
            return res.status(400).json({
                message: "Please enter correct age"
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}