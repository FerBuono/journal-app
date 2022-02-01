import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {

  const dispatch = useDispatch();
  const {loading, msgError} = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: 'nando@gmail.com',
    password: '123456'
  });

  const {email, password} = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    isFormValid() && dispatch(startLoginEmailPassword(email, password));
  };

  const isFormValid = () => {
    if(!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if(password.length == 0) {
      dispatch(setError('Password is not valid'));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  useEffect(() => {
    dispatch(removeError());
  }, []);

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form 
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"
      >

        {
          msgError && (<div className="auth__alert-error">{msgError}</div>)
        }

        <input 
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input 
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          {/* <div 
            className="github-btn"
          >
            <div className="github-icon-wrapper">
              <svg  className="github-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            <p className="btn-text">
              <b>Sign in with GitHub</b>
            </p>
          </div> */}
          <div 
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with Google</b>
            </p>
          </div>
        </div>

        <Link 
          to="/auth/register"
          className="link"  
        >
          Create a new account
        </Link>

      </form>
    </>
  );
};

export default LoginScreen;
