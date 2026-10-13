require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const authRoutes = require('./src/routes/auth.routes');
const privateRoutes = require('./src/routes/private.routes');
const { swaggerDocs } = require('./src/utils/swagger');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições deste IP. Tente novamente mais tarde'
});

app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api', privateRoutes);

// Configura a documentação Swagger
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
