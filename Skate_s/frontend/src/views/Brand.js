import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col } from 'bootstrap-4-react';
import styled from 'styled-components';
import ProductList from "../components/ProductList";
import { listOfProductsByBrand } from "../redux/actions/product.actions";
import '../styles/Slider.product.css'

const Brand = ({match}) => {

    const id = match.params.id;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(listOfProductsByBrand(id, pageNumber));
    }, [dispatch, id, pageNumber]);


    return(
        <>

            {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                <h3 className="Heading">Ассортимент товаров</h3>
                    <Row>
                        {products.map((product) => 
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductList product={product} />
                            </Col>
                        )}
                    </Row>

                </>
            )}
        </>
    )

}

export default Brand