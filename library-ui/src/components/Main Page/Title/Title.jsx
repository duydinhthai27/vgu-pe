import React from 'react'
import "./Title.css"
import books from '../../Assets/books.png';
import tree from '../../Assets/tree.png';
import {useNavigate} from "react-router-dom";
const Title = () => {
  const navigate = useNavigate();
  return (
    <div className="Title">
      <a href="#" className="explore" >
            <span onClick={() => { navigate('/browsebook') }}>Explore our book categories</span>
          </a>
      <div className="book">
        <img src={books} alt="" />
      </div>
      <div className="tree">
        <img src={tree} alt="" />
      </div>
      
    </div>
   
  )
}

export default Title