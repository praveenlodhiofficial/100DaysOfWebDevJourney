import React from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom } from './store/atoms/counter';

// We always implement our Atom outside the App that's why we shifted to different folder 'src/state/atoms/counter.js'

function Parent() {
  return <RecoilRoot>
    <Value/>
    <Incrementer/>
    <Decrementer/>
  </RecoilRoot>
}

function Incrementer() {
  const setCount = useSetRecoilState(counterAtom);
  return <button className='border border-black m-1 px-2 py-1 rounded text-white bg-black' onClick={() => setCount(count => count + 1)}>Incrementer</button>
}

function Decrementer() {
  const setCount = useSetRecoilState(counterAtom);
  return <button className='border border-black m-1 px-2 py-1 rounded text-white bg-black' onClick={() => setCount(count => count + 1)}>Decrementer</button>
}

function Value() {
  const count = useRecoilValue(counterAtom);
  return <div className='px-2 py-1 rounded'>Counter: {count}</div>
}

const App = () => {
  return (
    <>
    <Parent/>
    </>
  )
}

export default App