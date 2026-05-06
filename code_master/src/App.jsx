import React from 'react'
import { Routes, Route } from "react-router";
import Login from './pages/login';
import { BrowserRouter } from 'react-router-dom'
import Landing from './pages/landing';
import Register from './pages/Register';
import Problemlist from './pages/pagelist';
import ProblemPage from './pages/problemPage';
import Navbar from './components/navbar';
import Dashboard from './pages/Dashboard';
import SubmitData from './components/Runresult';
import ProblemDetail from './components/ProblemDetail';
import Run from './components/Run';
import { AuthProvider } from './context/authContext';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/problemlist' element={<Problemlist />} />
          <Route path='/problemlist/:id' element={<ProblemPage />} >
            <Route index element={<ProblemDetail />} />
            <Route path='submit' element={<SubmitData />} />
            <Route path='run' element={<Run />} />
          </Route>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
