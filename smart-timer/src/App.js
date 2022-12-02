
import {useEffect, useState} from 'react';
import Timer from './Timer';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignupFrom2 from './signup2';
import LoginForm from './login';
import WorkChart from './workChart';
import TimerForUser from './TimerForUser';
import {onSignout,checkSignIn} from './userOps';


function App() {  
  let [userState,setUserState]= useState({isSigned:false,user:{ _id:"", email:""},token:""});

  useEffect(()=>{
    checkSignIn(setUserState);
  },[]);

  return (
    
    <Router>
    <Navbar userState={userState} onSignout={()=>onSignout(setUserState)}  />
    <Routes>
        <Route exact path='/' element={userState.isSigned? <TimerForUser userState={userState}/>   :<Timer userState={userState} />} />
        <Route path='/timer' element={userState.isSigned? <TimerForUser userState={userState}/>   :<Timer userState={userState} />} />
        <Route path='/login' element={<LoginForm setUserState={setUserState} />}>
        </Route>
        <Route path='/signup' element={<SignupFrom2 setUserState={setUserState} />} />
        <Route path='/workchart' element={<WorkChart userState={userState} />} />
    </Routes>
    </Router>
  );
}

export default App;
