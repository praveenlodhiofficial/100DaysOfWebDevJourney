import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

const App = () => {
  return (
    <>
      <Button variant="primary" title="Add" size="md" startIcon={<PlusIcon size='md'/>} onClick={() => alert("Button clicked!")}/>
      <Button variant="secondary" title="Share" size="md" startIcon={<ShareIcon size='md'/>} onClick={() => alert("Button clicked!")}/>
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
