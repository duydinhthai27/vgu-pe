import React from 'react'
import Header from '../Main Page/Header/Header.jsx'
import Final from '../Main Page/PageEnd/Final.jsx'
import Contact from '../Main Page/PageEnd/Contact.jsx'
import libraryimg from '../Assets/fantasy library.png'
import './templatexdd.css'
const templatexdd = ({title, img, overviewtitle, overview, imgProps = {}}) => {
  return (
    <div  >
        
        <div className="template">
            <div className="libimg">
            <img src={libraryimg} alt="lib.img" />
        </div>
        <div className="titlexdd">
            <p>{title}</p>
        </div>
        <div className="Overview">
          <p>{overviewtitle}</p>
          <h1>{overview}</h1>
          <img src={img} alt={imgProps.alt || ''} {...imgProps} />
        </div>
        
        </div>
      
          {/* remember to delete space when you add all of your div */}
        
    
      

          
    </div>
  )
}

export default templatexdd
