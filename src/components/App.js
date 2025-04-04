import { useEffect, useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Loader } from './Loader';
import { Error } from './Error';
import { MainScreen } from './MainScreen';
import { Question } from './Question';
import { Button } from './Button';
import { Progress } from './Progress';
import { FinishScreen } from './FinishScreen';

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
}

function reducer(state, action) {
  switch(action.type) {
    case 'dataRecieved': 
    return {
      ...state,
      questions: action.payload,
      status: 'ready'
    };
    case 'dataFailed' :
      return {
        ...state,
        status: 'error'
      }
    case 'start' :
      return {
        ...state,
        status: 'active'
      }
    case 'setAnswer' :
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: 
        action.payload === question.correctOption 
        ? state.points + question.points
        : state.points
      }
    case 'nextQuestion' : 
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case 'finish' : 
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    default: 
      throw new Error('Action is undefined')
  }
}

export default function App() {
  const [{questions, status, index, answer, points, highscore}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const numPoints = questions.reduce((prev, curr) => {
    return prev + curr.points
  }, 0)

  useEffect(() => {
    async function fetchData() {
      const url = 'http://localhost:8000/questions';

      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error('Error while fetching data')
        }
  
        const data = await response.json();
        dispatch({type: 'dataRecieved', payload: data})
      }catch(error) {
        dispatch({type: 'dataFailed'})
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <MainScreen numQuestions={ numQuestions } dispatch={ dispatch }/>}
        {status === 'active' && 
        <>
          <Progress index={index} numQuestions={numQuestions} points={points} numPoints={numPoints} answer={answer}/>
          <Question question={questions[index]}  dispatch={dispatch} answer={answer}/>
          <Button dispatch={dispatch} answer={answer} question={index} numQuestions={numQuestions} />
        </>
        }

        {status === 'finished' && <FinishScreen numPoints={numPoints} points={points} highscore={highscore}/>}
      </Main>
    </div>
  )
}