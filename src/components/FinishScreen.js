export const FinishScreen = ({numPoints, points, highscore, dispatch}) => {
    const percentage = (points * 100) / numPoints;
    let emoji;

    if (percentage === 100) emoji = "🥇";
    if (percentage > 80 && percentage < 100) emoji = "🤗";
    if (percentage > 50 && percentage < 80) emoji = "😌";
    if (percentage > 0 && percentage < 50) emoji = "🙃";
    if (percentage === 0) emoji = "🥺";

    return (
        <>
            <p className="result">{emoji} Your score {points} out of {numPoints} points ({Math.ceil(percentage)}%)</p>
            <p className="highscore">Highscore: {highscore} points</p>
            <button onClick={() => dispatch({type: 'restart'})} className="btn btn-ui">Restart</button>
        </> 
    )
}