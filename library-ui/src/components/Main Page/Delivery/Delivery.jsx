import React from 'react'
import {useNavigate} from "react-router-dom";
import './Delivery.css'
import delivery from '../../Assets/delivery.png';
import books1 from '../../Assets/books1.png';

const Delivery = () => {
    const navigate = useNavigate();
  return (
    <div className="Delivery">
        <h2>Book Delivery</h2>
        <div className="deliver">
            <img src={delivery} alt="" />
        </div>
        <div className="books1">
            <img src={books1} alt="" />
        </div>
        <p>The book delivery system on Mythos Mysterium provides customers with a seamless and efficient way to order and receive physical books</p>
        <a href="#" className="discover" >
            <span>Explore  Here</span>
        </a>
        <div className="MoreServices">
            <h2>More Services</h2>
        </div>
        
        <div className="box">
            <div className="box-image">

            </div>
            <div className="box-outside">
                <div className="box-inner">
                    <div id="text" class="word">
                        <h4>RESOURCES</h4>
                        <div className="text-center">
                        <div style={{ borderTop: "2px solid #ff9800 ", marginLeft: 15, marginRight: 15 }}></div>
                        </div>
                        
                        <div className="functions">
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span  onClick={()=>{navigate('/databases')}}>Databases - eJournals</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/ebooks')}}>Books - Ebook</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/newspapers')}}>Newspapers - Journals</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/repository')}}>VGU Research Repository</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/ethesis')}}>Ethesis</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/exchanger-corner')}}>Book exchange corner</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="box2">
            <div className="box-image">

            </div>
            <div className="box-outside">
                <div className="box-inner">
                    <div id="text" class="word">
                        <h4>SERVICES</h4>
                        <div className="text-center">
                        <div style={{ borderTop: "2px solid #ff9800 ", marginLeft: 15, marginRight: 15 }}></div>
                        </div>
                        <div className="functions">
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/print-copy')}}>Print-Copy-Scan services</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/bookdelivery')}}>Book delivery service</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span  onClick={()=>{navigate('/interlibrary')}}>InterLibrary services</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/skilltraining')}}>Information skills training</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/borrow-renew-return-hold')}}>Borrow-Renew-Return-Hold</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                           
                            <div className="Databases">
                            <a href="#" className="menu" >
                                <span onClick={()=>{navigate('/room-booking')}}>Library room booking</span>
                                <div style={{ borderTop: "0.5px solid #fff ", marginLeft: 1, marginRight: 1 }}></div>
                            </a>                           
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Delivery