import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import { Row, Col } from 'bootstrap-4-react';
import ProductList from "../components/ProductList";
import { listOfProductsByCategory } from "../redux/actions/product.actions";
import "../styles/Slider.product.css"

const Category = ({match}) => {

    const id = match.params.id;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, page, pages, error } = productList;
 
    useEffect(() => {
        dispatch(listOfProductsByCategory(id, pageNumber));
    }, [dispatch, id, pageNumber]);

        useEffect(() => {
        dispatch(listOfProductsByCategory(id, pageNumber));
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
                    <Pagination 
                        pages={pages} 
                        page={page} 
                        id={id ? id : ''} 
                    />
                </>
            )}
        </>
    )

}

export default Category