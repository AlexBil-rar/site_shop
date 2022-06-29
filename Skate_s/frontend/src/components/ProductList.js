import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { genEndOfNoun } from "../filters/GenEndOfNoun";
import '../styles/PList.css'

const ProductList = ({ product }) => {

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="inner-display-collection">
                <Link  style={{textDecoration: 'none', color: '#203040', }} to={`/product/${product._id}`}>
                <div className="cart-good">
                    <div className="wrapper-cart">
                        <img className="foto-cart" src={product.image} alt="товар"/>
                        <div className="display-info-cart">
                            <h4 className="text-price-cart" >{`${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, `$& `)}₽`}</h4>
                        </div>
                        <div className="display-info-cart">
                        <div className="ProductName">
                            {product.name.length > 40 ?
                            `${product.name.substring(0, 40)}...` : product.name
                            }
                        </div>
                        </div>
                        <div className="display-info-cart">
                            <Card.Text as="div" className="d-inline-flex">
                                <Rating 
                                    value={product.rating}
                                />
                                <div className="Reviews">{product.numReviews} {genEndOfNoun(product.numReviews, "отзыв", "отзыва", "отзывов")}</div>
                            </Card.Text>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        </div>
        



    )
}

export default ProductList;
