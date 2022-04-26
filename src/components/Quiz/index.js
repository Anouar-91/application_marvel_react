import React, { useEffect, useState, useRef, Fragment } from 'react'
import Levels from "../Levels"
import ProgressBar from '../ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizMarvel } from '../quizMarvel'
import QuizOver from '../QuizOver'

const storedDataRef = React.createRef()

const Quiz = (props) => {
  const [levelNames, setLevelNames] = useState(["debutant", "confirme", "expert"])
  const [quizLevel, setQuizLevel] = useState(0)
  const [maxQuestion, setMaxQuestion] = useState(10)
  const [storedQuestions, setStoredQuestions] = useState(null)
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState([])
  const [idQuestion, setIdQuestion] = useState(0)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [userAnswer, setUserAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [isShowWelcomeMsg, setIsShowWelcomeMsg] = useState(true)
  const [quizEnd, setQuizEnd] = useState(false)
  const [percent, setPercent] = useState(0)


  const showWelcomeMsg = pseudo => {
    if (isShowWelcomeMsg) {
      toast(`Bienvenue ${pseudo}, et bonne chance`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false
      })
      setIsShowWelcomeMsg(false)
    }

  }

  const loadQuestions = level => {
    const fetchArrayQuestion = QuizMarvel[0].quizz[levelNames[level]]
    if (fetchArrayQuestion.length >= maxQuestion) {
      storedDataRef.current = fetchArrayQuestion
      const newArray = fetchArrayQuestion.map(({ answer, ...keepRest }) =>
        keepRest
      )
      setStoredQuestions(newArray)
    }
    else {
      console.log("Pas assez de question")
    }
  }
  useEffect(() => {
    loadQuestions(quizLevel)
  }, [])

  useEffect(() => {
    console.log("test")
    const gradePercent = getPercent(maxQuestion, score)
    gameOver(gradePercent)
  }, [quizEnd])

  useEffect(() => {
    if (storedQuestions != null) {
      setQuestion(storedQuestions[idQuestion].question)
      setOptions(storedQuestions[idQuestion].options)
      setUserAnswer(null)
      setBtnDisabled(true)
    }
  }, [storedQuestions, idQuestion])

  useEffect(() => {
    if (props.userData.pseudo != null) {
      showWelcomeMsg(props.userData.pseudo)
    }
  }, [props.userData])

  const submitAnswer = (option) => {
    setUserAnswer(option)
    setBtnDisabled(false)
  }
  const getPercent = (maxQuestion, ourScore) => {
    return (ourScore / maxQuestion) * 100
  }
  const gameOver = (percent) => {
    if(percent >= 50){
      setQuizLevel(quizLevel + 1)
      setPercent(percent)
    }
    else{
      setPercent(percent)
    }
  }

  const loadLevelQuestions = (param) => {
    setQuizLevel(param)
    loadQuestions(param)
    setUserAnswer(null)
    setBtnDisabled(true)
    setQuizEnd(false)
    setIdQuestion(0)
    setScore(0)
    setPercent(0)
  }


  const nextQuestion = () => {
    if (idQuestion == maxQuestion - 1) {
      setQuizEnd(true)
      gameOver()
    }
    else {
      setIdQuestion(idQuestion + 1)
    }
    const goodAnswer = storedDataRef.current[idQuestion].answer
    if (goodAnswer == userAnswer) {
      setScore(score + 1)
      toast.success('Bravo ! +1', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error('Raté ! 0', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }
  const { pseudo } = props.userData;
  return quizEnd
    ? 
    <QuizOver 
    ref={storedDataRef} 
    levelNames={levelNames}
    score={score}
    maxQuestion={maxQuestion}
    quizLevel={quizLevel}
    percent={percent}
    loadLevelQuestions={loadLevelQuestions}
    />
    : 
    (<Fragment>
      <ToastContainer />
      <Levels />
      <ProgressBar idQuestion={idQuestion} maxQuestion={maxQuestion} />
      <h2>{question}</h2>
      {options.map((option, key) => {
        return <p key={key} className={`answerOptions ${userAnswer === option ? "selected" : ""}`} onClick={() => submitAnswer(option)}>{option} </p>
      })}

      <button
        disabled={btnDisabled}
        onClick={nextQuestion}
        className="btnSubmit">
        {idQuestion < maxQuestion -1 ? "Suivant" : "Terminé"}

      </button>
    </Fragment>)

}

export default Quiz