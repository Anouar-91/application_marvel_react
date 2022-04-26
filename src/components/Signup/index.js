import React, { useState } from 'react'
import { auth, user } from '../Firebase/firebaseConfig'
import {setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'


const Signup = (props) => {

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const [loginData, setLoginData] = useState(data)
  const [error, setError] = useState("")
  const navigate = useNavigate();


  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = loginData;
    createUserWithEmailAndPassword(auth, email, password)
      .then(authUser => {
        return setDoc(user(authUser.user.uid), {
          pseudo: pseudo,
          email: email,

        })
      })
      .then(user => {
        setLoginData({ ...data })
        navigate("/welcome")
      })
      .catch(error => {
        console.log(error)
        setError(error.message);
        setLoginData({ ...data });
      })
  }
  const { pseudo, email, password, confirmPassword } = loginData;

  const btn = pseudo === "" || email === "" || password === "" || password !== confirmPassword ? <button disabled >Inscription</button> : <button >Inscription</button>

  //gestion error
  const msgError = error !== "" && <span>{error}</span>

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup">
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            {msgError}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" required />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} type="text" id="email" required value={email} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} type="password" id="password" required value={password} />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} type="password" id="confirmPassword" required value={confirmPassword} />
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup