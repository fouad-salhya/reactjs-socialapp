import React, { useState, useEffect } from 'react'
import './Account.css'
import { useNavigate, useParams } from 'react-router-dom'
import { API_USERS } from '../API/ApiResources'
import { isAuthenticated } from '../API/Token'


const Account = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { user, token } = isAuthenticated()

    const [ account, setAccount ] = useState({})

    const getProfile = () => {
         fetch(`${API_USERS}/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
         }).then(res => res.json())
           .then(res => {
             setAccount(res.user)
            
         }).catch(err => console.error(err))
    }

    useEffect(() => {
        getProfile()
    },[])


  return (
    <div className='container-fluid'>
       <div className="row">
          <div className="col-sm-8"></div>
          <div className="col-sm-4">
             <div className="card" id='card-account'>
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Text</p>
              </div>
             </div>
          </div>
       </div>
    </div>
  )
}

export default Account