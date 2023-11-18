import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
/*This is home page  of the site.
This would be the default page that would
appear upon logining in or accessing the site
*/
function Home() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let properties = JSON.parse(localStorage.getItem("properties") || "[]");

      if (properties.length === 4) {
        setRecentlyViewed(properties);
      }
      else {

        const result = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/properties`
        );
        const data = await result.json();

        localStorage.setItem("properties", JSON.stringify(data.slice(0, 4)));

        setRecentlyViewed(data.slice(0, 4));

      }

    };
    fetchData();
  }, []);

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
              {
                recentlyViewed?.map((property, index) =>
                  <SwiperSlide key={index}>
                    <div className="recentproperty-card">
                      <Box sx={{ height: 400, width: 325, border: '1px dashed' }}>

                        {property.images.length > 0 ?

                          <Link to={`/properties/${property._id}`} >

                            <img src={`https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/${property.images[0]}`} alt="Photos" />
                          </Link>
                          :

                          <Link to={`/properties/${property._id}`} >
                            <img src={require('../../assets/images/landingpage_background1.jpg')} alt="Detail" />
                          </Link>
                        }


                      </Box>
                      <div className="recentproperty-card header">
                      </div>
                      <p>{property.propertyType} : {property.price}<span style={{ color: "gold" }}> $</span></p>
                    </div>
                  </SwiperSlide>
                )
              }
              <swiper-navigation>
                <swiper-button-prev></swiper-button-prev>
                <swiper-button-next></swiper-button-next>
              </swiper-navigation>

            </Swiper>

          </div>

        </div>
      </div>
    </div >
  )
}

export default Home;