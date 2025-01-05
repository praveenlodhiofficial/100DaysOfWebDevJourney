import React, { useState } from 'react';

const App = () => {
  const [color, setColor] = useState('bg-black'); // Default background color

  return (
    <>
      <div className={`w-full h-screen ${color}`}>
        <div className="flex flex-wrap p-10 gap-5 justify-center">
          <button onClick={() => setColor('bg-red-600')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-red-600">Red</button>
          <button onClick={() => setColor('bg-blue-600')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-blue-600">Blue</button>
          <button onClick={() => setColor('bg-green-600')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-green-600">Green</button>
          <button onClick={() => setColor('bg-yellow-400')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-yellow-400">Yellow</button>
          <button onClick={() => setColor('bg-purple-600')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-purple-600">Purple</button>
          <button onClick={() => setColor('bg-pink-600')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-pink-600">Pink</button>
          <button onClick={() => setColor('bg-orange-600')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-orange-600">Orange</button>
          <button onClick={() => setColor('bg-teal-600')} className="border w-28 px-3 py-2 text-white cursor-pointer rounded-3xl bg-teal-600">Teal</button>
        </div>
      </div>
    </>
  );
};

export default App;
