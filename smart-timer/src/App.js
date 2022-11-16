
import {useState} from 'react';
import Timer from './Timer';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
// import SignupForm from './signup';
import SignupFrom2 from './signup2';
import LoginForm from './login';

function App() {
  
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Timer />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupFrom2 />} />
        {/* <Route path='/about' element={<About/>} /> */}
    </Routes>
    </Router>
  );
}

export default App;
