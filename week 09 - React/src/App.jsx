import React, { useState } from 'react'
import { usePrev } from './hooks/usePrev'

const App = () => {
  const [count, setCount] = useState(0)
  const prev = usePrev(count)

  return (
    <>
    <div className='m-1 px-2 py-1 border border-black rounded'>The Current count is {count}</div>
    <div className='m-1 px-2 py-1 border border-black rounded'>The Previous count was {prev}</div>
    <button className='m-1 px-2 py-1 border border-black rounded text-white bg-black' onClick={() => setCount(count => count + 1)}>Increamenter</button>
    </>
  )
}

export default App