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




    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                //items.map( (item, i) => <Item key={i} item={item} /> )
                students.map((student, index) => (<li key={index}> {student}  </li>))
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )




}

export default About;