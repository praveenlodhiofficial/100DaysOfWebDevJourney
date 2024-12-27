import React from 'react'
import { useState } from 'react'

const createCounter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1 className='text-3xl font-bold uppercase underline'>Create Counter</h1>
      <div className='p-5 flex gap-5 items-center'>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)} className='border py-1 px-2 rounded bg-black text-white'>Increamenter</button>
      </div>
    </div>
  )
}

export default createCounter