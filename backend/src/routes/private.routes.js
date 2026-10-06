const router = require('express').Router();
const verifyToken = require('../middleware/auth');

router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Acesso autorizado à área privada.",
        userData: req.user,
        data: {
            secret: "Estes são dados confidenciais simulados.",
            accessLevel: "admin"
        }        
    })
});
module.exports = router;