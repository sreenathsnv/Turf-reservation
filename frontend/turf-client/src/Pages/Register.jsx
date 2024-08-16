import React,{useRef, useState} from 'react'
import '../CSS/Auth/register.css'
import {Link} from 'react-router-dom'

const Register = () => {


  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [formdata,setFromData] = useState({
    email: '',
    password:'',
    re_password:'',
    username: '',
    phone:'',
    is_owner:false


  })

  const togglePassword = (ref) => {
    const field = ref.current;
    console.info(field,field.getAttribute('type') === 'password')
    const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
    field.setAttribute('type', type);
  };

  const handleChange = (e)=>{
    console.info(formdata)
      const {name, value} = e.target
       setFromData({
        ...formdata,
        [name]:value,
      })
      

  }
  return (
    <form action="" className="form_main" id="registrationForm">
    <p className="heading">Register</p>
    <div className="inputContainer">
      <input type="text" 
      value={formdata.username}
      onChange={handleChange}
      name='username'
      className="inputField" id="username" 
      
      placeholder="Username" required/>
    </div>
    <div className="inputContainer">
      <input type="email" className="inputField"
        name='email'
        value={formdata.email}
        onChange={handleChange}
      id="email" placeholder="Email" required/>
    </div>
    <div className="inputContainer">
      <input type="text" 
       value={formdata.phone}
       onChange={handleChange}
      className="inputField" name='phone' id="phonenumber" placeholder="Phone Number" required/>

    </div>
    <div className="inputContainer">
      <input type="password"
       value={formdata.password}
       onChange={handleChange}
      ref={passwordRef} name='password' className="inputField" id="password" placeholder="Password" required/>
      <span className="toggle-password" onClick={()=>{togglePassword(passwordRef)}}>&#128065;</span>
    </div>
    <div className="inputContainer">
      <input type="password"
       value={formdata.re_password}
       onChange={handleChange}
      name='re_password' ref = {confirmPasswordRef} className="inputField" id="confirm_password" placeholder="Confirm Password" required/>
      <span className="toggle-password" onClick={() => togglePassword(confirmPasswordRef)}>&#128065;</span>
    </div>
    <div className="inputContainer">
      <label className="radioLabel">
        <input type="radio"
        checked={formdata.is_owner === 'true'}
        value="false"
         onChange={handleChange}
        name="is_owner" required/> User
      </label>
      <label className="radioLabel">
        <input type="radio" 
        onChange={handleChange}
        name="is_owner" 
        value="true"
        
        checked={formdata.is_owner === 'false'}
         required/> Owner
      </label>
    </div>
    <button id="button" type="submit"
      onClick={(e)=>{e.preventDefault() ;console.log(formdata)}}
    >Submit</button>
    <p className="login-link">
      Already have an account? <Link to="/login">Login</Link>.
    </p>
  </form>
  )
}

export default Register