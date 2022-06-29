import React from "react";
import { Col, ListGroup } from "bootstrap-4-react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import '../styles/app.css'

const OrderProductTable = ({ order }) => {

    const ProductName = {
        color: 'navy',
        textDecoration: 'none'
    };

    return (
        <Col md={9}>
            <ListGroup flush>
                <ListGroup.Item>
                <strong className="TitleData" >Клиент: </strong>{" "}
                {order.user.name}{" "}
                <a className="EmailAddress"
                    href={`mailto:${order.user.email}`}
                >
                    ({order.user.email})
                </a>
                <br />
                <strong className="TitleData" >Дата создания заказа:{" "}</strong>
                {DateTimeFilter(order.createdAt)}
                <br />
                <strong className="TitleData" >Адрес доставки:{" "}</strong>
                {order.shippingAddress.country},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.phone},{" "}
                {order.shippingAddress.impr},{" "}
                <br />
                <strong className="TitleData" >Способ оплаты:{" "}</strong>
                Перевод между карт
                </ListGroup.Item>
                <ListGroup.Item>
                {order.orderItems.length === 0 ? (
                    <Message>Заказ пуст</Message>
                ) : (
                    <ListGroup flush>
                        <MDBTable className="text-center" hover>
                            <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Название</th>
                                <th>Кол-во</th>
                                <th>Цена за шт.</th>
                                <th>Общая сумма</th>
                            </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                            {order.orderItems.map((item, index) => (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link
                                        style={ProductName}
                                        to={`/product/${item.product}`}
                                    >{item.name}</Link>
                                </td>
                                <td>{item.quantity}</td>
                                <td>{item.price}₽</td>
                                <td>{item.quantity * item.price}₽</td>
                                </tr>
                            ))}
                            </MDBTableBody>
                        </MDBTable>
                    </ListGroup>
                )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
};

export default OrderProductTable;
