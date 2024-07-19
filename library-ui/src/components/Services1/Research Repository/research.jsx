import React from 'react'
import Templatexdd from '../../template for some page/templatexdd.jsx'
import Header from '../../Main Page/Header/Header.jsx'
import Final from '../../Main Page/PageEnd/Final.jsx'
import Contact from '../../Main Page/PageEnd/Contact.jsx'
import './research.css'

const research = () => {
    return (
        <div>
          <Header></Header>
          <Templatexdd title="Mythos research repository" 
                       img={"https://library.vgu.edu.vn/wp-content/uploads/2021/06/dissertations-feat.jpg"}
                       overviewtitle="Mythos research repository" 
                       overview="The Vietnamese-German University (VGU) is designed as a research-oriented university with the goal to become one of the leading research universities in Vietnam and Southeast Asia, meeting international standards and setting regional benchmarks. Therefore, materials offered upon the demands for learning, teaching and research are one of the primary focuses of the University. Besides the collections of books, periodicals in print and electronic forms, the university grey literature and academic papers are actually vital to realize the university goal. This collection is not only essential to meet high demands of internal university communities, but also contributes to the research demands of wider communities. Both print and electronic versions of Theses are provided for the convenience of the users."
                       imgProps={{
                        alt: "Library Image",
                        style: { width: '60vh', height: '45vh', margin:'5vh'},
                        className: 'custom-img-class'
                      }}
          >             
          </Templatexdd>
          
          <div className="space"
                    style={{ height: '600px' }}>
                
                </div>  
          <div className="bottom-container">
                <Final></Final>
                <Contact></Contact>
            </div>
            
        </div>
      )
}

export default research
