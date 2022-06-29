import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductList from "../components/ProductList";
import { listOfNews, listOfProduct } from '../redux/actions/product.actions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import TopProductsCarousel from '../components/TopProductsCarousel';
import { useLocation } from "react-router";
import Slider from "../components/Slider";
import SwiperCore, { Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import News from "./News";
import '../styles/Slider.product.css'
import SliderBrand from "../components/Slider-brands";

SwiperCore.use([Autoplay,Keyboard, Pagination, Navigation]);


const Home = ({ match }) => {

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const localhost = useLocation()

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, page, pages, error } = productList;

    const newsList = useSelector(state => state.newsList);
    const { news } = newsList;

    useEffect(() => {
        dispatch(listOfNews());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listOfProduct(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);
    

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
      

    return (
        <>

            {!keyword ? (
                <>
                <Slider/>
                <h3 className="Heading" >Бренды</h3>
                <SliderBrand/>
                <h3 className="Heading" >Лучшие товары</h3>
                <TopProductsCarousel />
                  
                </>
            ) : <>
                </>}
            {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                <h3 className="Heading" >Ассортимент товаров</h3>
                <Swiper 
                    slidesPerView={width <570 ? 1 :width < 830 ? 2 :width < 1100 ? 3 :width < 1400 ? 4 :5} 
                    spaceBetween={30} 
                    pagination={{
                        "clickable": true
                    }} 
                    className="SwiperProducts"
                    navigation={true}>
                        {products.map((product) => 
                            <SwiperSlide key={product._id}>
                                <ProductList product={product} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <h3 className="Heading" >Новости</h3>
                    <News/>
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A201d0bc19d5961195472627a07a573ce93db9aef0f7837b36581922f3a30bf11&amp;source=constructor" style={{marginTop: 50}} width="100%" height="550"></iframe>
                </>
            )}
        </>
    )
}

export default Home;
