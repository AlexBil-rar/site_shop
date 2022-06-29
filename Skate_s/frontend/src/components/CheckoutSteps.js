import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from 'bootstrap-4-react';
import '../styles/app.css'


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {

    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1  ? (
                    step1 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/login">
                            <Nav.Link><p className='StepLink'>Авторизация</p></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/login"
                        >
                            <Nav.Link><p className='StepLink'>Авторизация</p></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><p className='StepLink'>Авторизация</p></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    step2 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/shipping">
                            <Nav.Link><p className='StepLink'>Доставка</p></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/shipping"
                        >
                            <Nav.Link><p className='StepLink'>Доставка</p></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><p className='StepLink'>Доставка</p></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    step3 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/payment">
                            <Nav.Link><p className='StepLink'>Оплата</p></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/payment"
                        >
                            <Nav.Link><p className='StepLink'>Оплата</p></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><p className='StepLink'>Оплата</p></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    step4 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/placeorder">
                            <Nav.Link><p className='StepLink'>Заказ</p></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/placeorder"
                        >
                            <Nav.Link><p className='StepLink'>Заказ</p></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><p className='StepLink'>Заказ</p></Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
