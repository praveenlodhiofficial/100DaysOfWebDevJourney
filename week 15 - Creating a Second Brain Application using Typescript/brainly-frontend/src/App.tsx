import { Cards } from './components/Card'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'

const App = () => {
  return (
    <>
      <div className='flex'>

        {/* SideBar */}
        <SideBar />

        {/* Main Content */}
        <div className='ml-[20vw] w-full px-10 pt-8 flex flex-col gap-5 bg-slate-100'>
          <Header />
          <div className="grid grid-cols-3 gap-5">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
        </div>

      </div>
    </>
  )
}

export default App
























// import './App.css'
// import { Button } from './components/ui/Button'
// import { PlusIcon } from './icons/PlusIcon'
// import { ShareIcon } from './icons/ShareIcon'

// function App() {

//   return (
//     <>
//       <Button
//         variant={"primary"}
//         startIcon={<PlusIcon size={"lg"} />}
//         endIcon={<ShareIcon size={"lg"} />}
//         size="lg"
//         title={"Share"}
//       ></Button>

// <Button
//         variant={"secondary"}
//         startIcon={<PlusIcon size={"lg"} />}
//         endIcon={<ShareIcon size={"lg"} />}
//         size="lg"
//         title={"Share"}
//       ></Button>


// <Button
//         variant={"primary"}
//         startIcon={<PlusIcon />}
//         endIcon={<ShareIcon />}
//         size="sm"
//         title={"Share"}
//       ></Button>


// <Button
//         variant={"primary"}
//         startIcon={<PlusIcon size={"md"} />}
//         endIcon={<ShareIcon size={"md"} />}
//         size="md"
//         title={"Share"}
//       ></Button>
//     </>
//   )
// }

// export default App
