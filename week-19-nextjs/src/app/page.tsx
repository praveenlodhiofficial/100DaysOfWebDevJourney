import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center p-5 gap-10'>

      <h1 className="text-6xl uppercase">HomePage</h1>

      <div className="flex gap-5 ">
        
        <Link className="px-3 py-2 uppercase rounded-md bg-slate-100 bg-opacity-20"
          href={'/signup'}
        >
          Signup
        </Link>

        <Link className="px-3 py-2 uppercase rounded-md bg-slate-100 bg-opacity-20"
          href={'/signin'}
        >
          Signin
        </Link>

      </div>
    </div>
  )
}

export default page