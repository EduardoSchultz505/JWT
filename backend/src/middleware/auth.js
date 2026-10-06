const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('Cookies recebidos:', req.cookies);

    if (!token) {
        return res.status(401).json({
            success: false,
            error: "UNAUTHORIZED",
            message: "Token ausente ou inválido"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            error: "UNAUTHORIZED",
            message: "Token ausente ou inválido"
        });
    }
};

module.exports = verifyToken;