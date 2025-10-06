import React, { useState } from 'react'
import ListEmployee from './assets/component/ListEmployee'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Employee from './assets/component/Employee'

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={darkMode?"light-theme":"dark-theme"}>
    <BrowserRouter>
     <div className="d-flex justify-content-end p-3">
          <button className="btn btn-secondary" onClick={()=>toggleTheme()}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
    <Routes>
      <Route path='/' element={<ListEmployee darkMode={darkMode}/>}></Route>
      <Route path='/employees' element={<ListEmployee/>}></Route>
      <Route path='/employee' element={<Employee/>}></Route>
      <Route path='/update-employee/:id' element={<Employee/>}></Route>
    </Routes>
    </BrowserRouter>
    
     
    </div>
  )
}

export default App
