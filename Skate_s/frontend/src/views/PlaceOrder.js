import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Figure, Button } from 'bootstrap-4-react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { getUserProfile} from "../redux/actions/user.actions";
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../redux/actions/order.actions';

const PlaceOrder = ({ history }) => {
    const [totalBuy, setTotal] = useState("");
    const cart = useSelector(state => state.cart);
    const userProfile = useSelector(state => state.userProfile);
    const { userDetails } = userProfile;;

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    };
    
    cart.shippingPrice = 200


    cart.productsPrice = addDecimal(cart.cartProductItems
        .reduce((acc, item) => acc + item.price * item.quantity ,
        0)
    );

    cart.shippingPrice = addDecimal(cart.productsPrice > 3000 ? 0 : 30);
    cart.totalPrice = addDecimal(Number(cart.productsPrice) 
        + Number(cart.shippingPrice) 
    );

    const Total = (() => {
        let sale = 0
      if (totalBuy >= 25000) {
        sale = sale + 5
      } else if (totalBuy >= 20000) {
        sale = sale + 4
      } else if (totalBuy >= 15000) {
        sale = sale + 3
      } else if (totalBuy >= 10000) {
        sale = sale + 2
      } else if (totalBuy >= 5000) {
        sale = sale + 1
      }
      return(sale)
  })
  const caca = Total()


    cart.totalPrice = addDecimal(Number(cart.totalPrice) 
        - Number(caca * cart.totalPrice / 100) 
    );
    
    const dispatch = useDispatch();

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        dispatch(getUserProfile('profile'));
        setTotal(userDetails.totalBuy)
        if (success) {
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [dispatch, history, success, userDetails])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartProductItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            productsPrice: cart.productsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            totalBuy: cart.totalBuy
        }));
    };

    const LinkToProductDetails = {
        color: 'navy',
        textDecoration: 'none'
    };

    return (
        <>
            <CheckoutSteps step1="done" step2="done" step3="done" step4="active" />
            <Row>
                <Col md={8}>
                    <ListGroup flush>
                        <ListGroup.Item>
                            <h2>Доставка</h2>
                            <p>
                                <strong>Адрес:{' '}</strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.country},{' '}
                                {cart.shippingAddress.phone},{' '}
                                {cart.shippingAddress.impr}{' '}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 style={{ padding: '1rem 0' }}>Оплата</h2>
                            <strong>Способ:{' '}</strong>
                            Перевод между карт
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Заказ</h2>
                            {cart.cartProductItems.length === 0 ? (
                                <Message>Ваша корзина пуста</Message>
                            ) : (
                                <ListGroup flush>
                                    {cart.cartProductItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Figure.Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link 
                                                        style={LinkToProductDetails} 
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} * {item.price}₽ ={' '}
                                                    {item.quantity * item.price}₽
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup flush>
                            <ListGroup.Item>
                                <h4>Суммарный заказ</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Товары</Col>
                                    <Col>{cart.productsPrice}₽</Col>            
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Доставка</Col>
                                    <Col>{cart.shippingPrice}₽</Col>            
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Итого</strong></Col>
                                    <Col><strong>{cart.totalPrice}₽</strong></Col>            
                                </Row>   
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message cariant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    type="button"
                                    className="btn-block"
                                    dark
                                    disabled={cart.cartProductItems === 0}
                                    onClick={placeOrderHandler}
                                >Отправить
                                </Button> 
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrder;
