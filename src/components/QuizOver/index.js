import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi';
import Loader from '../Loader'
import Modal from '../Modal'
import axios from "axios"

const QuizOver = React.forwardRef((props, ref) => {
  const { levelNames, score, maxQuestion, quizLevel, percent, loadLevelQuestions } = props
  const [asked, setAsked] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [characterData, setCharacterData] = useState([])
  const [loading, setLoading] = useState(true)
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = 'd202f8cab63753d5c17298f49203c4e8'

  useEffect(() => {
    setAsked(ref.current)
    if(localStorage.getItem('marvelStorageDate')){
      checkDataAge(localStorage.getItem('marvelStorageDate'))
    }
  }, [ref])

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDiff = today - date 
    const dayDiff = timeDiff / (1000 * 3600 * 24)
    if(dayDiff >= 15 ){
      localStorage.clear()
      localStorage.setItem('marvelStorageDate', Date.now())
    }
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const showModal = (id) => {
    if (localStorage.getItem(id)) {
      setCharacterData(JSON.parse(localStorage.getItem(id)));
      setLoading(false)
    }
    else {
      console.log("requete api")
      axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then((response) => {
          setCharacterData(response.data);
          setLoading(false)
          localStorage.setItem(id, JSON.stringify(response.data))
          if (!localStorage.getItem('marvelStorageDate')) {
            localStorage.setItem('marvelStorageDate', Date.now())
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
    setLoading(true)
  }

  const averageGrade = maxQuestion / 2

  if (score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(0)
    }, 3000)
  }
  const decision = score >= averageGrade ? (
    <Fragment>
      <div className="stepsBtnContainer">
        {quizLevel < levelNames.length ?
          (<Fragment>
            <p className="successMsg">Bravo, passez au niveau suivant !</p>
            <button className="btnResult success" onClick={() => loadLevelQuestions(quizLevel)}>Niveau Suivant</button>
          </Fragment>)
          :
          (<Fragment>
            <p className="successMsg"><GiTrophyCup size='50px' />Bravo, vous êtes un expert !</p>
            <button className="btnResult gameOver" onClick={() => loadLevelQuestions(0)}>Accueil</button>
          </Fragment>)
        }
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussite {percent}%</div>
        <div className="progressPercent">Note {score}/{maxQuestion}</div>
      </div>
    </Fragment>)
    :
    (<Fragment>
      <div className="stepsBtnContainer">
        <p className="failureMsg">Vous avez échoué !</p>
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussite {percent}%</div>
        <div className="progressPercent">Note {score}/{maxQuestion}</div>
      </div>

    </Fragment>)


  const questionAnswer = score >= averageGrade ? (asked.map(question => {
    return (
      <tr key={question.id} >
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td><button className="btnInfo" onClick={() => showModal(question.heroId)}>Infos</button></td>
      </tr>)
  }))
    :
    (
      <tr>
        <td colSpan="3">
          <Loader />
        </td>
      </tr>
    )
  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{characterData.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img 
          src={characterData.data.results[0].thumbnail.path + '.' + characterData.data.results[0].thumbnail.extension}
          alt={characterData.data.results[0].name}
          />
          {characterData.attributionText}
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {
            characterData.data.results[0].description  
            ? <p>{characterData.data.results[0].description}</p>
            : <p>Description indisponible</p>
          }
          <h3>Plus d'info</h3>
          {
            characterData.data.results[0].urls
            && characterData.data.results[0].urls.map((url, index) => {
              return <a key={index} href={url.url} target="_blank" rel="noopener noreferrer">{capitalizeFirstLetter(url.type)}</a>
            })
            
          }
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>Fermer</button>
      </div>
    </Fragment>
  )
    :
    (
      <Fragment>
        <div className="modalHeader">
          <h2>Réponse de marvel...</h2>

        </div>
        <div className="modalBody">
          <div className="loader"></div>
        </div>
      </Fragment>
    )

  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux questions posées: </p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {questionAnswer}
          </tbody>

        </table>
      </div>
      <Modal showModal={openModal} closeModal={closeModal}>
        {resultInModal}
      </Modal>

    </Fragment>

  )
})

export default React.memo(QuizOver)
