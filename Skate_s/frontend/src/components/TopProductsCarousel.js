import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listOfTopProduct } from '../redux/actions/product.actions';
import styled from 'styled-components';
import '../styles/app.scss'

const TopProductsCarousel = () => {
    const dispatch = useDispatch();

    const productTop = useSelector(state => state.productTop);
    const { loading, products, error } = productTop;

    useEffect(() => {
        dispatch(listOfTopProduct());
    }, [dispatch]);


    const CarouselImage = {
        height: '300px',
        padding: '40px',
        margin: '40px',
        borderRadius: '50%'
    };

    return (
        loading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error}</Message>
        ) : (
            <Carousel pause="hover" className="bg-dark">
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <div className='CarouselElement'>
                                <Image style={CarouselImage} src={product.image} alt={product.name} fluid />
                                    <Carousel.Caption className="carousel-caption">
                                        <h4 className="Carusel_P_name">{product.name.length > 40 ?
                                        `${product.name.substring(0, 40)}...` : product.name
                                        } ({`${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, `$& `)}₽`})</h4>
                                    </Carousel.Caption>
                            </div>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    );
};

export default TopProductsCarousel;