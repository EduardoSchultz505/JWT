const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const { body, validationResult } = require('express-validator')

router.post(
    '/register',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('O e-mail fornecido não é válido'),

        body('password')
            .isLength({ min: 6 })
            .withMessage('A senha deve ter no mínimo 6 caracteres')
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                erros: errors.array(),
                message: 'Erro de validação'
            });
        }

        const { email, password } = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await db.query(
                'INSERT INTO users (email, password) VALUES ($1, $2)',
                [email, hashedPassword]
            );

            return res.status(201).json({
                message: 'Usuário registrado com sucesso.'
            });

        } catch (error) {
            console.error('Erro no registro:', error);

            if (error.code === '23505') {
                return res.status(400).json({
                    message: 'Email já cadastrado.'
                });
            }

            return res.status(500).json({
                message: 'Erro no servidor.'
            });
        }
    }
);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email e senha são obrigatórios.'
        });
    }

    try {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                message: 'Credenciais inválidas.'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Credenciais inválidas.'
            });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000
        });

        res.status(200).json({ message: 'Login bem-sucedido. Token enviado via cookie. ' })


    } catch (error) {
        res.status(500).json({
            message: 'Erro no servidor.'
        });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    res.json({
        message: 'Logout realizado com sucesso.'
    });
});

module.exports = router;