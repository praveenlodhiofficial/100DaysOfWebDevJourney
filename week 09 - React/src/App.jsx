import React, { createContext, useContext, useState } from 'react'

const CountContext = createContext();

function CountContextProvider({ children }) {
  const [count, setCount] = useState(0)

  return <CountContext.Provider value={{ count, setCount }}>
    {children}
  </CountContext.Provider>
}

function Parent() {
  return (
    <CountContextProvider>
      <div className="flex flex-col m-1 text">
        <Value />
        <Incrementer />
        <Decrementer />
      </div>
    </CountContextProvider>
  )
}

function Incrementer() {
  const { setCount } = useContext(CountContext)
  return <button className='border border-black px-2 py-1 rounded m-1 flex w-40 text-white bg-black' onClick={() => setCount(count => count + 1)}>Incrementer</button>
}

function Decrementer() {
  const { setCount } = useContext(CountContext)
  return <button className='border border-black px-2 py-1 rounded m-1 flex w-40 text-white bg-black' onClick={() => setCount(count => count - 1)}>Decrementer</button>
}

function Value() {
  const { count } = useContext(CountContext)
  return <div className='border border-black px-2 py-1 rounded m-1 flex w-40'>Count: {count}</div>
}

const App = () => {
  return <Parent />
}

export default App