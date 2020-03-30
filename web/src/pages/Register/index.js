import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Titulo obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail valido')
    .required('Insira uma descrição'),
  whatsapp: Yup.string().required('Insira um número de whatsapp'),
  city: Yup.string().required('Insira uma cidade'),
  uf: Yup.string()
    .min(2, 'Você deve inserir um estado válido')
    .max(2, 'Você deve inserir um estado válido')
    .required('Insira seu estado'),
  street: Yup.string(),
});

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [street, setStreet] = useState('');

  const history = useHistory();

  async function handleRegister() {
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
      street,
    };

    try {
      const response = await api.post('ongs', data);

      toast.success(`Seu ID de acesso: ${response.data.id}`, {
        autoClose: 7000,
      });

      history.push('/');
    } catch (err) {
      toast.error('Erro no cadastro, tente novamente');
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt=" Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02141" />
            Já tenho cadastro
          </Link>
        </section>
        <Form onSubmit={handleRegister} schema={schema}>
          <Input
            name="name"
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            name="whatsapp"
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <Input
            name="street"
            placeholder="Rua"
            value={street}
            onChange={e => setStreet(e.target.value)}
          />
          <div className="input-group">
            <Input
              className="input"
              name="city"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <div />
            <Input
              className="input"
              name="uf"
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{ width: 80, display: 'row' }}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
