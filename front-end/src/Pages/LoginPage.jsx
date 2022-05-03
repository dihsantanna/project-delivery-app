import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();
  const minPasswordLength = 6;
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const login = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/login`,
      data,
    }).catch((error) => setErrorMsg(error.message));
    if (login) {
      const path = '/products';
      history.push(path);
    }
  };

  const onRegisterClick = () => {
    const path = '/register';
    history.push(path);
  };

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleClick = (e) => {
    const { target } = e;
    setEmail(target.value);
    const validate = validateEmail(target.value);
    setIsValidEmail(validate);
  };

  return (
    <div className="main">
      <h1>Login</h1>
      <form onSubmit={ onSubmit }>
        <div>
          <label htmlFor="email-input" className="form-label">
            <p>Login</p>
            <input
              id="email-input"
              data-testid="common_login__input-email"
              onChange={ handleClick }
              value={ email }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password-input" className="form-label">
            <p>Senha</p>
            <input
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
            email.length <= 0 || !isValidEmail
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
          onClick={ onRegisterClick }
        >
          Ainda não tenho conta
        </button>

      </form>
      {!isValidEmail && email.length > 0
       && (
         <span data-testid="common_login__element-invalid-email">
           Email must be valid
         </span>
       )}
      {errorMsg
      && (
        <span data-testid="common_login__element-invalid-email">
          {errorMsg}
        </span>)}
    </div>
  );
}

export default LoginPage;
