

import React, { } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material'
import './about.css'
/*This is the about page of the site
This would contain information behind the creation
of the site such as the those who created it
*/

function About() {

  var ABOUTPAGE = [
    {

      Head0: "About Us",
      Head1: "Compton Real Estate Company",
      Head2: "The Compton Real Estate company is a Concordia University student project ",
      Head4: "The Goal of the project was to create a real estate web app designed to help users buy, rent and sell residential properties."

    },

    {
      Head0: "Contributors",
      Head1: "Dominic Riccio- 40125922",
      Head2: " Fullstack DEV",
      Head3: "Electrical Engineering Student"
    },
    {
      Head0: "Contributors",
      Head1: "Saoud Messaoudi- 40208399",
      Head2: "Scrum master",
      Head3: "Software Engineering Student"
    },
    {
      Head0: "Contributors",
      Head1: "Steven Di Stefano- 40175474",
      Head2: "Backend DEV",
      Head3: "Software Engineering Student"
    },
    {
      Head0: "Contributors",
      Head1: "Jared Latchman- 40214398 ",
      Head2: "Front-end DEV",
      Head3: "Computer Engineering Student"
    },
    {
      Head0: "Contributors",
      Head1: "Michael Iadisernia- 40212429",
      Head2: "Front-end DEV",
      Head3: "Computer Engineering Student"
    },
    {
      Head0: "Contributors",
      Head1: "Yassine Ibhir- 40251116",
      Head2: "Fullstack DEV",
      Head3: "Software Engineering Student"
    },
  ]


  return (

    <Carousel>
      {



        ABOUTPAGE.map((slide, i) => <Item key={i} slide={slide} />)
      }
    </Carousel>
  )
}

function Item(props) {
  return (
    <Paper>
      <div className='about-card-container d-flex align-items-center justify-content-center text-center'>



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