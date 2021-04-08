import React from 'react';
import * as Realm from 'realm-web';
import { useRealmApp } from '../RealmApp';
import Loading from './Loading';

export default function LoginScreen() {
  // const app = useRealmApp();
  // // Toggle between logging users in and registering new users
  // const [mode, setMode] = React.useState('login');
  // const toggleMode = () => {
  //   setMode((oldMode) => (oldMode === 'login' ? 'register' : 'login'));
  // };
  // // Keep track of form input state
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // // Keep track of input validation/errors
  // const [error, setError] = React.useState({});
  // // Whenever the mode changes, clear the form inputs
  // React.useEffect(() => {
  //   setEmail('nick.larew@mongodb.com');
  //   setPassword('password');
  //   setError({});
  // }, [mode]);

  // const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  // const handleLogin = async () => {
  //   setIsLoggingIn(true);
  //   setError((e) => ({ ...e, password: null }));
  //   try {
  //     await app.logIn(Realm.Credentials.emailPassword(email, password));
  //   } catch (err) {
  //     handleAuthenticationError(err, setError);
  //   }
  // };

  // const handleRegistrationAndLogin = async () => {
  //   const isValidEmailAddress = validator.isEmail(email);
  //   setError((e) => ({ ...e, password: null }));
  //   if (isValidEmailAddress) {
  //     try {
  //       // Register the user and, if successful, log them in
  //       await app.emailPasswordAuth.registerUser(email, password);
  //       return await handleLogin();
  //     } catch (err) {
  //       handleAuthenticationError(err, setError);
  //     }
  //   } else {
  //     setError((err) => ({ ...err, email: 'Email is invalid.' }));
  //   }
  // };

  return <div>stuffs</div>;
}

// function handleAuthenticationError(err, setError) {
//   const { status, message } = parseAuthenticationError(err);
//   const errorType = message || status;
//   switch (errorType) {
//     case 'invalid username':
//       setError((prevErr) => ({ ...prevErr, email: 'Invalid email address.' }));
//       break;
//     case 'invalid username/password':
//     case 'invalid password':
//     case '401':
//       setError((err) => ({ ...err, password: 'Incorrect password.' }));
//       break;
//     case 'name already in use':
//     case '409':
//       setError((err) => ({ ...err, email: 'Email is already registered.' }));
//       break;
//     case 'password must be between 6 and 128 characters':
//     case '400':
//       setError((err) => ({
//         ...err,
//         password: 'Password must be between 6 and 128 characters.',
//       }));
//       break;
//     default:
//       break;
//   }
// }

// function parseAuthenticationError(err) {
//   const parts = err.message.split(':');
//   const reason = parts[parts.length - 1].trimStart();
//   if (!reason) return { status: '', message: '' };
//   const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
//   const match = reason.match(reasonRegex);
//   const { status, message } = match?.groups ?? {};
//   return { status, message };
// }
