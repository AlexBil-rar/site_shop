import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Figure, Button } from "bootstrap-4-react";
import { detailsOfProduct } from "../redux/actions/product.actions";
import Rating from "../components/Rating";
import Reviews from "../components/Reviews";
import MetaHeader from '../components/MetaHeader';
import { genEndOfNoun } from "../filters/GenEndOfNoun";
import '../styles/PList.css'

const ProductDetail = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const productId = match.params.id;
  
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;


  useEffect(() => {
    dispatch(detailsOfProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3 text-capitalize" to="/">
        <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
        Назад
      </Link>
      {loading ? (
        <p>Загрузка...</p>
      ): (
        <>
          <MetaHeader title={product.name} />
          <Row>
            <Col md={5}>
              <Figure.Image className="image-detal" src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup flush>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                </ListGroup.Item>
                <ListGroup.Item className="d-inline-flex">
                  <Rating value={product.rating} />
                  {product.numReviews == 0 ? (
                    <span className="ReviewsCount">нет отзывов</span>
                  ) : (
                    <span className="ReviewsCount">{product.numReviews} {genEndOfNoun(product.numReviews, "отзыв", "отзыва", "отзывов")}</span>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>Описание: {product.description}</ListGroup.Item>
                <p className="free_dev">При покубке на сумму в 3000₽ достовка бесплатная</p>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup flush>
                <ListGroup.Item>
                  <Row>
                    <Col>Цена:</Col>
                    <Col>
                      <strong>{product.price} ₽</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Статус:</Col>
                    <Col>
                      {product.countInStock > 0 ? "В наличии" : "Отсутствует"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      dark
                      type="button" /* 
                      disabled = {product.countInStock === 0} */
                    >
                      Добавить в корзину
                    </Button>
                  )}
                  <ListGroup.Item>
                  </ListGroup.Item>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Reviews productId={productId} product={product} />           
          
        </>
      )}
    </>
  );
};

export default ProductDetail;
