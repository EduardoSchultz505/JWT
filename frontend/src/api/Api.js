import axios from 'axios';

// Cria uma instância do Axios com a URL base do seu backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
    // MUDANÇA CRÍTICA AQUI:
    withCredentials: true // <--- Permite que o navegador envie e receba cookies
});

export default api;