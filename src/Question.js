import { Options } from "./Options"

export const Question = ({question}) => {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} />
        </div>
    )
}