import React from "react";
import { Col, Button, Table } from "bootstrap-4-react";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { DateFilter } from "../filters/DateTimeFilter.js";
import "../styles/app.css"

const MyOrderList = ({ loadingOrders, errorOrders, orders }) => {

    return (
        <Col md={9}>
            <h2 style={{ padding: '1rem 0' }}>Мои заказы</h2>
            {loadingOrders ? <Loader /> : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
            ) : (
                <Table className="table-sm" striped bordered hover responsive>
                    <thead>
                        <tr className="text-center">

                            <th>Дата</th>
                            <th>Статус оплаты</th>
                            <th>Статус доставки</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr className="text-center" key={order._id}>
                                <td>{DateFilter(order.createdAt)}</td>
                                <td>
                                    {order.isPaid ? (
                                        <>
                                            <i className="fas fa-check TickIcon"></i><br />
                                            {/* <span>{order.paidAt.substring(0, 10)}</span> */}
                                            <span>{DateFilter(order.paidAt)}</span>
                                        </>
                                    ) : (
                                        <i  className="fas fa-times DaggerIcon"></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <>
                                            <i  className="fas fa-check TickIcon"></i><br />
                                            <span>{DateFilter(order.deliveredAt)}</span>
                                        </>
                                    ) : (
                                        <i className="fas fa-times DaggerIcon" style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button type="button" dark className="btn-sm" variant="light">Подробнее</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    );
};

export default MyOrderList;
