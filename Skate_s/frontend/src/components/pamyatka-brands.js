import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {  listOfBrand } from '../redux/actions/product.actions';
// Import Swiper styles

const PBrand = () => {

  const dispatch = useDispatch();

  const brandsList = useSelector(state => state.brandsList);
  const { loading, brand, error } = brandsList;

  useEffect(() => {
    dispatch(listOfBrand());
}, [dispatch]);

    return (
        <>
        {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                {brand.map((b) =>
                    <p>{b.category} = {b._id}</p>
                )}
                </>
            )}
    </>
    );
  }
  
export default PBrand