import React from 'react';
import { Pagination } from 'bootstrap-4-react';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/app.css'

const PaginationBox = ({ pages, page, isAdmin = false, keyword = '' }) => {

    return (
        pages > 1 && (
            <nav className='PaginationCenter' aria-label="Page navigation example">
                <Pagination>
                    {[...Array(pages).keys()].map(x => (
                        <LinkContainer 
                            key={x+1} 
                            to={!isAdmin
                                ? keyword 
                                    ? `/search/${keyword}/page/${x+1}`
                                    : `/page/${x+1}`
                                : `/admin/products/${x+1}`
                            }
                        >
                            <Pagination.ItemLink text="dark" active={x + 1 === page}>{x+1}</Pagination.ItemLink>
                        </LinkContainer>
                    ))}
                </Pagination>
            </nav>
        )
    );
};

export default PaginationBox;
