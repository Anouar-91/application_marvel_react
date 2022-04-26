import React, {Fragment} from 'react'

const ProgressBar = (props) => {
  const {idQuestion, maxQuestion} = props
  const actualQuestion = idQuestion +1
  const getWidth = (totalQuestion, questionId) => {
    return (100/totalQuestion) * questionId
  }
  const progressPurcent = getWidth(maxQuestion,actualQuestion )
  return (
    <Fragment>
    <div className="percentage">
        <div className="progressPercent">Question: {actualQuestion}/{maxQuestion}</div>
        <div className="progressPercent">Progression: {progressPurcent}%</div>
    </div>
    <div className="progressBar">   
        <div className="progressBarChange" style={{width:`${progressPurcent}%`}}> </div>
    </div>
    </Fragment>
  )
}

export default React.memo(ProgressBar)