import React from 'react'
import Templatexdd from '../template for some page/templatexdd.jsx'
import Header from '../Main Page/Header/Header.jsx'
import Final from '../Main Page/PageEnd/Final.jsx'
import Contact from '../Main Page/PageEnd/Contact.jsx'
import './regulation.css'
const regulation = () => {
  return (
    <div>
      <Header></Header>
      <Templatexdd title="Regulations" img={"https://library.vgu.edu.vn/wp-content/uploads/2021/04/Library-regulations-2048x1365.jpg"}
                   overviewtitle="Mythos Mysterium Regulations" 
                   overview="In order to effectively manage library operations, and to enable open knowledge sharing and fair access to library materials, the Presidential Board has issued “Library Regulations” and “Policies of Anti-Plagiarism” for your reference. Please abide by these regulations."
                   imgProps={{
                    alt: "Library Image",
                    // style: { width: '100px', height: 'auto' },
                    className: 'custom-img-class'
                  }}
      >     
                  
      </Templatexdd>
      <div className="LibraryRegulation">
          <h2>Library Regulation</h2>
          <div className="rules">
            <ol> <p>I. General Regulations</p>
              <li>Opening hours: 
                <ul>
                  <li>Mondays – Fridays: 8:30 am – 10:00 pm</li>
                  <li>Saturdays: 9:00 am – 6:00 pm.</li>
                </ul>
              </li>
              <li>Always bring your ID cards with you when using the library. Do not use other user's ones.</li>
              <li>Keep your belongings in lockers and take your valuable things with you. Return the locker key in its original position after use.</li>
              <li>Place in-house used books, newspapers and journals on the sorting shelves after reading.</li>
              <li>Circulation service: 
                <ul>
                  <li>Borrowing: 
                    <ul>
                      <li>Students and Administrative staff: 3 books/ week</li>
                      <li>PhD students and Researchers: 3 books/ 2 weeks</li>
                      <li>Lecturers and RTA: 3 books/ 3 weeks</li>
                      <li>Interns, exchange students and probationers: reading in the library and borrowing up to two books/ week</li>
                      <li>External users: reading in the library and borrowing up to two books/ week with the required bond</li>
                    </ul>
                  </li>
                  <li>Renewing: 1 week for all entitled users if the books are available</li>
                  <li>Returning & renewing: use Selfcheck machines in the library. For renewing, please renew your borrowed books online via “Sign in” button on the website.</li>                
                </ul>
              </li>
              <li>Use the library materials and facilities with care.</li>
              <li>Keep quiet, clean and order.</li>
              <li>Smoking and foods with smell should be outside the library. Soft drinks are not encouraged.</li>
              <li>Please acknowledge the copyright and intellectual property laws. You are responsible for legal issues if you make any copyright infringements.</li>          
                <p>II. PENALTY AND COMPENSATION POLICIES</p>
                <table className="table-penalty">
                  <tr>
                    <th>No.</th>
                    <th>VIOLATED ACTIONS</th>
                    <th>PENALTY</th>
                  </tr>
                  <tr>
                    <td className="first-column">1</td>
                    <td>Overdue loan</td>
                    <td><ul><li>1-14 days: a fine of VND 5,000/book/day</li>
                            <li>15 – 30 days: a fine of VND 10,000/book/day</li>
                            <li>Over 1 month: a fine of VND 10,000/book/day and deactivate the borrowing service.</li></ul></td>
                  </tr>
                  <tr>
                    <td className="first-column">2</td>
                    <td>Damage library materials</td>
                    <td><ul><li>Stop the borrowing service for 1 month if the materials can be repaired</li>
                            <li>If the materials cannot be repaired: apply No.3 from this table</li>
                            </ul></td>
                  </tr>
                  <tr>
                    <td className="first-column">3</td>
                    <td>Lost library materials</td>
                    <td><ul>Users must pay the penal fees for the library to purchase the replaced materials. Consider two cases below:
                            <ul>a. If the materials are still published, the fines include:
                              <li>Current price of the materials</li>
                              <li>Technical processing fee: VND 50,000</li>
                              <li>Shipping fee: depends on the materials</li>
                            </ul>
                            <ul>b. If the materials are no longer published, the fines include:
                              <li>Double price of the lost materials</li>
                              <li>Technical processing fee: VND 50,000</li>
                              <li>Shipping fee: depends on the replaced materials</li>
                            </ul>
                            </ul></td>
                  </tr>
                  <tr>
                    <td className="first-column">4</td>
                    <td>Lending library cards OR Borrowing library cards from other users</td>
                    <td>Stop the borrowing service for 1 month</td>
                  </tr>
                  <tr>
                    <td className="first-column">5</td>
                    <td>Take away library materials without borrowing or permission</td>
                    <td>Stop the borrowing service for 2 months</td>
                  </tr>
                  <tr>
                    <td className="first-column">6</td>
                    <td>Misuse and damage the library keys OR take the keys home without permission</td>
                    <td>Users must pay VND 50,000 to make the new locker keys</td>
                  </tr>
</table>
            </ol>
          </div>
        </div>
      <div className="space"
                style={{ height: '2450px' }}>
            
            </div>  
      <div className="bottom-container">
            <Final></Final>
            <Contact></Contact>
        </div>
        
    </div>
  )
}

export default regulation
