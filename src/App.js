import { useEffect, useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading'
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
    default: 
      throw new Error('Action is undefined')
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1 / 15</p>
        <p>Question</p>
      </Main>
    </div>
  )
}