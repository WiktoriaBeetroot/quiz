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
import { Footer } from './Footer';
import { Timer } from './Timer';

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemain: null,
  level: 0,
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
        status: 'active',
        secondsRemain: state.questions.length * SECONDS_PER_QUESTION,
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
    case 'restart' : 
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      }
    case 'timer' : 
      return {
        ...state,
        secondsRemain: state.secondsRemain - 1,
        status: state.secondsRemain === 0 ? 'finished' : state.status,
      }
    case 'setLevel' : 
      return {
        ...state,
        level: action.payload
      }
    default: 
      throw new Error('Action is undefined')
  }
}

export default function App() {
  const [{questions, status, index, answer, points, highscore, secondsRemain, level}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const numPoints = questions.reduce((prev, curr) => {
    return prev + curr.points
  }, 0)

  useEffect(() => {
    async function fetchData() {
      // Get the base URL for the current environment (works both locally and on GitHub Pages)
      const baseUrl = window.location.pathname.includes('/quiz') ? '/quiz' : '';
      const url = `${baseUrl}/data/questions.json`;
  
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error('Error while fetching data')
        }
  
        const data = await response.json();
        dispatch({ type: 'dataRecieved', payload: Number(level) > 0 ? data.questions.filter((curr) => curr.points === Number(level)) : data.questions });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }
  
    fetchData();
  }, [level]);

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
          <Footer>
            <Button dispatch={dispatch} answer={answer} question={index} numQuestions={numQuestions} />
            <Timer dispatch={dispatch} secondsRemain={secondsRemain}/>
          </ Footer>
        </>
        }

        {status === 'finished' && <FinishScreen numPoints={numPoints} points={points} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  )
}
