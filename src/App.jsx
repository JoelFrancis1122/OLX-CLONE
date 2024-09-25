import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import './App.css';
import { FirebaseContext } from './store/Context';
import Login from './Pages/Login';
import { AuthContext } from './store/Context';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Post from './store/PostContext';
import JoelProvider from './store/joel';
import Josea from './store/Josea';
function App() {
  const { setUser, user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
  }, [firebase, setUser]);

  return (
    <div>
      <Post>
        <JoelProvider>
        <Josea>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
        </Josea>

        </JoelProvider>

      </Post>
    </div>
  );
}

export default App;
