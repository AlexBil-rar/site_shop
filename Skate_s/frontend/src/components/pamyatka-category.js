import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {  listOfCategories } from '../redux/actions/product.actions';
// Import Swiper styles

const PCategory = () => {

  const dispatch = useDispatch();

  const categoriesList = useSelector(state => state.categoriesList);
  const { loading, category, error } = categoriesList;

  useEffect(() => {
    dispatch(listOfCategories());
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
                {category.map((c) =>
                    <p>{c.name} = {c._id}</p>
                )}
                </>
            )}
    </>
    );
  }
  
export default PCategory