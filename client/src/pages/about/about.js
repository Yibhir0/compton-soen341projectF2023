/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { STUDENTS } from "../../globals/names";
import NavBar from "../../components/menu/navigationBar"

function About() {

  const [students] = useState(STUDENTS);
  return (
    <div>
      <NavBar/>
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