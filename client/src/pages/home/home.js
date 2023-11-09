import React from 'react';
import { Box } from '@mui/material';
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

/*This is home page  of the site.
This would be the default page that would
appear upon logining in or accessing the site
*/
function Home() {
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
            <p className="label-subtext">Find your next home with us.</p>
          </div>
          <div className="searchProperty"></div>
          <div className="recentlyViewedListings">
            <p className="recentlyViewedText">Recently Viewed</p>
          </div>
          <div className="recent-listings">
            <Swiper slides-per-view={3} spaceBetween={30} navigation={true} freeMode={true} modules={[Navigation, FreeMode]} className="mySwiper">

              <SwiperSlide>
                <div className="recentproperty-card">
                  <Box sx={{ height: 400, width: 325, border: '1px dashed' }}></Box>
                  <div className="recentproperty-card header">
                  </div>
                  <p>Slide 1</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="recentproperty-card">
                  <Box sx={{ height: 400, width: 325, border: '1px dashed' }}></Box>
                  <div className="recentproperty-card header">
                  </div>
                  <p>Slide 2</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="recentproperty-card">
                  <Box sx={{ height: 400, width: 325, border: '1px dashed' }}></Box>
                  <div className="recentproperty-card header">
                  </div>
                  <p>Slide 3</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="recentproperty-card">
                  <Box sx={{ height: 400, width: 325, border: '1px dashed' }}></Box>
                  <div className="recentproperty-card header">
                  </div>
                  <p>Slide 4</p>
                </div>
              </SwiperSlide>

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