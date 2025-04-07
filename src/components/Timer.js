import { useEffect } from "react"

export const Timer = ({dispatch, secondsRemain}) => {
    let minutes = Math.floor(secondsRemain / 60);
    let seconds = secondsRemain % 60;

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch({type: 'timer'})
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [dispatch])
    return (
        <div className="timer">
            <p>{minutes < 10 && 0}{minutes} : {seconds < 10 && 0}{seconds}</p>
        </div>
    )
}