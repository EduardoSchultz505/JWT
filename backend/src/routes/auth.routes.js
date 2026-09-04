const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

// ======================================================
// REGISTRO
// POST /api/auth/register
// ======================================================

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email e senha são obrigatórios.'
        });
    }

    try {
        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insere no PostgreSQL
        await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2)',
            [email, hashedPassword]
        );

        res.status(201).json({
            message: 'Usuário registrado com sucesso.'
        });

    } catch (error) {
        console.error('Erro no registro:', error);

        // PostgreSQL: violação de UNIQUE
        if (error.code === '23505') {
            return res.status(400).json({
                message: 'Email já cadastrado.'
            });
        }

        res.status(500).json({
            message: 'Erro no servidor.'
        });
    }
});


// ======================================================
// LOGIN
// POST /api/auth/login
// ======================================================

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email e senha são obrigatórios.'
        });
    }

    try {
        // Busca o usuário no PostgreSQL
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

        // Compara senha digitada com a senha criptografada
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Credenciais inválidas.'
            });
        }

        // Gera o JWT
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Salva o JWT em cookie HTTP-Only
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        res.json({
            message: 'Login realizado com sucesso.'
        });


    } catch (error) {
        console.error('Erro no login:', error);

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