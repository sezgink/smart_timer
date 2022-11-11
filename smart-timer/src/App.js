
import {useState} from 'react';
import Timer from './Timer';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './Timer.css';
import SignupForm from './signup';

function App() {
  
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Timer />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/login' element={<SignupForm />} />
        {/* <Route path='/about' element={<About/>} /> */}
    </Routes>
    </Router>
  );
}

export default App;
