import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Card, Container } from "react-bootstrap";
import { Row, Col } from 'bootstrap-4-react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../styles/Header.css'
import { listOfNews } from "../redux/actions/product.actions";

const BNewsList = () => {
    const dispatch = useDispatch();

    const newsList = useSelector(state => state.newsList);
    const { loading, news, error } = newsList;

    useEffect(() => {
        dispatch(listOfNews());
    }, [dispatch]);


    return (

            <div>
            {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                <div className="margin">
                <Container>
                        {news.map((news) => 
                    <Card >
                    <Card.Body >
                        <Row  m={6}>  
                            <Col key={news._id} xl={6}>
                                <Card.Img className="img-news" src={news.image} variant="top" />
                            </Col> 
                            <Col>
                            <img className="margim_logo" src={'/images/Site_logo.png'} alt="logo" />
                                <Card.Title as="div">
                                    <strong className="ProductName_new" >
                                        {news.name}
                                    </strong>
                                </Card.Title>            
                                <strong className="Productdesc" >
                                {news.description}
                                </strong>                   
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                        )}
                </Container>  
                     </div> 
                </>
            )}
            </div>
    )
}

export default BNewsList;


