import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import './LoginPage.css';

function LoginPage() {
  const minPasswordLength = 6;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(minPasswordLength).required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(loginSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="main">
      <h1>Login</h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div>
          <label htmlFor="email-input" className="form-label">
            <p>Login</p>
            <input
              { ...register('email') }
              id="email-input"
              data-testid="common_login__input-email"
              aria-invalid={ errors.email ? 'true' : 'false' }
              onChange={ (e) => setEmail(e.target.value) }
              value={ email }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password-input" className="form-label">
            <p>Senha</p>
            <input
              { ...register('password') }
              id="password-input"
              data-testid="common_login__input-password"
              type="password"
              onChange={ (e) => setPassword(e.target.value) }
              value={ password }
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={
            errors.email
            || errors.password
            || email.length <= 0
            || password.length <= minPasswordLength - 1
          }
          className="button-forms-login"
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          className="button-forms-register"
        >
          Ainda não tenho conta
        </button>

      </form>
      {errors.email
       && (
         <span data-testid="common_login__element-invalid-email">
           Email must be valid
         </span>
       )}
    </div>
  );
}

export default LoginPage;
