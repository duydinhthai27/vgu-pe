import React from 'react'
import './Contact.css'
import logoimage from '../../Assets/Library name.png';
const Contact = () => {
  return (
    <div className="contact">
        <h2>VIETNAMESE-GERMAN UNIVERSITY LIBRARY</h2>
        <p>Ring road 4, Quarter 4, Thoi Hoa Ward, Ben Cat Town, Binh Duong Province </p>
        <h4>Tel. (0274) 222 0990 - 70206</h4>
        <h5>Copyright @2021 by VGU Library</h5>
        <h3>Passion for knowledge, passion for lifelong learning</h3>
        <img src={logoimage} alt="" />
    </div>
  )
}

export default Contact