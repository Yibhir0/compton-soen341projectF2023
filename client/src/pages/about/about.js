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


 
    return (
     
        <Carousel>
            {

              
             
               ABOUTPAGE.map( (slide, i) => <Item key={i} slide={slide} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
<div className='about-card-container'> 
      


             <h1 className='about-header'>{props.slide.Head0}</h1>

            <span style={{ color: "white" }}>
            <div> </div>
            <span style={{ color: "gold" }}><h2>{props.slide.Head1}</h2></span>
            

          <h4>{props.slide.Head2}</h4> 
          <h4>{props.slide.Head3}</h4> 
          <p>{props.slide.Head4}</p>




            </span>
            </div>

          
            
        </Paper>
    )




}

export default About;