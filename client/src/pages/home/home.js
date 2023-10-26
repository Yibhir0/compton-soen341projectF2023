import React from 'react';
import  { Box } from '@mui/material';
import './home.css';

function Home()  {
  console.log("home");
  return (
    <div className="home-page">
              
      <div className="mainContent">                   
        <div className="window-1">
                        <div className="background">
                          <Box component="img"
                              sx={{
                                height: 982,
                                width: 1440,

                              }}
                            alt="Background House"
                        src={require("../../assets/images/landingpage_background.jpg")}>
                          </Box>
                        </div>

                      <div className="label">
          
                          <p className="label-welcome">Welcome to Compton Real Estate</p>
                          <p className="label-subtext">In oculis quidem se esse admonere interesse enim maxime placeat, facere possimus, omnis. Et quidem faciunt, ut
                          labore et accurate disserendum et harum quidem exercitus quid.</p>
                        
                      </div>
        </div>  
      </div>                
    </div>
  )
}

export default Home;