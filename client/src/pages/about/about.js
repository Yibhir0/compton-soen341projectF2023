/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { STUDENTS } from "../../globals/names";
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material'
import './about.css'
/*This is the about page of the site
This would contain information behind the creation
of the site such as the those who created it
*/

function About(props) {



  const [students] = useState(STUDENTS);
//   return (
//     <div>
// <Carousel>
//       {/* Test idea, subject to change.. */}
//       <div className='about-card-container'> 
//       <span style={{ color: "white" }}>
//       <br></br>
      
//       <div> The Compton Real Estate company is a student project</div>
//       <div> At Concordia University for the Fall 2023 SOEN341 Course  </div>
//       <div> The Goal of the project was to create a real estate web app designed to help users buy, rent and sell residential properties.  </div>
//       <br></br>
//       <br></br>
//       <br></br>
      




//           <div>This project is implemented by:</div>

//           <ul>

//             {students.map((student, index) => (<li key={index}> {student}  </li>))}

//           </ul>
//           </span>
//          </div>
//          </Carousel>
//          </div>
//   )


var ABOUTPAGE = [
  {
      Head1: "Comptant Real Estate Company",
      Head2: "The Compton Real Estate company is a student project \n At Concordia University for the Fall 2023 SOEN341 Course",
      Head3: "The Goal of the project was to create a real estate web app designed to help users buy, rent and sell residential properties."
      
  },
  
  {
    Head1: "Dominic Riccio ",
    Head2: " Fullstack DEV",
    Head3: "Electrical Engineering Student"
  },
  {
    Head1: "Saoud Messaoudi ",
    Head2: "Scrum master",
    Head3: "Software Engineering Student"
  },
  {
    Head1: "Steven Di Stefano ",
    Head2: "Backend DEV",
    Head3: "Software Engineering Student"
  },
  {
    Head1: "Jared Latchman ",
    Head2: "Front-end DEV",
    Head3: "Computer Engineering Student"
  },
  {
    Head1: "Michael Iadisernia ",
    Head2: "Front-end DEV",
    Head3: "Computer Engineering Student"
  },
  {
    Head1: "Yassine Ibhir ",
    Head2: "Fullstack DEV",
    Head3: "Software Engineering Student"
  },
]

    // var items = [
    //     {
    //         name: "Random Name #1",
    //         description: "Probably the most random thing you have ever seen!"
    //     },
    //     {
    //         name: "Random Name #2",
    //         description: "Hello World!"
    //     }
    // ]

    return (
      // <div className='about-card-container'> 
      // <span style={{ color: "white" }}>
        <Carousel>
            {

              
              //  items.map( (item, i) => <Item key={i} item={item} /> )
               // students.map( (student, i) => <Item key={i} student={student}  />)
               ABOUTPAGE.map( (slide, i) => <Item key={i} slide={slide} /> )


             //  students.map((student, index) => (<li key={index}> {student}  </li>))
            }
        </Carousel>
        // </span>
        // </div>
    )
}

function Item(props)
{
    return (
        <Paper>
<div className='about-card-container'> 
      <span style={{ color: "white" }}>


           {/* <h2>{props.item.name}</h2>
            
            <p>{props.item.description}</p>  */}

            {/* <h1 className='property-header'>{props.student}

            </h1>
            <h2>{props.student}</h2>

            
            <p>{props.student}</p>  */}

          <h1 className='property-header'>{props.slide.Head1}

          </h1>
          <h2>{props.slide.Head2}</h2>


          <p>{props.slide.Head3}</p> 




            </span>
            </div>

          
            
        </Paper>
    )




}

export default About;