import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_AUTH } from '../API/ApiResources'
import './Signin.css'


const Signin = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handlInput = (e) => {
    setUser({...user,[e.target.id]:e.target.value})
}

const userSignin = () => {

      fetch(`${API_AUTH}/signin`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },body: JSON.stringify(user)
      }).then(res => res.json())
        .then(res => {

            localStorage.setItem('JWT',JSON.stringify(res))
            navigate('/')
        }).catch(err => console.error(err))
}



  return (
    <div>
      <div className="col-sm-5 mx-auto">
         <div className="card" >
          <div className="card-body">
             <div className="row">
              <div className="col mb-2">
                 <label htmlFor="email" className="form-label">Email</label>
                 <input onChange={handlInput} type="text" className="form-control" id='email' name='email'/>
              </div>
              
             </div>
             <div className="row">
              <div className="col ">
                 <label htmlFor="password" className="form-label">Password</label>
                 <input onChange={handlInput} type="password" className="form-control" id='password' name='password'/>
              </div>
             </div>
             <div className="row col">
                 <div className="d-grid gap-2">
                 <button onClick={() => userSignin()} className='btn btn-outline-primary' id='btn-signup'>
                      CONNEXION
                  </button>
                 </div>
               </div>
          </div>
         </div>
      </div>
    </div>
  )
}

export default Signin