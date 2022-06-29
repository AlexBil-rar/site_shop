import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, ListGroup, Button } from "bootstrap-4-react";
import axios from "axios";
import { getUserProfile } from "../redux/actions/user.actions";
import { Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { ORDER_UPDATE_STATUS_FOR_PAYING_RESET,
        ORDER_DELIVER_RESET } from '../redux/constants/order.constants'
import { getOrderDetails,
        updateStatusPayingOrder,
        updateStatusDeliveringOrder } from "../redux/actions/order.actions";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import styled from 'styled-components';
import '../styles/app.css'

const OrderProductActionsStatus = (
  { orderId, 
    order, 
    successPayingProcess,
    loadingDeliveringProcess,
    successDeliveringProcess }
  ) => {
  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const {  userDetails } = userProfile;

  useEffect(() => {
   dispatch(getUserProfile());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sdkPayPalReady, setSdkPayPalReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=RUB`;
      script.async = true;
      script.onload = () => {
        setSdkPayPalReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order  ) {
      dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkPayPalReady(true);
      }
    }
  }, [dispatch, successPayingProcess, successDeliveringProcess, orderId, order]);

  const payingActionHandler = () => {
    const payingButtons = document.getElementById("payingButtonElements");
    payingButtons.style.display === 'block' 
      ? payingButtons.style.display = 'none' 
      : payingButtons.style.display = 'block';
  }

  const successPaymentHandler = () => {
    dispatch(updateStatusPayingOrder(orderId))
  };

  const deliverHandler = () => {
    dispatch(updateStatusDeliveringOrder(order));
  };

  const StatusMessage = styled.div`
    display: flex;
    justify-content: center;
    max-width: 250px;
    padding-top: 0.9rem;

    &:last-child {
      padding-top: 0;
    }
  `;

  return (
    <>
      <Card>
        <ListGroup>
          {!order.isPaid && (
            <ListGroup.Item id="payingButtonElements" style={{ display: 'none' }}>
              <Row>
                <p className="card_pay" style={{color: 'dark'}}>Сбербанк: 5484 6200 1107 3318</p>
                <p className="card_pay">Тинькоф: 5536 9140 3584 9664</p>
                <p className="info_pay">Перед оплатой не забудте написать письмо номер вашего заказа и вашу почту.</p>
                <p className="info_pay">Письмо: {order._id} и {order.user.email}</p>
                </Row>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button 
                    dark
                    onClick={successPaymentHandler}
                  >
                  оплачено 
                  </Button>
                </div>

            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
      <StatusMessage className="text-center">
        {order.isPaid ? (
          <Message variant="success">
            Оплачено
            <br />
            {DateTimeFilter(order.paidAt)}
            <br/>
            Подождите пока админестрация проверит оплату. После чего вам отправят товар
          </Message>
        ) : (
          <Message variant="danger">Не оплачено</Message>
        )}
      </StatusMessage>
      <StatusMessage className="text-center">
        {order.isPaid &&
          (order.isDelivered ? (
            <Message variant="info">
              Отправлено
              <br />
              {DateTimeFilter(order.deliveredAt)}
            </Message>
          ) : (
            <Message variant="danger">Не отправлено</Message>
          ))}
      </StatusMessage>
      {loadingDeliveringProcess && <Loader />}
      {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
        <div className="text-center">
          <Button type="button" dark onClick={deliverHandler}>
            Отправить
          </Button>
        </div>
      )}
      {!order.isPaid &&
        <div className="text-center">
          <Button type="button" dark onClick={payingActionHandler}>
            Оплатить
          </Button>
        </div>
      }   
    </>
  );
};

export default OrderProductActionsStatus;
