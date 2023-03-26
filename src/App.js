import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";


import { AuthContext, WorkerContext } from "./components/context";


import './styles/App.css'

function App() {
  const[isAuth, setIsAuth] = useState(false)
  const[isWorker, setIsWorker] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
    if(localStorage.getItem('isWorker') && localStorage.getItem('isWorker') === 'true'){
      console.log(localStorage.getItem('isWorker'))
      
     
        setIsWorker(true)
      
    }
  }, [])

  return(
    <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
    }}>
       <WorkerContext.Provider value={{
        isWorker,
        setIsWorker
    }}>
    <BrowserRouter>
    <AppRouter/>
    </BrowserRouter>
    </WorkerContext.Provider>  
      
    </AuthContext.Provider>
    
  )
}

export default App;
