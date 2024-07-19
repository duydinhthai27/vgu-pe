import React from 'react'
import './LoginSignUp.css'
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
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
// 
const LoginSignUp = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthDataService.login({ email, password });
    
      if (response.status == 200) {
        localStorage.setItem('accessToken', response.data.accessToken); 
        // Login was successful
        console.log(response.data);
        if(response.data.role=='admin')
          {
            navigate('/admin');
          }
        else{
          navigate('/'); // navigate to dashboard page after successful login
        }
        
      }
    } catch (error) {
      // Handle the error
      setErrorMessage(error.response.data.message);
    }
  };

  // get accessToken from response and store it in local storage

  return (
    <div className='container' id="login" >
       <div className="background">
        <img src={bgr} alt="" /></div>

      <div className="rectangle">
          {/* Welcome to M */}
      <div className="header1">
        <div className="welcometo">Welcome to</div>
        <img src={logoM} className="logoM" alt="" />
      </div>
      <div className="logins">
        {/* Login button */}
          <a href="#" className="button" onClick={handleLogin}>
            <span>Log in</span>
            <span>Log in</span>
          </a>

          {/* Error message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Check box */}
          <div className="checkbox">
          <input type="checkbox" />
          </div>
          <label htmlFor=""></label>

          {/* Forgot password & text */}
          <a href='#'  className="forgot-password">Forgot your password?</a>
          <a href='#' onClick={()=>{navigate('/register')}} className="SignUp">New user? Sign up here</a>
          <div className="RememberMe">Remember me</div>
      </div>

          {/* Mythos Mysterium */}
          <div className="header">
          <img src={LibName} onClick={()=>{navigate('/')}} className="LibName" alt="" />
          </div>

          {/* Login input */}
          <div className="inputs"> 
            <div className="input">
              <img src={login_icon} className="login_icon" alt="" />
              <input type="email" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input">
              <img src={password_icon} className="login_icon" alt="" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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

