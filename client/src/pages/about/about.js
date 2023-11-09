/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { STUDENTS } from "../../globals/names";
import Carousel from 'react-material-ui-carousel';

/*This is the about page of the site
This would contain information behind the creation
of the site such as the those who created it
*/

function About() {

  const [students] = useState(STUDENTS);
  return (
    <div>
<Carousel>
      {/* Test idea, subject to change.. */}
      <div className='property-card-container'> 
      <span style={{ color: "white" }}>
      <br></br>
      
      <div> The Compton Real Estate company is a student project</div>
      <div> At Concordia University for the Fall 2023 SOEN341 Course  </div>
      <div> The Goal of the project was to create a real estate web app designed to help users buy, rent and sell residential properties.  </div>
      <br></br>
      <br></br>
      <br></br>
      




          <div>This project is implemented by:</div>

          <ul>

            {students.map((student, index) => (<li key={index}> {student}  </li>))}

          </ul>
          </span>
         </div>
         </Carousel>
         </div>
  )
}

export default About;