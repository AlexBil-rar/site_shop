import React from "react";
import { Card } from "react-bootstrap";
import '../styles/Header.css'

const NewList = ({ news }) => {

    return (
        <Card className="my-3 p-3 rounded d-flex align-center">
                <Card.Img src={news.image} variant="top" />

            <Card.Body className="p-0">
                    <Card.Title as="div">
                        <strong className="ProductName">
                            {news.name.length > 25 ?
                                `${news.name.substring(0, 25)}...` : news.name
                            }
                        </strong>
                    </Card.Title>
 
                    <strong className="Productdesc">
                {news.description.length > 230 ?
                    `${news.description.substring(0, 230)}...` : news.description
                }
                </strong>
            </Card.Body>
        </Card>
    )
}

export default NewList;
