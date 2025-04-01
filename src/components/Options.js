export const Options = ({question}) => {
    return (
        <div className="options">
            {question.options.map((item) => <button className="btn btn-option">{item}</button>)}
        </div>
    )
}