import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');

        if (!email || !password) {
            setError('E-mail e senha são obrigatórios.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                {
                    email: email.trim(),
                    password
                }
            );

            setMessage(
                response.data.message || 'Usuário registrado com sucesso.'
            );

            setEmail('');
            setPassword('');

        } catch (error) {
            const data = error.response?.data;

            if (data?.erros?.length) {
                setError(data.erros[0].msg);
            } else {
                setError(
                    data?.message || 'Erro ao realizar cadastro.'
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Criar conta</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div>
                    <input
                        id="password"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>

                {error && (
                    <p style={{ color: 'red' }}>
                        {error}
                    </p>
                )}

                {message && (
                    <p style={{ color: 'green' }}>
                        {message}
                    </p>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default Register;