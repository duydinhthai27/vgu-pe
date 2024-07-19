import React from 'react'
import Header from './Main Page/Header/Header.jsx'
import Final from './Main Page/PageEnd/Final.jsx'
import Contact from './Main Page/PageEnd/Contact.jsx'
const template = () => {
    return (
        <div>
            {/* This is the template page of project */}
            {/* 
            Here is how to set up path in App.js
            <Route path='/login' element={<LoginSignUp></LoginSignUp>}/> */}
            {/* 
            Here is how to set up path in the file you need to navigate
             const navigate = useNavigate();
            return (
                <div className="header">
                <img src={LibName} onClick={()=>{navigate('/')}} className="LibName" alt="" />
                </div> 
            )*/}
            
          <Header></Header>
          {/* remember to delete space when you add all of your div */}
         <div className="space"
                style={{ height: '600px', width: '100%' }}>
            
            </div>       
      

            <Final></Final>
            <Contact></Contact>
        </div>
      )
}

export default template