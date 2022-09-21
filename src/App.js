import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {BsToggleOff,BsToggleOn} from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Chatting from './pages/Chatting';

function App() {
  const auth = getAuth();
  const [ dlMode,setDlMode ] = useState(false)
  const [showMode,setShowMode ] = useState(false)

  const dlModeChangeHandler = ()=>{
    setDlMode(!dlMode)
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowMode(true)
      } else {
        setShowMode(false)
        setDlMode(false)
      }
    });
  },[])

  return (
  <>
  <div className={dlMode ? "MoodChange":""}>
    {showMode && 
    <div className='darkMode' onClick={dlModeChangeHandler}>
    {dlMode
    ?
    <>
    <span className='on'><BsToggleOff/></span>
    <span className='text'>Switch to Light</span>
    </>
    :
    <>
    <span className='off'><BsToggleOn/></span>
    <span className='text'>Switch to Dark</span>
    </>
    }

  </div>
    }
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/reset" element={<ResetPassword />}></Route>
      <Route path="/chat" element={<Chatting />}></Route>
    </Routes>
  </BrowserRouter>
  </div>
  </>

  );
}

export default App;
