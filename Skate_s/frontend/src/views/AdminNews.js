import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { NEWS_CREATE_RESET, NEWS_UPDATE_RESET } from "../redux/constants/admin.constants";import { listOfNews } from "../redux/actions/product.actions";
import { createNews, updateNews, removeNews } from "../redux/actions/admin.actions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Pagination from '../components/Pagination';
import { Row, Col, Table, Modal, Figure, Button } from "bootstrap-4-react";
import styled from 'styled-components';

const AdminNews = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    
    const newsList = useSelector(state => state.newsList);
    const { loading, news, pages, page, error } = newsList;

    const newsCreate = useSelector(state => state.newsCreate);
    const { loading: loadingCreateNews, 
            success: successCreateNews,
            error: errorCreateNews } = newsCreate;
    
    const newsUpdate = useSelector(state => state.newsUpdate);
    const { loading: loadingUpdateNews, 
            success: successUpdateNews,
            error: errorUpdateNews } = newsUpdate;
  
    const newsRemove = useSelector(state => state.newsRemove);
    const { loading: loadingDeleteNews, 
            success: successDeleteNews,
            error: errorDeleteNews } = newsRemove;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo.isAdmin) {
          history.push("/login");
        } else {
          dispatch(listOfNews('', pageNumber));
        }
        
        if (successCreateNews) {
          dispatch({ type: NEWS_CREATE_RESET });
        }
    
        if (successUpdateNews) {
          dispatch({ type: NEWS_UPDATE_RESET });
        }
      }, [dispatch, pageNumber, history, userInfo, successCreateNews, successUpdateNews, successDeleteNews]);

      const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
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

      const submitNewsAddHandler = () => {
        dispatch(createNews({
          name, 
          description, 
          image, 
        }));
      };
    
      const submitNewsEditHandler = () => {
        dispatch(updateNews({
          _id: id,
          name, 
          description, 
          image
        }));
      }; 

      const deleteNewsHandler = (id) => {
        if (window.confirm("Вы действительно хотите удалить пользователя?")) {
          dispatch(removeNews(id));
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
         {successDeleteNews && <Message variant="danger">Товар удален</Message>}
      {successCreateNews && <Message variant="success">Товар создан</Message>}
      {successUpdateNews && <Message variant="success">Товар обновлен</Message>}
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
              {news.map((news) => (
                <tr className="text-center" key={news._id}>
                  <td>{news._id}</td>
                  <td>
                      {news.name}
                  </td>
                  <td>
                    <Button
                      className="btn-sm"
                      danger
                      onClick={() => deleteNewsHandler(news._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination pages={pages} page={page} isAdmin={true} />
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
                  {loadingCreateNews || loadingDeleteNews && <Loader />}
                  {errorCreateNews && <Message variant="danger">{errorCreateNews}</Message>}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <FormContainer>
                      <Form onSubmit={submitNewsAddHandler}>      
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
                            <label>Описание</label>
                            <Form.Control
                              type="text"
                              id="descriptionForm"
                              placeholder="Введите описание товара"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
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
          <Modal id="editModal" fade>
            <Modal.Dialog style={ModalDialog}>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Изменение данных о товаре</Modal.Title>
                  <Modal.Close>
                    <span aria-hidden="true">&times;</span>
                  </Modal.Close>
                </Modal.Header> 
                  {loadingUpdateNews && <Loader />}
                  {errorUpdateNews && <Message variant="danger">{errorUpdateNews}</Message>}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <FormContainer>
                      <Form onSubmit={submitNewsEditHandler}>
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
                            <label>Описание</label>
                            <Form.Control
                              type="text"
                              id="descriptionForm"
                              placeholder="Введите описание товара"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
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
                            <Button type="submit" dark>Обновить</Button>
                          </Row>
                        </Modal.Body>
                      </Form>
                    </FormContainer>
                  )}
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
        </>
      )}
        </>
    )
}

export default AdminNews