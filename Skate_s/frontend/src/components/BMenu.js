import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Header.css'
import { Col, Row } from 'react-bootstrap';
import { Route, NavLink } from 'react-router-dom';
import {  Nav,  Dropdown } from 'bootstrap-4-react';
import { LinkContainer } from "react-router-bootstrap";
import { logout } from '../redux/actions/auth.actions';
import SearchBox from './SearchBox';
import { listOfBrand } from "../redux/actions/product.actions";

const BMenu =  ({active}) => {
    const dispatch = useDispatch();

    const brandsList = useSelector(state => state.brandsList);
    const { loading, brand, error } = brandsList;
  
    useEffect(() => {
      dispatch(listOfBrand());
  }, [dispatch]);
  
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
  
    const cartProductList = useSelector((state) => state.cart);
    const { cartProductItems } = cartProductList;


    const logoutHandler = () => {
        dispatch(logout());
      };

    return(
        <>
        <div className={active ? 'menu active' : 'menu'}>
            <svg display="none">
                    <symbol id="bottom" viewBox="0 0 7 4">
                        <g>
                        <path d="M3.49999 3.56549C3.37453 3.56549 3.2491 3.52269 3.15345 3.43726L0.143599 0.747753C-0.0478664 0.576667 -0.0478664 0.29928 0.143599 0.128263C0.334987 -0.0427542 0.645354 -0.0427542 0.836835 0.128263L3.49999 2.50809L6.16316 0.128346C6.35462 -0.0426711 6.66496 -0.0426711 6.85633 0.128346C7.04789 0.299363 7.04789 0.57675 6.85633 0.747836L3.84653 3.43735C3.75083 3.52279 3.6254 3.56549 3.49999 3.56549Z"/>
                        </g>
                    </symbol>
            </svg>
            <svg display="none">
                    <symbol id="home" viewBox="0 0 27 25" >
                        <g>
                        <path d="M26.2747 10.8738C26.2741 10.8732 26.2735 10.8727 26.2729 10.8721L15.2579 0.674438C14.7884 0.239563 14.1642 0 13.5002 0C12.8362 0 12.212 0.239372 11.7422 0.674248L0.733028 10.8667C0.72932 10.8702 0.725611 10.8738 0.721903 10.8772C-0.242246 11.775 -0.240597 13.2317 0.726641 14.1272C1.16854 14.5365 1.75218 14.7736 2.3762 14.7984C2.40154 14.8006 2.42709 14.8018 2.45284 14.8018H2.89186V22.3066C2.89186 23.7917 4.19696 25 5.8014 25H10.1108C10.5476 25 10.9019 24.6721 10.9019 24.2676V18.3838C10.9019 17.7061 11.4973 17.1549 12.2293 17.1549H14.7711C15.503 17.1549 16.0984 17.7061 16.0984 18.3838V24.2676C16.0984 24.6721 16.4526 25 16.8895 25H21.1989C22.8034 25 24.1085 23.7917 24.1085 22.3066V14.8018H24.5156C25.1793 14.8018 25.8036 14.5624 26.2735 14.1275C27.2418 13.2305 27.2422 11.7714 26.2747 10.8738Z" fill="black"/>
                        </g>
                    </symbol>
            </svg>
            <div className="menu-container">
            <div className="nav-ul-acart">
              <Route render={({ history }) => <SearchBox history={history} />} />
              </div>            
                <div className="nav-ul-acart">
                    <input className="radio-one" type="checkbox" id="radio-1" />
                    <label className="radio-one-lable" htmlFor="radio-1">
                        Бренды
                        <svg className="icon-bottom">
                            <use xlinkHref="#bottom"></use>
                        </svg>
                    </label>
                    <div className="nav-ul-acart-category">
                    {loading ? (
                          <></>
                      ) : error ? (
                          <></>
                      ) : (
                        <>
                          {brand.map((b) => 
                            <a className="a-category-acart" key={b._id} href={`/brand/${b._id}`}>{b.category}</a>  
                          )}
                        </>       
                      )}
                    </div>
                </div>
                <div className="nav-ul-acart">
                    <input className="radio-one" type="checkbox" id="radio-2" />
                    <label className="radio-one-lable" htmlFor="radio-2">
                        Скейтборды
                        <svg className="icon-bottom">
                            <use xlinkHref="#bottom"></use>
                        </svg>
                    </label>
                    <div className="nav-ul-acart-category">
                        <a className="a-category-acart" href="/category/61c1d123acadfb6ffe8ad974">Скейтборды в сборе</a>
                        <a className="a-category-acart" href="/category/61c1d13cacadfb6ffe8ad975">Доски</a>
                        <a className="a-category-acart" href="/category/61c1d146acadfb6ffe8ad976">Подвески</a>
                        <a className="a-category-acart" href="/category/61c1d14facadfb6ffe8ad977">Колёса</a>
                        <a className="a-category-acart" href="/category/61c1d1faacadfb6ffe8ad97d">Шкурки</a>
                        <a className="a-category-acart" href="/category/61c1d15eacadfb6ffe8ad979">Железо</a>
                        <a className="a-category-acart" href="/category/61c1d1beacadfb6ffe8ad97c">Скейт Аксессуары</a>
                    </div>
                </div>
                <div className="nav-ul-acart">
                    <a className="radio-one-lable" href="/category/611f5ceaed042f106edc3787">Самокаты</a>
                </div>
                <div className="nav-ul-acart">
                    <a className="radio-one-lable" href="/category/611f5cf7ed042f106edc3788">Одежда</a>
                </div>
                <div className="nav-ul-acart">
                    <a className="radio-one-lable" href="/category/611f5cffed042f106edc3789">Аксессуары</a>
                </div>
                <div className="nav-ul-acart_info">
                <NavLink className="nav-info-text"  to="/delivery&payment">Доставка и оплата</NavLink>
                <NavLink className="nav-info-text"  to="/requisites">Реквизиты</NavLink>
                <NavLink className="nav-info-text"  to="/terms&warranties">Условия</NavLink>
                <NavLink className="nav-info-text"  to="/news">Новости</NavLink>
                <NavLink className="nav-info-text"  to="/cooperation">Сотрудничество</NavLink>
                </div>
            </div>
        </div>
        <div className='down-bar'>
            <Row>
                <Col className="justify-content-md-center">
                <a href="http://localhost:3000/">
                    <svg className="icon_down">
                        <use xlinkHref="#home"></use>  
                    </svg> 
                </a>
                </Col >
                <Col className="justify-content-md-center">
                    <NavLink to="/cart">
                            <svg className="icon_down">
                                <use xlinkHref="#bascket"></use>  
                            </svg> 
                            <span style={{fontSize: 18}}>
                            {""}
                            {cartProductItems.reduce(
                                (acc, item) => acc + +item.quantity,
                                null
                            )}{" "}
                            </span>
                    </NavLink>
                </Col>
                <Col className="justify-content-md-center">

                  {userInfo ? (
                    <Nav.Item dropdown className="cabinet">
                    <Nav.Link dropdownToggle className="header__category">
                        <svg className="icon_down">
                          <use xlinkHref="#cabinet"></use>
                        </svg>
                    </Nav.Link>
                    <Dropdown.Menu className="DropMenu">
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <Dropdown.Item>Админ</Dropdown.Item>
                          <Dropdown.Divider />
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/users">
                            <Dropdown.Item>Пользователи</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/brands">
                            <Dropdown.Item>Бренды</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/products">
                            <Dropdown.Item>Товары</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/news">
                            <Dropdown.Item>Новости</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/orders">
                            <Dropdown.Item>Заказы</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/slider">
                            <Dropdown.Item>Слайдер</Dropdown.Item>
                          </LinkContainer>
                        </>
                      )}
                      <LinkContainer bg="light" text="dark" to="/profile">
                        <Dropdown.Item>Личный кабинет</Dropdown.Item>
                      </LinkContainer>
                      <LinkContainer bg="light" text="dark" to="/">
                        <Dropdown.Item onClick={logoutHandler}>Выйти</Dropdown.Item>
                      </LinkContainer>
                    </Dropdown.Menu>
                  </Nav.Item>
                  ) : (
                    <LinkContainer to="/login" className="header__login">
                      <Nav.Link >
                      <svg className="icon_down">
                          <use xlinkHref="#cabinet"></use>
                      </svg>
                      </Nav.Link>
                    </LinkContainer>
                  )}
                </Col>
            </Row>
        </div>
        </>
    )

}

export default BMenu