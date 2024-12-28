import React, { useEffect } from 'react'
import { useState } from 'react'

const createCounter = () => {
    const [count, setCount] = useState(0)
    const [play, setPlay] = useState(false)

    useEffect(() => {
        if(play) {
            const interval = setInterval(() => {
                setCount(count => count + 1)
            }, 100)

            return() => {
                clearInterval(interval)
            }
        }
    }, [play])

    return (
        <div className='flex flex-col m-5 justify-center items-center'>
            <h1 className='text-3xl font-bold uppercase underline'>Counter Function</h1>

            <div className='p-5 flex flex-col gap-5 items-center'>
                <p className='text-xl'>Count: {count}</p>

                <div className="flex gap-5">

                    {/* Increamenter Button */}
                    <button onClick={() => setCount(count + 1)} className='border py-1 px-2 rounded bg-black text-white'>Increamenter</button>
                    
                    {/* Start Counter Button */}
                    <button onClick={() => setPlay(!play)} className='border py-1 px-2 rounded bg-black text-white'>
                        { !play ? 'Start Counter' : 'Stop Counter' }
                    </button>

                </div>
            </div>
        </div>
    )
}

export default createCounter