import React, {useRef, useState, useEffect } from 'react'
import './Header.css'
import logoM from '../../Assets/logo for header.png';
import menu_icon from '../../Assets/menu_icon.png';
import { Link } from 'react-scroll';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
const Header = () => {
  const [date, setDate] = useState(null);
  const [role, setUser] = useState('');
  const op = useRef(null);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const buttonEl = useRef(null);
  
  // Initialize state using useState hook
  
  // Add other state variables as needed, following the pattern above

  // Handlers for showing/hiding the sidebar or other components
  const handleShowSidebar = () => setVisible(true);
  const handleHideSidebar = () => setVisible(false);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    fetch("http://localhost:6868/api/user/info", {
      headers: {
        'x-access-token': accessToken
      }
    })
    .then(response => response.json())
    .then(data => setUser(data.role))
    .catch(error => console.error('Error fetching user:', error));
  }, []);


 

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const userData = await getUserData(accessToken);
          setUserName(userData.username);
        }
      } catch (error) {
        setUserName('Guest');
      }
    };
    fetchUserData();
  }, []);
  const getUserData = async (accessToken) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:6868/api/user/info', {
        headers: {
          'x-access-token': accessToken
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  const handleLogout = () => {
    // Clear the user name from the state
    setUserName('');
    // Remove the access token from local storage
    localStorage.removeItem('x-access-token');
    // Navigate to the login page
    navigate('/login');
  };
  const handleDashboard = () => {
    navigate('/admin');
  };
  const handleBookDeliveryClick = () => {
    window.location.href = 'http://forum.mythosmysterium.benasin.space:3000/';
  };
  const handleChatClick = () => {
    window.location.href = 'http://chat.mythosmysterium.benasin.space:3001/login';
  };
  const [mobileMenu, setmobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu? setmobileMenu(false) : setmobileMenu(true);
  }
  return (
    <div className="container">
      <nav className='xdd'>
      <img src={logoM} onClick={()=>{navigate('/')}} alt="" className='logo'/>
      <ul className={mobileMenu?'':'hide-mobile-menu'}>

        <li><Link to="container" offset={0} onClick={()=>{navigate('/')}} smooth ={true} duration = {500}>Home</Link></li>
        <li onClick={()=>{navigate('/regulation')}}>Regulations</li>
        <li onClick={()=>{navigate('/browsebook')}}>Search Book</li>
        <li onClick={()=>{navigate('/roombooking')}}>Room Booking</li>
        <li><Link to="Delivery" offset={-50} smooth ={true} duration = {500} onClick={handleBookDeliveryClick}>Social Forum</Link></li>
        <li onClick={handleChatClick}>Chat&Chit</li>
          {userName ? (
            <li>
              
              <button onClick={handleShowSidebar} className='btn1'>{userName}</button>
              <Sidebar visible={visible} position="right" onHide={handleHideSidebar}>
                  <div className="username">
                      <p>{userName}</p>
                  </div>
                  <div className="function">
                    <Button onClick={() => { navigate('/profile') }} label="Profile" className="p-button-text" />
                    {role=='admin' && (
    <Button onClick={handleDashboard} label="Dashboard" className="p-button-danger p-button-text" />
  )}
                
                    <Button onClick={handleLogout} label="Log out" className="p-button-danger p-button-text" />

                    
                  </div>
              </Sidebar>
            </li>
          ) : (
            <li>
              <button onClick={() => { navigate('/login') }} className='btn1'>Sign in</button>
              
              
            </li>
          )}
      </ul>
      <img src={menu_icon} className="menuicon" onClick={toggleMenu} alt="" />
    </nav>
    </div>
    
  )
}

export default Header
