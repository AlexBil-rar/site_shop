import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {  SLIDER_CREATE_RESET } from "../redux/constants/admin.constants";import { listOfNews, listOfSlider } from "../redux/actions/product.actions";
import { createSlider,  removeSlider } from "../redux/actions/admin.actions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Table, Modal, Button } from "bootstrap-4-react";
import styled from 'styled-components';

const AdminSlider = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const sliderList = useSelector(state => state.sliderList);
  const { loading,  slider, pages, page, error } = sliderList;

  const sliderCreate = useSelector(state => state.sliderCreate);
  const { loading: loadingCreateSlider, 
          success: successCreateSlider,
          error: errorCreateSlider} = sliderCreate;

  const sliderRemove = useSelector(state => state.sliderRemove);
  const { loading: loadingDeleteSlider, 
          success: successDeleteSlider,
          error: errorDeleteSlider} = sliderRemove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
      if (!userInfo.isAdmin) {
        history.push("/login");
      } else {
        dispatch(listOfSlider('', pageNumber));
      }
      
      if (successCreateSlider) {
        dispatch({ type: SLIDER_CREATE_RESET });
      }
    }, [dispatch, pageNumber, history, userInfo, successCreateSlider, successDeleteSlider]);

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      setUploading(true);
  
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
  
        let { data } = await axios.post("/api/upload", formData, config);
  
        setImage(data);
        localStorage.setItem("productImage", data);
        setUploading(false);
      } catch(error) {
        console.error(error);
        setUploading(false);
      }
    };

    const submitSliderAddHandler = () => {
      dispatch(createSlider({
        name, 
        image
      }));
    };

    const deleteSliderHandler = (id) => {
      if (window.confirm("Вы действительно хотите удалить пользователя?")) {
        dispatch(removeSlider(id));
      }
    };

    const Title = styled.h2`
    padding: 1rem 0;
  `;

  const PlusIcon = styled.i`
    padding-right: 0.5rem
  `;

  const LinkToNewsDetails = {
    color: 'navy',
    textDecoration: 'none'
  };

  const ModalDialog = { 
    maxWidth: '70vw' 
  };

  const CenterLayout = {
    display: 'flex',
    justifyContent: 'center'
  };



    return(
        <>
      {successDeleteSlider && <Message variant="danger">Товар удален</Message>}
      {successCreateSlider && <Message variant="success">Товар создан</Message>}
      <Row className="align-items-center">
        <Col>
          <Title>Список товаров</Title>
        </Col>
        <Col className="text-right">
          <Button 
            className="my-3" 
            data-toggle="modal" 
            data-target="#createModal" 
            light
          >
            <PlusIcon className="fas fa-plus"></PlusIcon>
            <span>Добавить</span>
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table className="table-sm" striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Название</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slider.map((slider) => (
                <tr className="text-center" key={slider._id}>
                  <td>{slider._id}</td>
                  <td>
                    <Link
                      to={`/slider/${slider._id}`}
                    >
                      {slider.name}
                    </Link>
                  </td>
                  <td>
                    <Button
                      className="btn-sm"
                      danger
                      onClick={() => deleteSliderHandler(slider._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Modal */}
          <Modal id="createModal" fade>
            <Modal.Dialog style={ModalDialog}>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Создание нового товара</Modal.Title>
                  <Modal.Close>
                    <span aria-hidden="true">&times;</span>
                  </Modal.Close>
                </Modal.Header>
                  {loadingCreateSlider || loadingDeleteSlider && <Loader />}
                  {errorCreateSlider && <Message variant="danger">{errorCreateSlider}</Message>}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <FormContainer>
                      <Form onSubmit={submitSliderAddHandler}>      
                        <Modal.Body>
                          <Form.Group>
                            <label>Название товара</label>
                            <Form.Control
                              type="name"
                              id="nameForm"
                              placeholder="Введите название товара"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                              <label>Фото товара</label>
                              <Form.Control
                                  type="text"
                                  id="photoForm"
                                  placeholder="Введите ссылку на фото"
                                  value={image}
                                  onChange={(e) => setImage(e.target.value)}
                              />
                              <Form.File 
                                id="image-file"
                                label="Выберите файл"
                                custom
                                onChange={uploadFileHandler}
                              />
                              {uploading && <Loader />}
                          </Form.Group>
                          <Row 
                            style={CenterLayout}
                          >
                            <Button secondary data-dismiss="modal" style={{ marginRight: '0.4rem'}}>
                              Закрыть
                            </Button>
                            <Button type="submit" dark>Сохранить</Button>
                          </Row>
                        </Modal.Body>
                      </Form>
                    </FormContainer>
                  )}
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
          {/* Modal */}
        </>
      )}
        </>
    )
}

export default AdminSlider