import React from 'react';
import  { Box } from '@mui/material';
import NavBar from "../../components/menu/navigationBar"
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


import FilterSearch from '../../components/form/filterSearch';

function Home()  {
  console.log("home");
  return (
    
    <div className="home-page">
                         <div>
                          <NavBar/>
                          </div>
                          
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
                          <p className="label-subtext">Find your next home with us.</p>
                      </div>

                      <div className="searchbar-container">
                          <div className="searchbar">
                            <FilterSearch/>
                          </div>
                      </div>        

                      <div className="searchProperty"></div> 
                      <div className="recentlyViewedListings">
                        <p className="recentlyViewedText">Recently Viewed</p>
                      </div>       
                              <div className="recent-listings">
                              <Swiper  slides-per-view="3" spaceBetween={30} navigation={true} modules={[Navigation]} className="mySwiper">

                                        <SwiperSlide>
                                           <div className="recentproperty-card">
                                              <Box sx={{height: 400, width: 325, border: '1px dashed'}}></Box> 
                                                <div className="recentproperty-card header">
      

                                                </div>
                                              
                                             
                                              <p>Slide 1</p>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>Slide 2</SwiperSlide>
                                        <SwiperSlide>Slide 3</SwiperSlide>
                                        <SwiperSlide>Slide 4</SwiperSlide>
                                        
                                        <swiper-navigation>
                                          <swiper-button-prev></swiper-button-prev>
                                          <swiper-button-next></swiper-button-next>
                                        </swiper-navigation>

                              </Swiper>

                              </div>
                                                        

                         
        </div>  
      </div>                
    </div>
  )
}

export default Home;