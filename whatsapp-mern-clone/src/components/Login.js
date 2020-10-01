import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
import React from 'react'
import '../Styles/Login.css'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

function Login() {

  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    })
    .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1196px-WhatsApp.svg.png" alt="Whatsapp-logo"/>
        <div className="login-text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default Login
