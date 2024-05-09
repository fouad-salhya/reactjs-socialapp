import './App.css';
import  { Route, Routes } from "react-router-dom"
import Menu from './Menu/Menu';
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import Account from './Account/Account';

const  App = () => {
  return (
    <div>
    <Menu />
    
    <Routes>
      <Route path='/' element={<Home/>} /> 
      <Route path='/account/:id' element={<Account/>} />   
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>} />
    </Routes> 
    </div>
  );
}

export default App;
