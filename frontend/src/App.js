import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Register from './components/registers/Register';
import Login from './components/login/Login';


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;
