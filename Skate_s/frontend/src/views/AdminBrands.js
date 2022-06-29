import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { BRANDS_CREATE_RESET } from "../redux/constants/admin.constants";
import { listOfNews } from "../redux/actions/product.actions";
import { createBrands, removeBrand } from "../redux/actions/admin.actions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Table, Modal, Button } from "bootstrap-4-react";
import '../styles/app.css'

const AdminBrands = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const [category, setCategory] = useState("");
    const [img, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    
    const brandsList = useSelector(state => state.brandsList);
    const { loading, brand, error } = brandsList;

    const brandsCreate = useSelector(state => state.brandsCreate);
    const { loading: loadingCreatebrands, 
            success: successCreatebrands,
            error: errorCreatebrands } = brandsCreate;
    
    const brandsRemove = useSelector(state => state.brandsRemove);
    const { loading: loadingDeletebrands, 
            success: successDeletebrands,
            error: errorDeletebrands } = brandsRemove;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo.isAdmin) {
          history.push("/login");
        } else {
          dispatch(listOfNews('', pageNumber));
        }
        
        if (successCreatebrands) {
          dispatch({ type: BRANDS_CREATE_RESET });
        }

      }, [dispatch, pageNumber, history, userInfo, successCreatebrands, successDeletebrands]);

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
        dispatch(createBrands({
          category, 
          img, 
        }));
      };


      const deleteNewsHandler = (id) => {
        if (window.confirm("Вы действительно хотите удалить пользователя?")) {
          dispatch(removeBrand(id));
        }
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
         {successDeletebrands && <Message variant="danger">Товар удален</Message>}
      {successCreatebrands && <Message variant="success">Товар создан</Message>}
      <Row className="align-items-center">
        <Col>
          <h2 className="Title">Список товаров</h2>
        </Col>
        <Col className="text-right">
          <Button 
            className="my-3" 
            data-toggle="modal" 
            data-target="#createModal" 
            light
          >
            <i className="fas fa-plus"></i>
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
              {brand.map((b) => (
                <tr className="text-center" key={b._id}>
                  <td>{b._id}</td>
                  <td>
                      {b.category}
                  </td>
                  <td>
                    <Button
                      className="btn-sm"
                      danger
                      onClick={() => deleteNewsHandler(b._id)}
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
                  {loadingCreatebrands || loadingDeletebrands && <Loader />}
                  {errorCreatebrands && <Message variant="danger">{errorCreatebrands}</Message>}
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
                              type="category"
                              id="categoryForm"
                              placeholder="Введите название бренда"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            />
                          </Form.Group>
            
                          <Form.Group>
                              <label>Фото товара</label>
                              <Form.Control
                                  type="text"
                                  id="photoForm"
                                  placeholder="Введите ссылку на фото"
                                  value={img}
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

export default AdminBrands