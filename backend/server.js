require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Rotas
const authRoutes = require('./src/routes/auth.routes');
const privateRoutes = require('./src/routes/private.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Permite receber JSON
app.use(express.json());

// Permite ler cookies
app.use(cookieParser());

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rotas privadas
app.use('/api', privateRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});