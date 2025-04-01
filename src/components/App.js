import { useEffect, useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Loader } from './Loader';
import { Error } from './Error';
import { MainScreen } from './MainScreen';
import { Question } from './Question';

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
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
    default: 
      throw new Error('Action is undefined')
  }
}

export default function App() {
  const [{questions, status, index}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

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
        {status === 'active' && <Question question={questions[index]} />}
      </Main>
    </div>
  )
}