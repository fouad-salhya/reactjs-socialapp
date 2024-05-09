import React from 'react'



const SignupForm = (props) => {

    //  const { htmlFor, label, type, id, name, onChange } = props

  return (
    <div className="col mb-3">
      <label htmlFor={props.htmlFor} className="form-label"> {props.label}  </label>
      <input type={props.type} className="form-control" id={props.id} name={props.name} onChange={props.onChange}/>
   </div>
  )
}

export default SignupForm