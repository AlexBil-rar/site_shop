import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import SwiperCore, { Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import { Figure } from "bootstrap-4-react";
import Loader from '../components/Loader';
import Message from '../components/Message';
import 'swiper/swiper.scss';
import '../styles/slider.css'
import { listOfSlider } from "../redux/actions/product.actions";

SwiperCore.use([Autoplay,Keyboard, Pagination, Navigation]);

const Slider = () => {

  const dispatch = useDispatch();

  const sliderList = useSelector(state => state.sliderList);
  const { loading, slider, error  } = sliderList;

  
  useEffect(() => {
    dispatch(listOfSlider());
}, [dispatch]);

    
    return (
        <>
        {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
        <Swiper 
        className="Swiper"
        autoplay={{ 
            "delay": 7000,
            disableOnInteraction: false
        }}
        >
          
        {slider.map((slider) => 
          <SwiperSlide key={slider._id}>
              <Figure.Image src={`${slider.image}`}></Figure.Image>
          </SwiperSlide>
        )}
    </Swiper> )}
    </>
    );
  }
  
export default Slider