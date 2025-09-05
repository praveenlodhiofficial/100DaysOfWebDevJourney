'use client'

import axios from 'axios'
import { useEffect, useState } from "react"

export default function Home() {
  const [jokes, setJokes] = useState<any[]>([])

  useEffect(() => {
    axios.get('/api/jokes')
    .then((response) => {
      setJokes(response.data.data || [])
    })
    .catch((error) => {
      console.log(`Unable to fetch jokes: ${error}`)
      setJokes([]) // Set empty array on error
    })
  }, [])

  return (
    <div className='flex items-center h-screen flex-col p-10 gap-5 w-full'>
      <h1 className='text-2xl font-semibold uppercase'>Jokes: {jokes.length}</h1>
      <p className='grid grid-cols-2 gap-5 w-full'>
        {jokes.map((joke, index) => (
            <div key={index} className="border rounded-xl p-3 w-full flex flex-col gap-2">
              <p className='text-sm'>Id: {joke.id}</p>
              <p className='text-sm'>Setup: {joke.setup}</p>
              <p className='text-sm'>Punchline: {joke.punchline}</p>
            </div>
        ))}
      </p>
    </div>
  )
}