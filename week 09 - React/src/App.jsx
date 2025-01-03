import React from 'react';
import { RecoilRoot, atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { counterAtom } from './store/atoms/counterAtom';
import { counterSelector } from './store/selectors/counterSelector';

// Parent component
function Parent() {
  return (
    <div>
      <Buttons />
      <Counter />
      <IsEven />
    </div>
  );
}

// Buttons component
function Buttons() {
  const setCount = useSetRecoilState(counterAtom);

  function increase() {
    setCount((count) => count + 2);
  }

  function decrease() {
    setCount((count) => count - 1);
  }

  return (
    <div>
      <button className='border border-black m-1 px-2 py-1 rounded text-white bg-black' onClick={increase}>Increase</button>
      <button className='border border-black m-1 px-2 py-1 rounded text-white bg-black' onClick={decrease}>Decrease</button>
    </div>
  );
}

// Counter component
function Counter() {
  const count = useRecoilValue(counterAtom);
  return <div className='px-2 py-1 rounded'>Count: {count}</div>;
}

// IsEven component
function IsEven() {
  const isEven = useRecoilValue(counterSelector);
  return <div className='px-2 py-1 rounded'>{isEven ? 'Even' : 'Odd'}</div>;
}

// App component
const App = () => {
  return (
    <RecoilRoot>
      <Parent />
    </RecoilRoot>
  );
};

export default App;
