import React, { useState, useEffect } from "react";
import { Route, NavLink,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Collapse, Container, Dropdown } from 'bootstrap-4-react';
import { logout } from '../redux/actions/auth.actions';
import SearchBox from './SearchBox';
import BMenu from './BMenu';
import '../styles/Header.css'
import { listOfBrand } from "../redux/actions/product.actions";


const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const brandsList = useSelector(state => state.brandsList);
  const { loading, brand, error } = brandsList;

  useEffect(() => {
    dispatch(listOfBrand());
}, [dispatch]);

  const cartProductList = useSelector((state) => state.cart);
  const { cartProductItems } = cartProductList;
  const logoutHandler = () => {
    dispatch(logout());
  };

  const [menuActive, setMenuActive] = useState(false)

    return (
      <>
        <svg display="none">
            <symbol id="like" viewBox="0 -28 512.001 512">
                <g>
                <path d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0"/>
                </g>
            </symbol>
        </svg>
        <svg display="none">
            <symbol id="bascket" viewBox="0 0 512 512">
                <g>
                <path d="m337.034 420.796c.835.139 1.665.207 2.484.207 7.2 0 13.555-5.2 14.778-12.537l15-90c1.362-8.171-4.158-15.9-12.33-17.262-8.172-1.366-15.9 4.158-17.262 12.33l-15 90c-1.362 8.172 4.158 15.901 12.33 17.262z"/><path d="m158.704 408.466c1.223 7.337 7.577 12.537 14.778 12.537.819 0 1.649-.067 2.484-.207 8.172-1.362 13.692-9.09 12.33-17.262l-15-90c-1.362-8.172-9.089-13.691-17.262-12.33-8.172 1.362-13.692 9.09-12.33 17.262z"/><path d="m497 181h-52.791l-115.496-144.37c-5.174-6.467-14.613-7.518-21.083-2.342-6.469 5.175-7.518 14.614-2.342 21.083l100.503 125.629h-299.582l100.504-125.629c5.175-6.469 4.126-15.909-2.342-21.083-6.47-5.176-15.909-4.126-21.083 2.342l-115.497 144.37h-52.791c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h18.686l56.892 199.121c1.839 6.44 7.725 10.879 14.422 10.879h302c6.697 0 12.583-4.439 14.423-10.879l56.891-199.121h18.686c8.284 0 15-6.716 15-15v-60c0-8.284-6.716-15-15-15zm-101.314 270h-279.372l-51.428-180h382.229zm86.314-210c-51.385 0-403.32 0-452 0v-30h452z"/><path d="m256 421c8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15s-15 6.716-15 15v90c0 8.285 6.716 15 15 15z"/>
                </g>
            </symbol>
        </svg>  
        <svg display="none">
            <symbol id="search" viewBox="0 0 512.005 512.005">
                <g>
                <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
                    S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
                    c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
                    M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
                </g>
            </symbol>
        </svg>
        <svg display="none">
            <symbol id="tel" viewBox="0 0 482.6 482.6">
                <g>
                <path d="M98.339,320.8c47.6,56.9,104.9,101.7,170.3,133.4c24.9,11.8,58.2,25.8,95.3,28.2c2.3,0.1,4.5,0.2,6.8,0.2
    c24.9,0,44.9-8.6,61.2-26.3c0.1-0.1,0.3-0.3,0.4-0.5c5.8-7,12.4-13.3,19.3-20c4.7-4.5,9.5-9.2,14.1-14
    c21.3-22.2,21.3-50.4-0.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2c-12.8,0-25.1,5.6-35.6,16.1l-35.8,35.8
    c-3.3-1.9-6.7-3.6-9.9-5.2c-4-2-7.7-3.9-11-6c-32.6-20.7-62.2-47.7-90.5-82.4c-14.3-18.1-23.9-33.3-30.6-48.8
    c9.4-8.5,18.2-17.4,26.7-26.1c3-3.1,6.1-6.2,9.2-9.3c10.8-10.8,16.6-23.3,16.6-36s-5.7-25.2-16.6-36l-29.8-29.8
    c-3.5-3.5-6.8-6.9-10.2-10.4c-6.6-6.8-13.5-13.8-20.3-20.1c-10.3-10.1-22.4-15.4-35.2-15.4c-12.7,0-24.9,5.3-35.6,15.5l-37.4,37.4
    c-13.6,13.6-21.3,30.1-22.9,49.2c-1.9,23.9,2.5,49.3,13.9,80C32.739,229.6,59.139,273.7,98.339,320.8z M25.739,104.2
    c1.2-13.3,6.3-24.4,15.9-34l37.2-37.2c5.8-5.6,12.2-8.5,18.4-8.5c6.1,0,12.3,2.9,18,8.7c6.7,6.2,13,12.7,19.8,19.6
    c3.4,3.5,6.9,7,10.4,10.6l29.8,29.8c6.2,6.2,9.4,12.5,9.4,18.7s-3.2,12.5-9.4,18.7c-3.1,3.1-6.2,6.3-9.3,9.4
    c-9.3,9.4-18,18.3-27.6,26.8c-0.2,0.2-0.3,0.3-0.5,0.5c-8.3,8.3-7,16.2-5,22.2c0.1,0.3,0.2,0.5,0.3,0.8
    c7.7,18.5,18.4,36.1,35.1,57.1c30,37,61.6,65.7,96.4,87.8c4.3,2.8,8.9,5,13.2,7.2c4,2,7.7,3.9,11,6c0.4,0.2,0.7,0.4,1.1,0.6
    c3.3,1.7,6.5,2.5,9.7,2.5c8,0,13.2-5.1,14.9-6.8l37.4-37.4c5.8-5.8,12.1-8.9,18.3-8.9c7.6,0,13.8,4.7,17.7,8.9l60.3,60.2
    c12,12,11.9,25-0.3,37.7c-4.2,4.5-8.6,8.8-13.3,13.3c-7,6.8-14.3,13.8-20.9,21.7c-11.5,12.4-25.2,18.2-42.9,18.2
    c-1.7,0-3.5-0.1-5.2-0.2c-32.8-2.1-63.3-14.9-86.2-25.8c-62.2-30.1-116.8-72.8-162.1-127c-37.3-44.9-62.4-86.7-79-131.5
    C28.039,146.4,24.139,124.3,25.739,104.2z"/>
                </g>
            </symbol>
        </svg>
        <svg display="none">
            <symbol id="mail" viewBox="0 0 14 9">
                <g>
                <path d="M12.8333 0H1.16668C0.523223 0 0 0.448477 0 1.00001V8.00002C0 8.55152 0.523223 9 1.16668 9H12.8334C13.4768 9 14 8.55152 14 7.99999V1.00001C14 0.448477 13.4768 0 12.8333 0ZM1.16668 0.499992H12.8334C12.8763 0.499992 12.9142 0.513422 12.9545 0.521016C11.9445 1.31337 8.59532 3.93959 7.42328 4.84472C7.33157 4.91552 7.18375 4.99999 7.00003 4.99999C6.8163 4.99999 6.66848 4.91552 6.57647 4.84448C5.40455 3.93949 2.05518 1.31313 1.0453 0.521063C1.08571 0.513469 1.12366 0.499992 1.16668 0.499992ZM0.583324 7.99999V1.00001C0.583324 0.951023 0.600551 0.906586 0.615973 0.86182C1.38904 1.46829 3.72594 3.30073 5.24122 4.48181C3.73086 5.59385 1.39336 7.49341 0.614141 8.1303C0.600387 8.08779 0.583324 8.04621 0.583324 7.99999ZM12.8333 8.50001H1.16668C1.12008 8.50001 1.07866 8.48609 1.03515 8.47718C1.84034 7.81924 4.19273 5.90876 5.67654 4.82072C5.86996 4.97112 6.04666 5.10825 6.18595 5.21583C6.42636 5.40188 6.70775 5.50001 7 5.50001C7.29225 5.50001 7.57364 5.40185 7.81375 5.21606C7.95309 5.10844 8.12993 4.97119 8.32347 4.82072C9.80736 5.90864 12.1594 7.81898 12.9648 8.47718C12.9213 8.48609 12.88 8.50001 12.8333 8.50001ZM13.4167 7.99999C13.4167 8.04619 13.3996 8.08779 13.3859 8.1303C12.6064 7.49309 10.2691 5.59373 8.7588 4.48184C10.2741 3.30075 12.6107 1.46848 13.384 0.861773C13.3994 0.906539 13.4167 0.951 13.4167 0.999984V7.99999Z" fill="white"/>
                </g>
            </symbol>
        </svg>
        <svg display="none">
            <symbol id="cabinet" viewBox="0 0 992.000000 1280.000000">
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                stroke="none">
                <path d="M4710 12789 c-617 -58 -1183 -319 -1624 -749 -241 -235 -406 -460
                -546 -745 -207 -422 -290 -805 -277 -1280 8 -291 46 -510 132 -770 291 -874
                1011 -1543 1902 -1769 736 -187 1528 -51 2156 368 167 112 267 194 422 350
                511 513 786 1179 785 1901 -1 439 -86 805 -280 1201 -350 712 -1015 1245
                -1785 1428 -282 68 -607 92 -885 65z"/>
                <path d="M4665 7139 c-343 -27 -672 -94 -1000 -204 -1048 -350 -1992 -1142
                -2653 -2227 -597 -980 -936 -2114 -1002 -3353 -16 -298 -13 -422 9 -472 157
                -344 1245 -646 2856 -792 717 -65 1214 -86 2085 -85 665 0 891 5 1405 34 701
                40 1413 119 1970 220 900 163 1457 385 1566 623 22 50 25 174 9 472 -75 1399
                -505 2682 -1246 3722 -947 1327 -2308 2083 -3728 2072 -94 -1 -216 -5 -271
                -10z"/>
                </g>
            </symbol>
        </svg>
        <svg display="none">
            <symbol id="bottom" viewBox="0 0 7 4">
                <g>
                <path d="M3.49999 3.56549C3.37453 3.56549 3.2491 3.52269 3.15345 3.43726L0.143599 0.747753C-0.0478664 0.576667 -0.0478664 0.29928 0.143599 0.128263C0.334987 -0.0427542 0.645354 -0.0427542 0.836835 0.128263L3.49999 2.50809L6.16316 0.128346C6.35462 -0.0426711 6.66496 -0.0426711 6.85633 0.128346C7.04789 0.299363 7.04789 0.57675 6.85633 0.747836L3.84653 3.43735C3.75083 3.52279 3.6254 3.56549 3.49999 3.56549Z"/>
                </g>
            </symbol>
        </svg>
        <header>
          <div className="header-bg_1">
            <div className="wrapper">
                      <div className="flex">
                          <div className="">
                              <a className="support" href="tel:+79172540502">
                                  <svg className="icon-tel">
                                      <use xlinkHref="#tel"></use>
                                  </svg>+7 (917)254-05-02</a>
                              <a className="support" href="mailto:shopnakolesah@gmail.com">
                                  <svg className="icon-mail">
                                      <use xlinkHref="#mail"></use>
                                  </svg>
                                  shopnakolesah@gmail.com</a>
                          </div>
                          <div className="info-header">
                              
            <Navbar expand="lg" >
            <Container>
              <Navbar.Toggler target="#navbarColor1" />
              <Collapse navbar id="navbarColor1">
                <NavLink className="nav-info-text"  to="/delivery&payment">Доставка и оплата</NavLink>
                <NavLink className="nav-info-text"  to="/requisites">Реквизиты</NavLink>
                <NavLink className="nav-info-text"  to="/terms&warranties">Условия продажи и гарантии</NavLink>
                <NavLink className="nav-info-text"  to="/news">Новости</NavLink>
                <NavLink className="nav-info-text"  to="/cooperation">Сотрудничество</NavLink>
                <Navbar.Nav ml="auto">
                  {userInfo ? (
                    <Nav.Item dropdown className="cabinet">
                    <Nav.Link className="header__category" dropdownToggle>{userInfo.name}</Nav.Link>
                    <Dropdown.Menu className="DropMenu">
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <Dropdown.Item>Админ</Dropdown.Item>
                          <Dropdown.Divider />
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/users">
                            <Dropdown.Item>Пользователи</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/products">
                            <Dropdown.Item>Товары</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer className="text_DropMenu" bg="light" text="dark" to="/admin/brands">
                            <Dropdown.Item>Бренды</Dropdown.Item>
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
                          <Dropdown.Divider />
                          <Dropdown.Item className="text_DropMenu" >Пользователь</Dropdown.Item>
                          <Dropdown.Divider />
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
                      <Nav.ItemLink className="cabinet">
                      <svg className="icon-cabinet">
                          <use xlinkHref="#cabinet"></use>
                      </svg>
                        Мой кабинет
                      </Nav.ItemLink>
                    </LinkContainer>
                  )}
                    </Navbar.Nav>
                  </Collapse>
                </Container>
              </Navbar>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="header-bg_2">
                <div className="wrapper">
                    <div className="flex_2">
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{marginRight: 25}}>
                                <a href="http://localhost:3000/">
                                <img className="logo-site" src={'/images/Site_logo.png'} alt="logo_site" />  
                                </a>
                            </div>
                                <div className="flex-nav-ul">
                                  
                                    <ul className="nav-ul">
                                      <li className="a-category">Бренды
                                        <svg className="icon-bottom">
                                          <use xlinkHref="#bottom"></use>
                                        </svg>
                                        <div className="pos-nav_1">
                                          <ul className="nav-1">
                                          {loading ? (
                                              <></>
                                          ) : error ? (
                                              <></>
                                          ) : (
                                            <>
                                              {brand.map((b) => 
                                               <a className="category-nav" key={b._id} href={`/brand/${b._id}`}>{b.category}</a>  
                                              )}
                                            </>       
                                          )}
                                          </ul>
                                        </div>
                                      </li>
                                      <li className="a-category">Скейтборды
                                        <svg className="icon-bottom">
                                          <use xlinkHref="#bottom"></use>
                                        </svg>
                                        <div className="pos-nav_2">
                                          <ul className="nav-2">
                                            <a className="category-nav" href="/category/61c1d123acadfb6ffe8ad974">Скейтборды в сборе</a>
                                            <a className="category-nav" href="/category/61c1d13cacadfb6ffe8ad975">Доски</a>
                                            <a className="category-nav" href="/category/61c1d146acadfb6ffe8ad976">Подвески</a>
                                            <a className="category-nav" href="/category/61c1d14facadfb6ffe8ad977">Колёса</a>
                                            <a className="category-nav" href="/category/61c1d1faacadfb6ffe8ad97d">Шкурки</a>
                                            <a className="category-nav" href="/category/61c1d15eacadfb6ffe8ad979">Железо</a>
                                            <a className="category-nav" href="/category/61c1d1beacadfb6ffe8ad97c">Скейт Аксессуары</a>
                                          </ul>
                                        </div>
                                      </li>
                                      <a className="a-category" href="/category/611f5ceaed042f106edc3787">Самокат</a>
                                      <a className="a-category" href="/category/611f5cf7ed042f106edc3788">Одежда</a>
                                      <a className="a-category" href="/category/611f5cffed042f106edc3789">Аксессуары</a>
                                    </ul>
                                     
                                   
                            </div>
                        </div>
                        <div className="search">
                                <Route render={({ history }) => <SearchBox history={history} />} />

                                    <NavLink to="/cart">
                                        <div className="action_icon">
                                            <svg className="icon_bascket">
                                                <use xlinkHref="#bascket"></use>  
                                            </svg> 
                                            <span>
                                            {""}
                                            {cartProductItems.reduce(
                                                (acc, item) => acc + +item.quantity,
                                                null
                                            )}{" "}
                                            </span>
                                        </div>
                                    </NavLink>
                        </div>
                        <div className="burger-menu">
                            <button className="menu-btn" onClick={() => setMenuActive(!menuActive)}>
                                <span/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </header>
          <BMenu active={menuActive} />
          </>
    )
};

export default Header;
