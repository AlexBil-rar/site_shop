import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  listOfBrand } from "../redux/actions/product.actions";
import { Form } from 'react-bootstrap';

const Forma = () => {

    const dispatch = useDispatch();
    const brandsList = useSelector(state => state.brandsList);
    const { loading, brand, error } = brandsList;
  
    useEffect(() => {
      dispatch(listOfBrand());
  }, [dispatch]);
  

    return (
        <Form.Group>
        <label>Бренд</label>
        <Form.Control
            as="select"
            id="brandForm"
        >
      {loading ? (
              <></>
          ) : error ? (
              <></>
          ) : (
            <>
              {brand.map((b) => 
                <option key={b._id}>{b.category}</option>  
              )}
            </>       
          )}
        </Form.Control>
        
      </Form.Group>
    )
};

export default Forma;