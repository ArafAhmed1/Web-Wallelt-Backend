import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { AuthRedirect } from './AuthRedirect'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<AuthRedirect />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='/send' element={<SendMoney />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
