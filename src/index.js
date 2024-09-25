import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext  } from './store/Context'
import Context from './store/Context'
import firebase from './firebase/config'
// import { AuthContext } from './store/Context';
ReactDOM.render(
<FirebaseContext.Provider value={{firebase}}>
{/* <Context/> */}
{/* <AuthContext> */}
<Context>

<App />
</Context>
{/* </AuthContext> */}

</FirebaseContext.Provider>
, document.getElementById('root'));
