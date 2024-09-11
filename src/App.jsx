import React from 'react'
import FeedbackForm from './Components/FeedbackForm/FeedbackForm'
import Compliance from './Components/Compliance/Compliance'
import Quality from './Components/Quality/Quality'

import LoginPage from './Components/Login Page/loginPage'


function App() {
  return (
    <div>
    
      <LoginPage/>
      <Quality/> 
      <FeedbackForm/>
      <Compliance/>
      
    </div>
  )
}

export default App;

