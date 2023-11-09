/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { STUDENTS } from "../../globals/names";


/*This is the about page of the site
This would contain information behind the creation
of the site such as the those who created it
*/

function About() {

  const [students] = useState(STUDENTS);
  return (
    <div>

      {/* Test idea, subject to change.. */}
      <div className='property-card-container'> 
      <span style={{ color: "white" }}>
          <div>This project is implemented by:</div>

          <ul>

            {students.map((student, index) => (<li key={index}> {student}  </li>))}

          </ul>
          </span>
         </div>
         </div>
  )
}

export default About;