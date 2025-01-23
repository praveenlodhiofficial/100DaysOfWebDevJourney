import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import { Dashboard } from './pages/Dashboard'
import { SigninPage } from './pages/SigninPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App