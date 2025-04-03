export const Progress = ({index, numQuestions, points, numPoints, answer}) => {

    return (
        <header className="progress">
            <progress value={Number(answer) ? index + 1 : index} max={numQuestions}></progress>
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points} / {numPoints}</strong> points</p>
        </header>
    )
}