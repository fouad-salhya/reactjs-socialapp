/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Menu.css'
import logo from '../Image/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { API_AUTH } from '../API/ApiResources'
import { isAuthenticated } from '../API/Token';

const Menu = () => {
   
    const navigate = useNavigate()

    const { user, token } = isAuthenticated()
 
    const userSignout = () => {
       
       fetch(`${API_AUTH}/signout`)
          .then(() => {
              localStorage.removeItem('JWT');
              navigate('/signin')
          })
    }

  return (
    <nav className='bg-light sticky-top navbar-sm'>
      <ul id='ul-'>
         <li className='nav-item' id='li-margin'>
         <img src={logo} alt=""  id='img-logo'/>
         </li>
         <li className='navbar-item' id='li-margin'>
             <a href="" className="navbar-brand nav-link" id='navbar-brand'>
               Tawasol
          </a>
         </li>
      </ul>
         
         {isAuthenticated() && (
          <ul  id='ul-'>
          <li className='nav-item' id='li-margin'>
            <Link to="/" className="nav-link" >
                Acceuil
              <i className="fa fa-home" aria-hidden="true" id='icon-home'></i>
            </Link>
          </li>
          <li className='nav-item' id='li-margin'>
            <a href="" className="nav-link">
                 Chats
                <i className="fa fa-wechat" aria-hidden="true" id='icon-home'></i>
            </a>        
          </li>
          <li className='nav-item' id='li-margin'>
            <a href="" className="nav-link" >
              Notification
              <i className="fa fa-bell" aria-hidden="true"id='icon-home'></i>
            </a>  
          </li>
          <li className='nav-item' id='li-margin'>
            <a href="" className="nav-link" >
               Friends
               <i className="fa fa-users" aria-hidden="true"></i>
            </a>  
          </li>
        </ul>
         )}
    
      <ul className='auth'  id='ul-'>
        {! isAuthenticated() && (
          <>
           <li className='nav-item ' id='li-margin'>
           <Link to="/signin" className="nav-link">
             Signin
           </Link>  
         </li>
         <li className='nav-item' id='li-margin'>
           <Link to="/signup" className="nav-link">
             Signup
           </Link>  
         </li>
         </>
        )}
        
        {isAuthenticated() && (
           <li className="dropstart" id='li-margin'>
           <i className="fa fa-user-circle" id='icon-user' data-bs-toggle="dropdown" aria-expanded="false">
     
           </i>
           <ul className="dropdown-menu mt-5">
             <li>
               <Link to={`/account/${user._id}`} className="dropdown-item" >Account</Link>
             </li>
             <li>
               <a className="dropdown-item" href="#">Settings</a>
             </li>
             <li>
               <span  className="dropdown-item" onClick={() => userSignout()}>Signout</span>
             </li>
           </ul>
          </li>
        )}
      </ul>
    </nav> 
   
  )
}

export default Menu