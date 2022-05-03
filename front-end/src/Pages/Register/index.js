import React from 'react';
import './styles.css';

export default function Register() {
  function showErrorMessage() {
    return 'enabled';
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
          />
        </label>
        <button
          className="register_button"
          data-testid="common_register__button-register"
          type="button"
        >
          CADASTRAR
        </button>
      </section>
      <span
        data-testid="common_register__element-invalid_register"
        className={ `register-alert__${showErrorMessage()}` }
      >
        Mensagem de Erro!
      </span>
    </section>
  );
}
