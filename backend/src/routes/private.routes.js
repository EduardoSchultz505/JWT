const router = require('express').Router();
const verifyToken = require('../middleware/auth');

router.get('/protected', verifyToken, (req, res) => {
    /**
 * @swagger
 * tags:
 *  name: Área Privada
 *  description: Endpoints protegidos por Cookie JWT (HTTP-Only)
 */

    /**
     * @swagger
     * /private/protected:
     *  get:
     *      summary: Retorna dados confidenciais (Requer autenticação via Cookie)
     *      tags: [Área Privada]
     *      security:
     *          - cookieAuth: []
     *      responses:
     *          200:
     *              description: Acesso autorizado.
     *          401:
     *              description: Token ausente/inválido/expirado (Authentication Failure)
     *          403:
     *              description: Token válido, mas sem permissão (Authorization Failure)
     */

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