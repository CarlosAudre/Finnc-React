import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import {Toaster} from 'sonner'
import { Home } from "./pages/Home"
import { MainLayout } from "./layout/MainLayout"
import { Expense } from "./pages/Expense"
import { DashboardPage } from "./pages/DashboardPage"
import { Profile } from "./pages/Profile"

function App() { 

  return (
    <>
      <Toaster 
      position="top-center"
      richColors
      />
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route element={<MainLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/expense" element={<Expense/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
    </Router>
    </>
  
  )
}

export default App
