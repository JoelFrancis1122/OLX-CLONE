import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase.firestore().collection('users').add({
            id: result.user.uid,
            username: username,
            phone: phone
          }).then(() => {
            toast.success("Sign up successful!");
            history('/login');
          });
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div className="signupParentDiv">
      <ToastContainer />
      <img width="120px" height="120px" src={Logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Username</label>
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="fname"
          name="name"
          placeholder="Enter your username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <label htmlFor="phone">Phone</label>
        <input
          className="input"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
        />
        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit">Signup</button>
      </form>
      <a href="/login">Login</a>
    </div>
  );
}
