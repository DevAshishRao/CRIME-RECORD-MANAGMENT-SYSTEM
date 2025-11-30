import './App.css'

// pages regarding redirection
import Home from './pages/Home'
import Record from './pages/Record'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import UserProfile from './pages/UserProfile'

// components if needed

// using different context regarding alerts and records
import AlertState from './context/alert/AlertState'
import RecordState from './context/records/RecordState'

// importing required packages
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>

      <AlertState>
        <RecordState>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Record />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RecordState>
      </AlertState >

    </>
  )
}

export default App
