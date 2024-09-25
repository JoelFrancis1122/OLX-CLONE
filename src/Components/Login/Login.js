import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const history = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        toast.success('Login successful!');
        setTimeout(() => {
          history('/');
        }, 1000);
      })
      .catch((error) => {
        const parsedError = JSON.parse(error.message);
        const errorMessage = parsedError.error.errors[0].reason; // Extract "invalid"
        toast.error(`Error: ${errorMessage}`); // Display toaster with the error
      });
    };
  
  const handleSignupClick = () => {
    history('/signup');
  };

  return (
    <div>
      <ToastContainer />
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'blue' }}>
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;
