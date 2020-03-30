import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const schema = Yup.object().shape({
  id: Yup.string().required('O ID é obrigatório'),
});

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin() {
    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      toast.error('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <Form name="id" onSubmit={handleLogin} schema={schema}>
          <h1>Faça seu logon</h1>
          <Input
            name="id"
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02141" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
