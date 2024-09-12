import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import FeedbackForm from './Components/FeedbackForm/FeedbackForm'
import Compliance from './Components/Compliance/Compliance'
import Quality from './Components/Quality/Quality'

import LoginPage from './Components/Login Page/loginPage'


function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={<LoginPage/>} />

        <Route path="/quality" element={<Quality/> } />
        <Route path="/feedback" element={<FeedbackForm/>} />
        <Route path="/complaince" element={ <Compliance/>}/>
    
      {/* <LoginPage/>
      <Quality/> 
      <FeedbackForm/>
      <Compliance/> */}
      </Routes>
    </Router>
    
  )
}

export default App;