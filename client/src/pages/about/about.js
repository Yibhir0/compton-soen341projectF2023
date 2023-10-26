/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { STUDENTS } from "../../globals/names";


function About() {

  const [students] = useState(STUDENTS);
  return (
    <div>
     
          <div>This project is implemented by :</div>
          <ul>
    {students.map((student, index) => (
      <li key={index}>
        {student} 
      </li>
    ))}
  </ul>
  
    </div>
  
  )
}

export default About;