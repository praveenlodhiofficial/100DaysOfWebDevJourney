import { useState } from 'react'
import { Cards } from './components/Card'
import CreateContentModel from './components/CreateContentModel'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'

const App = () => {
  const [createContent, setCreateContent] = useState(false)

  return (
    <>
      {createContent && (
        <CreateContentModel onClose={() => setCreateContent(false)} />
      )}

      <div className='flex'>

        {/* SideBar */}
        <SideBar />

        {/* Main Content */}
        <div className='ml-[20vw] h-full w-full px-10 pt-8 flex flex-col gap-5 bg-slate-100'>

          <Header open={() => setCreateContent(true)} />
          <div className="grid grid-cols-3 gap-5">

            <Cards
              brainTitle="LLM Tweet"
              brainLink="https://twitter.com/praveenlodhi99/status/1873186043769630935?ref_src=twsrc%5Etfw"
              brainType="twitter"
              brainDescription=""
            />

            <Cards
              brainTitle="Harkirat YT Video"
              brainLink="https://www.youtube.com/embed/Qfd00VQ2W1Y?si = jlGCHzi3UPSS1sdS"
              brainType="youtube"
              brainDescription="This ia a YT video from the Tushar Channel, about video transmisson."
            />

            <Cards
              brainTitle="Harkirat YT Video"
              brainLink="https://www.youtube.com/embed/Qfd00VQ2W1Y?si = jlGCHzi3UPSS1sdS"
              brainType="youtube"
              brainDescription="This ia a YT video from the Tushar Channel, about video transmisson."
            />

            <Cards
              brainTitle="Harkirat YT Video"
              brainLink="https://www.youtube.com/embed/Qfd00VQ2W1Y?si = jlGCHzi3UPSS1sdS"
              brainType="youtube"
              brainDescription="This ia a YT video from the Tushar Channel, about video transmisson."
            />

          </div>
        </div>

      </div>
    </>
  )
}

export default App