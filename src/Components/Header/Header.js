import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {
  const history = useNavigate();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  const handleLoginClick = () => {
    history('/login');
  };
  const sell = ()=>{
    history('/create');
  }

  const handleLogoutClick = () => {
    firebase.auth().signOut()
      .then(() => {
        history('/login');
      })
      .catch(error => {
        console.error('Error signing out: ', error);
      });
  };


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone, and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>  
          <Arrow />
        </div>
        <div className="loginPage">
          <span
            onClick={user ? null   : handleLoginClick}
            style={{ cursor: 'pointer' }}
          >
            {user ? `Hi, ${user.displayName} !` : "Login"}  
          </span>
          <hr />
        </div>

        {user && (
          <div className="logout">
            <span
              onClick={handleLogoutClick}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </span>
          </div>
        )}

        {user ? <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
          
            <span onClick={sell}>SELL</span>
          </div>
        </div>:<div className="sellMenu"  style={{
            opacity: user ? 1 : 0.5,
            cursor: user ? 'pointer' : 'not-allowed',
            pointerEvents: user ? 'auto' : 'none',
          }}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
          
            <span>PAUSE</span>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Header;
