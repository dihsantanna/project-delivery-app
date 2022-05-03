import Axios from 'axios';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import './styles.css';

export default function Register() {
  
  const [errorMessage, setErrorMessage] = useState({
    show: 'disabled',
    message: '',
  });

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const {username, email, password} = newUser;

  const history = useHistory()

  function setUserPayloadByInput({target}) {
    const {name, value} = target
    
    setNewUser((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  function createUser() {
    Axios.post('http://localhost:3001/register', {
      name: username,
      email: email,
      password: password,
    }).then((_res) => {
      setErrorMessage({
        show: 'disabled',
        message: ''
      })
      history.push('/customer/products')
    })
      .catch((err) => {
      if(err.response.data.message) {
        setErrorMessage({
          show: 'enabled',
          message: err.response.data.message
        })
      } else {
        setErrorMessage({
          show: 'enabled',
          message: err.response.data
        })
      }
      });
  }

  return (
    <section className="register-container">
      <h1 className="headling-register">Cadastro</h1>
      <section className="register-container-inputs">
        <label htmlFor="name-input">
          <p>Nome</p>
          <input
            className="register_inputs"
            data-testid="common_register__input-name"
            type="text"
            id="name-input"
            placeholder="Seu Nome"
            name='username'
            onChange={(event) => setUserPayloadByInput(event)}
            value={username}
          />
        </label>
        <label htmlFor="mail-input">
          <p>Email</p>
          <input
            className="register_inputs"
            data-testid="common_register__input-email"
            type="text"
            id="mail-input"
            placeholder="seu-email@site.com.br"
            name='email'
            onChange={(event) => setUserPayloadByInput(event)}
            value={email}
          />
        </label>
        <label htmlFor="password-input">
          <p>Senha</p>
          <input
            className="register_inputs"
            data-testid="common_register__input-password"
            type="password"
            id="password-input"
            placeholder="******"
            name='password'
            onChange={(event) => setUserPayloadByInput(event)}
            value={password}
          />
        </label>
        <button
          className="register_button"
          data-testid="common_register__button-register"
          type="button"
          onClick={ () => createUser() }
        >
          CADASTRAR
        </button>
      </section>
      <span
        data-testid="common_register__element-invalid_register"
        className={ `register-alert__${errorMessage.show}` }
      >
        {errorMessage.message.toUpperCase()}
      </span>
    </section>
  );
}
