export const Options = ({question, dispatch, answer}) => {
    const hasAnswer = answer !== null;
    return (
        <div className="options">
            {question.options.map((item, index) => 
                <button 
                    key={item}
                    className={`btn btn-option ${index === answer ? 'answer' : '' } ${hasAnswer ? index === question.correctOption ? 'correct' : 'wrong' : ''}`} 
                    onClick={() => dispatch({type: 'setAnswer', payload: index})}
                    disabled={hasAnswer}>
                    {item}
                </button>)
            }
        </div>
    )
}