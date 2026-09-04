DW-JWT

Sistema de autenticação desenvolvido com React, Node.js, Express, PostgreSQL e JWT utilizando cookies HTTP-Only.

O projeto possui cadastro, login, autenticação de rotas protegidas e logout.

Tecnologias utilizadas
Frontend
React
Vite
Axios
React Router
JavaScript
Backend
Node.js
Express
PostgreSQL
JSON Web Token (JWT)
bcryptjs
cookie-parser
CORS
dotenv
Estrutura do projeto
DW-JWT/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── private.routes.js
│   │   └── utils/
│   │       └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md

Banco de dados

O projeto utiliza PostgreSQL.

Crie um banco de dados chamado:

login_jwt


Depois, crie a tabela users:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

Configuração do Backend

Entre na pasta:

cd backend


Instale as dependências:

npm install


Crie um arquivo .env dentro de backend:

PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=login_jwt

JWT_SECRET=sua_chave_secreta


Substitua sua_senha pela senha do seu PostgreSQL.

Também altere JWT_SECRET para uma chave secreta própria.

Iniciar o Backend
npm start


O servidor será iniciado em:

http://localhost:5000

Configuração do Frontend

Entre na pasta:

cd frontend


Instale as dependências:

npm install

Iniciar o Frontend
npm run dev


O frontend será disponibilizado pelo Vite, normalmente em:

http://localhost:5173

Autenticação

O sistema utiliza JWT para autenticação.

O fluxo funciona da seguinte maneira:

Usuário
   │
   ▼
Cadastro
   │
   ▼
PostgreSQL
   │
   ▼
Login
   │
   ▼
JWT
   │
   ▼
Cookie HTTP-Only
   │
   ▼
Rotas protegidas


O JWT é armazenado em um cookie HTTP-Only, evitando que o token fique diretamente acessível pelo JavaScript da aplicação.

Rotas da API
Cadastro
POST /api/auth/register


Exemplo:

{
  "email": "usuario@email.com",
  "password": "123456"
}

Login
POST /api/auth/login


Exemplo:

{
  "email": "usuario@email.com",
  "password": "123456"
}


Após o login, o backend cria um JWT e o envia através de um cookie HTTP-Only.

Rota protegida
GET /api/protected


Essa rota exige um JWT válido.

Resposta esperada:

{
  "success": true,
  "message": "Acesso autorizado à área privada."
}

Logout
POST /api/auth/logout


Remove o cookie de autenticação.

Segurança
Senhas armazenadas utilizando bcrypt.
JWT armazenado em cookie HTTP-Only.
Rotas privadas protegidas por middleware.
CORS configurado para comunicação entre frontend e backend.
Variáveis sensíveis armazenadas no .env.

Nunca envie o arquivo .env para o GitHub.

O .gitignore deve conter:

node_modules/
.env
.env.local
.env.*.local
dist/
build/

Como executar o projeto

Abra dois terminais.

Terminal 1 — Backend
cd backend
npm install
npm start

Terminal 2 — Frontend
cd frontend
npm install
npm run dev


Depois acesse o endereço informado pelo Vite no terminal.

Funcionalidades
Cadastro de usuários
Criptografia de senhas
Login
Autenticação com JWT
Cookie HTTP-Only
Middleware de proteção de rotas
Dashboard protegido
Logout
Integração com PostgreSQL
Comunicação entre React e API Express
Objetivo

Projeto desenvolvido para demonstrar a implementação de um sistema completo de autenticação utilizando JWT, cookies HTTP-Only, React, Express e PostgreSQL.

Autor

Desenvolvido como projeto acadêmico.
