import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import SwiperCore, { Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import Loader from '../components/Loader';
import Message from '../components/Message';
import {  listOfBrand } from '../redux/actions/product.actions';
import 'swiper/swiper.scss';
import '../styles/slider.css'

SwiperCore.use([Autoplay,Keyboard, Pagination, Navigation]);

const SliderBrand = () => {

  const dispatch = useDispatch();

  const brandsList = useSelector(state => state.brandsList);
  const { loading, brand, error } = brandsList;

  useEffect(() => {
    dispatch(listOfBrand());
}, [dispatch]);

const [width, setWidth] = useState(window.innerWidth);
const updateDimensions = () => {
    setWidth(window.innerWidth);
}
useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
}, []);


    return (
        <>
        {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
                <Swiper 
                slidesPerView={width < 480 ? 2 :width < 830 ? 4 : width < 1100 ? 6 : 7} 
                spaceBetween={20} 
                pagination={{
                    "clickable": true
                }} 
                className="Brend-swiper"
            >
            {brand.map((b) =>
                <SwiperSlide key={b._id}>
                    <a href={`/brand/${b._id}`}>
                      <img className="img_brand" src={b.img}/>
                    </a>
                    
                </SwiperSlide>
                )}

            </Swiper>)}
    </>
    );
  }
  
export default SliderBrand