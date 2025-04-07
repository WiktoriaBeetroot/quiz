export const MainScreen = ({ numQuestions, dispatch }) => {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz</h2>
            <div className="select">
                <label htmlFor="level-select">Difficulty of the questions:</label>
                <select name="level" id="level-select" onChange={(e) => dispatch({type: 'setLevel', payload: e.target.value})}>
                    <option value="0">All questions</option>
                    <option value="10">Easy</option>
                    <option value="20">Medium</option>
                    <option value="30">Hard</option>
                </select>
            </div>
            <h3>{ numQuestions } questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: 'start'})}>Let's start</button>
        </div>
    )
}