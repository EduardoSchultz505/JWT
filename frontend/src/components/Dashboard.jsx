import { useEffect, useState } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get('/protected');

        setMessage(response.data.message);
      } catch (error) {
        console.error('Erro ao acessar rota protegida:', error);

        navigate('/login');
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }

    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>

      <p>{message}</p>

      <button onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
