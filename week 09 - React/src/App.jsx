import React, { useState } from 'react';
import { useFetch } from './hooks/useFetch';

const App = () => {
  const [posts, setPosts] = useState(1);
  const { finalData, loading } = useFetch(`https://jsonplaceholder.typicode.com/posts/${posts}`);

  return (
    <>

      <button onClick={() => setPosts(1)} className="border border-black rounded m-1 px-2 py-1 bg-black text-white"> Post 01 </button>
      <button onClick={() => setPosts(2)} className="border border-black rounded m-1 px-2 py-1 bg-black text-white"> Post 02 </button>
      <button onClick={() => setPosts(3)} className="border border-black rounded m-1 px-2 py-1 bg-black text-white"> Post 03 </button>
      <button onClick={() => setPosts(4)} className="border border-black rounded m-1 px-2 py-1 bg-black text-white"> Post 04 </button>


      {loading ? (
        <div className="flex justify-center items-center h-20 text-lg font-bold text-red-500"> Loading... </div>
      ) : (
        <>
          <div className="flex flex-col gap-5 border m-1 px-2 py-1 rounded border-black">
            Post No.: {JSON.stringify(finalData.id)}
          </div>

          <div className="flex flex-col gap-5 border m-1 px-2 py-1 rounded border-black">
            Title: {JSON.stringify(finalData.title)}
          </div>

          <div className="flex flex-col gap-5 border m-1 px-2 py-1 rounded border-black">
            Body: {JSON.stringify(finalData.body)}
          </div>
        </>
      )}
    </>
  );
};

export default App;
