import React, { useRef, useEffect, useState, useContext } from 'react'
import {Link  } from 'react-router-dom'

function Landing() {


  const [btn, setBtn] = useState(false)
  const refWolerine = useRef()

  useEffect(() => {
    refWolerine.current.classList.add("startingImg")
    setTimeout(() => {
      refWolerine.current.classList.remove("startingImg")
      setBtn(true)

    }, 1000)
  }, [])

  const setLeftImg = () => {
    refWolerine.current.classList.add("leftImg")
  }
  const setRightImg = () => {
    refWolerine.current.classList.add("rightImg")
  }
  const clearImg  = (e) => {
      if(refWolerine.current.classList.contains("leftImg")){
        refWolerine.current.classList.remove("leftImg")
      }
      if(refWolerine.current.classList.contains("rightImg")){
        refWolerine.current.classList.remove("rightImg")
      }
  }

  const display = btn && (
    <>
      <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg} >
        <Link className="btn-welcome" to="/signup">Inscription</Link>
      </div>
      <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg}>
        <Link className="btn-welcome" to="/login">Connexion</Link>
      </div>
    </>)

  return (
    <main ref={refWolerine} className="welcomePage">
      {display}
    </main>
  )
}

export default Landing