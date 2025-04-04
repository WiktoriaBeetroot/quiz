export const Button = ({dispatch, answer, question, numQuestions}) => {
    if (answer == null) {
        return null
    }

    if (question < numQuestions - 1) {
        return (
            <button onClick={() => dispatch({type: 'nextQuestion'})} className="btn btn-ui">Next</button>
        )
    }

    if (question === numQuestions - 1) {
        return (
            <button onClick={() => dispatch({type: 'finish'})} className="btn btn-ui">Finish quiz</button>
        )
    }
}