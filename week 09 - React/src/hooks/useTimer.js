import { useEffect, useState } from "react"

export function useTimer() {
    const [count, setCount] = useState(0)
    const [play, setPlay] = useState(false)
  
    useEffect(() => {
      if (play) {
        let interval = setInterval (() => {
          setCount (count => count + 1)
        }, 100)
  
        return() => {
          clearInterval(interval);
        }
      }
    }, [play])

    return ({
        count: count,
        setPlay: setPlay,
        play: play
    })
}