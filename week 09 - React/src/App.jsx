import React, { useRef } from 'react';

const App = () => {
  const shouldFocus = useRef();

  function focusOnInput() {
    shouldFocus.current.focus(); // Focus on the first input
  }

  return (
    <>
      <form
        action="#"
        className="border-black border flex flex-col w-80 p-2 rounded-lg m-5 gap-2 font-[laila]"
      >
        <input
          type="text"
          placeholder="Name"
          ref={shouldFocus}
          className="border border-dotted border-black px-2 py-1 text-center rounded"
        />
        <input
          type="text"
          placeholder="Email"
          className="border border-dotted border-black px-2 py-1 text-center rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          className="border border-dotted border-black px-2 py-1 text-center rounded"
        />
        <button
          type="button"
          onClick={focusOnInput}
          className="border border-dotted border-white px-2 py-2 text-center rounded bg-black text-white text-sm"
        >
          Focus on First Input
        </button>
      </form>
    </>
  );
};

export default App;
