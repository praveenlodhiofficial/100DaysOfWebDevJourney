import { SideBar } from './components/SideBar'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

const App = () => {
  return (
    <div className='flex bg-slate-100'>

      {/* SideBar */}
      <div> <SideBar/> </div>



    </div>
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
