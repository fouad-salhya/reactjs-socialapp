import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

import { API_AUTH } from '../API/ApiResources'

const Signup = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    sexe: '',
    city: ''
  })

  const userSignup = () => {

      fetch(`${API_AUTH}/signup`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },body: JSON.stringify(user)
      }).then(res => res.json())
        .then(res => {
          setUser(res.user)
          console.log(res.user)
          navigate('/signin')
        }).catch(err => console.error(err))
  }

   
  const handlInput = (e) => {
    setUser({...user,[e.target.id]:e.target.value})
}

   
  return (
    <div>
      <div className="col-sm-8 mx-auto">
        <div className="card" id='card-signup'>
          <div className="card-body">
            <form>
             <div className="row">
               <div className="col mb-3">
                <label htmlFor="name" className="form-label">name</label>
                <input type="text" className="form-control" id='name' name='name'  onChange={handlInput}/>
                </div>
                <div className="col mb-3">
                <label htmlFor="email" className="form-label">email</label>
                <input type="text" className="form-control" id='email' name='email' onChange={handlInput}/>
                </div>
             </div>
             <div className="row">
                <div className="col mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id='password' name='password' onChange={handlInput}/>
                </div>
                <div className="col mb-3">
                  <label htmlFor="sexe" className='form-label'>Gender</label>
                  <select name="sexe" id="sexe" className='form-control' onChange={handlInput}>
                    <option value="">-SELECT-</option>
                    <option value="Men">Men</option>
                    <option value="Woen">Women</option>
                  </select>
                </div>
             </div>
             <div className="row">
               <div className="col mb-3">
                  <label htmlFor="city" className='form-label'>City</label>
                  <input type="text" className='form-control' id='city' name='city'/>
               </div>
               <div className="col mb-3 ">
                 <div className="d-grid gap-2">
                 <button onClick={() => userSignup()} className='btn btn-outline-primary' id='btn-signup'>
                      CREATE ACCOUNT
                  </button>
                 </div>
               </div>
             </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup