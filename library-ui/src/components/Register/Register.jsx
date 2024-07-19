import React from 'react'
import './Register.css'
import magicball from '../Assets/ball.png';
import daytreo1 from '../Assets/daytreo1.png';
import daytreo2 from '../Assets/daytreo2.png';
import logoM from '../Assets/final logo M.png';
import LibName from '../Assets/Library name.png';
import login_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import moon1 from '../Assets/moon.png';
import moon2 from '../Assets/moon2.png';
import pot from '../Assets/pot.png';
import checkbox from '../Assets/checkbox.png';
import bgr from '../Assets/bgr.png';
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import AuthDataService from "../../services/auth.service";
// 
const LoginSignUp = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthDataService.register({ username, fname, lname, email, password, phoneNumber });
      if (response.status === 201) {
        console.log(response.data);
        navigate('/login');
      }
    } catch (error) {
      // Handle the error
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className='container'>
       <div className="background">
        <img src={bgr} alt="" />
       </div>

      <div className="rectangle">
          
      <div className="logins">

        {/* Error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Login button */}
        <a href="#" className="button1" onClick={handleRegister}>
          <span>Register</span>
          <span>Register</span>
        </a>


          {/* Check box */}
          

          {/* Forgot password & text */}
          
          <a href='#' onClick={()=>{navigate('/login')}} className="SignUp1">Already have an accout?</a>
          
      </div>

          {/* Mythos Mysterium */}
          <div className="header">
          <img src={LibName} onClick={()=>{navigate('/')}} className="LibName1" alt="" />
          </div>

          {/* Login input */}
          <div className="inputs1"> 
            <div className="input">
              <img src={login_icon} className="login_icon" alt="" />
              <input type="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="input">
              <img src={password_icon} className="login_icon" alt="" />
              <input type="text" placeholder="First Name" value={fname} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="input">
              <img src={password_icon} className="login_icon" alt="" />
              <input type="text" placeholder="Last Name" value={lname} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="input">
              <img src={password_icon} className="login_icon" alt="" />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input">
              <img src={password_icon} className="login_icon" alt="" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="input">
              <img src={password_icon} className="login_icon" alt="" />
              <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </div>
          </div>

          


        <div className="element">
          {/* Moon1 */}
          <img src={moon1} className="moon1" alt="" />

          {/* Moon2 */}
          <img src={moon2} className="moon2" alt="" />
        </div>



      </div>

      

      

      
      
    </div>
  )
}

export default LoginSignUp

