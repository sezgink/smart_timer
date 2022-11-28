
import {useState} from 'react';
import Timer from './Timer';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import {redirect} from 'react-router';
// import SignupForm from './signup';
import SignupFrom2 from './signup2';
import LoginForm from './login';
import WorkChart from './workChart';
import TimerForUser from './TimerForUser';

function App() {  
  let [userState,setUserState]= useState({isSigned:false,user:{ _id:"", email:""},token:""});

  return (
    
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={userState.isSigned? <TimerForUser userState={userState}/>   :<Timer userState={userState} />} />
        <Route path='/timer' element={userState.isSigned? <TimerForUser userState={userState}/>   :<Timer userState={userState} />} />
        <Route path='/login' element={<LoginForm setUserState={setUserState} />}>
        {/* <Route path='/login'> */}
          {/* {userState.isSigned ? redirect('/timer'): "" } */}
          {/* {userState.isSigned ? redirect('/timer'): <LoginForm setUserState={setUserState} /> } */}
        </Route>
        <Route path='/signup' element={<SignupFrom2 setUserState={setUserState} />} />
        <Route path='/workchart' element={<WorkChart userState={userState} />} />
        {/* <Route path='/about' element={<About/>} /> */}
    </Routes>
    </Router>
  );
}

export default App;
