import React, { Component } from "react";
import { BrowserRouter, Switch, Routes, Route,  Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginSignUp from './components/Login/LoginSignUp.jsx'
import Register from './components/Register/Register.jsx'
import Header from './components/Main Page/Header/Header.jsx'
import Card from './components/Main Page/Carousel/Card.jsx'
import Carousel from './components/Main Page/Carousel/Carousel.jsx'
import Search from './components/Main Page/Search bar/Search.jsx'
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Home from './components/Main Page/Home.jsx'
import RentBook from './components/RentBook/Rentbook.jsx'
// import Template from './components/template.jsx'
import Admin from './components/Admin/Admin.jsx'
import BookChart from './components/Admin/Dashboard/BookChart.jsx'
import ManageBook from './components/Admin/BookManagement/ManageBook.jsx'
import Template from './components/template for some page/templatexdd.jsx'
import Regulations from './components/Regulations/regulation.jsx'


import Repository from './components/Services1/Research Repository/research.jsx'
import Databases from './components/Services1/Database/Database.jsx'
import Ebooks from './components/Services1/Ebooks/Ebooks.jsx'
import Newspapers from './components/Services1/Newspaper/Newspaper.jsx'
import Ethesis from './components/Services1/Ethesis/Ethesis.jsx'
import Exchange from './components/Services1/ExchangeCorner/Exchange.jsx'

import Print from './components/Services2/Print/Print.jsx'
import Bookdelivery from './components/Services2/BookDelivery/BookDeliver.jsx'
import InterLibrary from './components/Services2/InterLibrary/InterLibrary.jsx'
import Skill from './components/Services2/SkillTraining/SkillTraining.jsx'
import BRRH from './components/Services2/BRRH/BRRH.jsx'
import RoomBooking from "./components/RoomBooking/RoomBooking.js";
import BrowseBook from "./components/BrowseBook/BrowseBook.jsx";
import UserTable from "./components/Admin/Dashboard/UserTable.jsx";
import BookTable from "./components/Admin/BookManagement/BookTable.jsx";
import UP from "./components/UserProfile/UP.js";
import UserManagement from "./components/Admin/Dashboard/UserManagement.jsx";

import GoogleSheetTable from "./components/Admin/FeedbackManagement/FeedbackTable.jsx";
import PrivateRoute from "./PrivateRoute.js";

class App extends Component {
 
  
  render() {
    
    return (
      <>
        <Routes>
            {/* Public */ }
            <Route path='/login' element={<LoginSignUp></LoginSignUp>}/>
            <Route path='/register' element={<Register></Register>}/>
            <Route path='/profile' element={<UP></UP>}/>
            <Route path='/rentbook/:bookId' element={<RentBook></RentBook>}/>
            <Route path='/browsebook' element={<BrowseBook></BrowseBook>}/>
            
            {/* <Route path='/template' element={<Template></Template>}/> */}
            {/* <Route path='/admin' element={<App2></App2>}/> */}
           
            <Route path='/admin' role = 'admin' element={ <PrivateRoute element={Admin} roles={['admin']} />}/>
            <Route path='/admin/bookchart' role = 'admin' element={ <PrivateRoute element={BookChart} roles={['admin']} />}/>
            <Route path='/admin/managebook' role = 'admin' element={ <PrivateRoute element={ManageBook} roles={['admin']} />}/>
        
            
            <Route path='/admin/managebook' element={<PrivateRoute element={ManageBook} roles={['admin']} />}/>
            <Route path='/admin/user' element={<PrivateRoute element={UserTable} roles={['admin']} />}/>
            <Route path='/template' element={<PrivateRoute element={Template} roles={['admin']} />}/>
            <Route path='/admin/book' element={<PrivateRoute element={BookTable} roles={['admin']} />}/>
            <Route path='/admin/managebook' element={<PrivateRoute element={ManageBook} roles={['admin']} />}/>
            <Route path='/admin/user-management' element={<PrivateRoute element={UserManagement} roles={['admin']} />}/>
            
            

     
            {/* Regulations */}
            <Route path='/regulation' element={<Regulations></Regulations>}/>
            {/* Services 1 */}
            <Route path='/databases' element={<Databases></Databases>}/>
            <Route path='/ebooks' element={<Ebooks></Ebooks>}/>
            <Route path='/newspapers' element={<Newspapers></Newspapers>}/>
            <Route path='/repository' element={<Repository></Repository>}/>
            <Route path='/ethesis' element={<Ethesis></Ethesis>}/>
            <Route path='/exchanger-corner' element={<Exchange></Exchange>}/>

            {/* Services 2 */}
            <Route path='/print-copy' element={<Print></Print>}/>
            <Route path='/bookdelivery' element={<Bookdelivery></Bookdelivery>}/>
            <Route path='/interlibrary' element={<InterLibrary></InterLibrary>}/>
            <Route path='/skilltraining' element={<Skill></Skill>}/>
            <Route path='/borrow-renew-return-hold' element={<BRRH></BRRH>}/>
            <Route path='/roombooking' element={<RoomBooking></RoomBooking>}/>
            <Route path='/feedback' element={<GoogleSheetTable></GoogleSheetTable>}/>
            
            {/* Protected */ }
            
                <Route path='/' element={<Home></Home>}/>
                

           
            {/* <Route path='' element={<Missing></Missing>}/> */}


        </Routes>

    </>
    
    );
  }
}

export default App;

