var jwt = require('jsonwebtoken');
JWT_secreate = "hii@howareyou$$$$"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "plzz autheniticate the correct token" })
    }

    try {
        const data = jwt.verify(token, JWT_secreate);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "plzz autheniticate the correct token" })
    }
}

module.exports = fetchuser