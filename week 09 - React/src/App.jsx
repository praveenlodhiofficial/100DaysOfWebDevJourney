import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // Increment count every second
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>Count: {count}</div>
      <div className="flex gap-5">
        <button onClick={() => setCount(count + 1)}>Incrementer</button>
        <button onClick={() => setCount(count - 1)}>Decrementer</button>
      </div>
    </div>
  );
};

export default App;
