import { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import Modal from './Modal';
import Form from './Form';

import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../utils/graphql/mutations';
import { setAuth, setUserIDInLocalStorage } from '../utils/helpers';

const errors = {
  'Error: Invalid password':
    "That password doesn't match up with our records. Try again!",
  'Error: No such user found': 'No user by that email found. Sign up instead!',
};

export default function Login({ showLogin, handleClose }) {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    role: 'USER',
    name: '',
  });

  const handleCompleted = (userObj) => {
    setAuth(userObj.token);
    setUserIDInLocalStorage(userObj.user._id);
    // useAuthentication(userObj.id, true);
    setSuccess(true);
    history.push('/');
  };

  const handleError = (err) => {
    const errorMsg = errors[err] || 'Something went wrong. Try again!';
    setError(errorMsg);
  };

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => handleCompleted(login),
    onError: (err) => handleError(err),
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => handleCompleted(signup),
    onError: (err) => handleError(err),
  });

  const onClick = formState.login ? login : signup;
  return (
    <Modal display={showLogin} handleClose={handleClose}>
      {success ? (
        <div className='success'>woot woot! welcome aboard.</div>
      ) : (
        <>
          <center className='login-header'>
            <div className='login-header--main'>
              {formState.login ? 'Login' : 'Signup'}
            </div>
            <sub
              className='login-header--sub'
              onClick={() =>
                setFormState({
                  ...formState,
                  login: !formState.login,
                })
              }
            >
              {formState.login ? 'or signup' : 'or login'}
            </sub>
            {error && <div className='error'>{error}</div>}
          </center>
          <Form buttonLabel='Submit' onClick={onClick}>
            {!formState.login && (
              <>
                <label htmlFor='name'>name</label>
                <input
                  name='name'
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      name: e.target.value,
                    })
                  }
                  type='text'
                  placeholder='Your name'
                />
              </>
            )}
            <label htmlFor='email'>email</label>
            <input
              onChange={(e) => {
                setFormState({
                  ...formState,
                  email: e.target.value,
                });
              }}
              name='email'
              type='text'
            />
            <label htmlFor='password'>password</label>
            <span className='input-span'>
              <input
                name='password'
                type={showPassword ? 'text' : 'password'}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='icon'
              >
                {showPassword ? 'hide' : 'show'}
              </span>
            </span>
          </Form>
        </>
      )}
    </Modal>
  );
}

Login.propTypes = {
  showLogin: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
