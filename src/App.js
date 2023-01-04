
import { Routes,Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';

function App() {
  return (

    <Routes>
    
    <Route path='/' element={<SignUpPage/>}></Route>
      <Route path='/homepage' element={<HomePage/>}></Route>
       <Route path='/signup' element={<SignUpPage/>}></Route>
       <Route path='/login' element={<LoginPage/>}></Route>
      
    </Routes>
  );
}

export default App;
