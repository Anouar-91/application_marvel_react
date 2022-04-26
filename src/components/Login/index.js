import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../Firebase/firebaseConfig'



const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [btn, setBtn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setBtn(true)
    }
    else if (btn) {
      setBtn(false)
    }
  }, [password, email, btn, setPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      setEmail('');
      setPassword("");
      navigate('/welcome')
    })
    .catch(error => {
      console.log(error)
      setError(error.message)
      setEmail('');
      setPassword("");
    })
  }
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin">
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            {error != "" && <span>{error.message}</span>}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input type="password" id="password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz? Inscrivez-vous maintenant.</Link> <br/>
              <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié ?</Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login