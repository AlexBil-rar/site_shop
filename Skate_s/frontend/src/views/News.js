import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { listOfNews } from "../redux/actions/product.actions";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import '../styles/Header.css'

const News = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
      
    const dispatch = useDispatch();

    const newsList = useSelector(state => state.newsList);
    const { loading, news, error } = newsList;

    useEffect(() => {
        dispatch(listOfNews());
    }, [dispatch]);


    return(
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
                <>

                    <Swiper 
                slidesPerView={width < 700 ? 1 :width < 1000 ? 2 :width < 1250 ? 3:4} spaceBetween={30} pagination={{
                    "clickable": true
                  }} className="SwiperProducts"
                  navigation={true}
                    >
                        {news.map((news) => 
                         <SwiperSlide key={news}>
                           
                                    <Card className="my-3 p-3 rounded d-flex align-center">
                                        <Card.Img src={news.image} variant="top" />

                                    <Card.Body className="p-0">
                                            <Card.Title as="div">
                                                <strong className="ProductName">
                                                    {news.name.length > 25 ?
                                                        `${news.name.substring(0, 25)}...` : news.name
                                                    }
                                                </strong>
                                            </Card.Title>

                                            <strong className="Productdesc">
                                        {news.description.length > 220 ?
                                            `${news.description.substring(0, 220)}...` : news.description
                                        }
                                        </strong >
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                        )}

                    </Swiper>

                </>
            )}
        </div>
        
    )
} 

export default News