import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button } from "bootstrap-4-react";

import { createReview, removeReview } from "../redux/actions/review.actions";
import { REVIEW_CREATE_RESET } from "../redux/constants/review.constants";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import { detailsOfProduct } from "../redux/actions/product.actions";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { Form } from "react-bootstrap";

const Reviews = ({ productId, product }) => {

    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

/*     const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails; */

    const reviewCreate = useSelector((state) => state.reviewCreate);
    const { error: errorCreatingReview, success: successCreatingReview } = reviewCreate;

    const reviewRemove = useSelector((state) => state.reviewRemove);
    const { error: errorRemovingReview, success: successRemovingReview } = reviewRemove;
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (successCreatingReview) {
            setRating(0);
            setComment("");
            dispatch({ type: REVIEW_CREATE_RESET });
        }
        dispatch(detailsOfProduct(productId));
    }, [dispatch, successCreatingReview, successRemovingReview, productId])

    const submitReviewCreateHandler = (e) => {
        e.preventDefault();
        dispatch(createReview(productId, {
            rating,
            comment
        }));
    };

    const submitReviewDeleteHandler = (productId, reviewId) => {
        dispatch(removeReview(productId, reviewId));
    };

    return (
        <Row style={{ marginTop: '2rem' }}>
            <Col md={9}>
              <h4 style={{ padding: '1rem 0' }}>?????????????????????? {product.reviews.length === 0 ? '' : '(' + product.reviews.length + ')'}</h4>
              {successCreatingReview && (
                <Message variant="success">???????????????????? ???? ?????? ??????????</Message>
              )}
              {errorCreatingReview && (
                <Message variant="danger">{errorCreatingReview}</Message>
              )}
              {successRemovingReview && (
                <Message variant="success">?????????????????????? ????????????</Message>
              )}
              {errorRemovingReview && (
                <Message variant="danger">{errorRemovingReview}</Message>
              )}
              {product.reviews.length === 0 && <Message>?????? ????????????????????????</Message>}
              <ListGroup flush>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id} style={{ backgroundColor: '#fafafa' }}>
                    <strong>{review.name}{'     '}</strong>
                    {userInfo && userInfo.isAdmin && (
                        <i 
                          className="fas fa-times" 
                          onClick={() => submitReviewDeleteHandler(productId, review._id)}
                          style={{ cursor: 'pointer', color: 'red' }}
                        ></i>
                    )}
                    <Rating value={review.rating} />
                    <small>{DateTimeFilter(review.createdAt)}</small>
                    <p style={{ marginTop: '1rem' }}>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5>???????????????? ??????????</h5>
                  {userInfo ? ( 
                    <Form onSubmit={submitReviewCreateHandler}>
                        <Form.Group controlId="rating">
                            <Form.Label>?????????????? ?????? ???????????? ???????????????? ????????????</Form.Label>
                            <Form.Control 
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <option value="">???????????????? ????????????...</option>
                                <option value="1">?????????? ??????????</option>
                                <option value="2">??????????</option>
                                <option value="3">??????????????????????????????????</option>
                                <option value="4">????????????</option>
                                <option value="5">??????????????</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                            <Form.Label>??????????????????????</Form.Label>
                            <Form.Control
                                as="textarea"
                                row="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >??????????????????????</Form.Control>
                        </Form.Group>
                        <Button type="submit" dark variant="light">??????????????????</Button>
                    </Form>
                  ) : (
                    <Message>
                      ????????????????????, <Link to="/login">??????????????????????????????</Link> ?????? ???????????????????????? ????????????
                      {' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
        </Row>
    );
};

export default Reviews;
