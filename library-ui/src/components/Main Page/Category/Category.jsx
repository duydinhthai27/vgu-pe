import React from 'react'
import './Category.css'
import science from '../../Assets/science.png';
import fantasy from '../../Assets/fantasy.png';
import mystic from '../../Assets/mystic.png';
import adventure from '../../Assets/adventure.png';
import bookicon from '../../Assets/book icon.png';
import bookicon2 from '../../Assets/book icon2.png';
import bookicon3 from '../../Assets/book icon3.png';
import bookicon4 from '../../Assets/book icon4.png';
const Category = () => {
  return (
    <div className='categories'>
      <div className="category">
        <img src={science} alt="" />
        <div className="caption">
          <img src={bookicon4} alt="" />
          <p>Science </p>
        </div>
      </div>
      <div className="category">
        <img src={fantasy} alt="" />
        <div className="caption">
          <img src={bookicon2} alt="" />
          <p>Fantasy</p>
        </div>
      </div>
      <div className="category">
        <img src={adventure} alt="" />
        <div className="caption">
          <img src={bookicon3} alt="" />
          <p>Adventure</p>
        </div>
      </div>
      <div className="category">
        <img src={mystic} alt="" />
        <div className="caption">
          <img src={bookicon} alt="" />
          <p>Mystic</p>
        </div>
      </div>
    </div>
  )
}

export default Category
