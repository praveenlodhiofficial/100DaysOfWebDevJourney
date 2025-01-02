import React, { useEffect, useState } from 'react'
import { useTimer } from './hooks/useTimer'

const App = () => {
  const { count, setPlay, play } = useTimer()

  return (
    <>
      <button
        className="flex border border-black p-1"
        onClick={() => setPlay (!play)}
        >
        { (!play) ? 'Start Timer : ' : 'Stop Timer : ' }
        {count}
      </button>
    </>
  )
}

export default App