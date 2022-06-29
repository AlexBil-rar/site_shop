import axios from "axios";
import { BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,
    NEWS_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    SLIDER_LIST_REQUEST,
    SLIDER_LIST_SUCCESS,
    SLIDER_LIST_FAIL,
    PCATEGORY_LIST_REQUEST,
    PCATEGORY_LIST_SUCCESS,
    PCATEGORY_LIST_FAIL } from "../constants/product.constants";

const listOfProduct = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};
const listOfProductsByCategory = (id = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/category/${id}?page=${pageNumber}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const listOfProductsByBrand = (id = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/brand/${id}?page=${pageNumber}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};


const listOfBrand = () => async (dispatch) => {
    try {
        dispatch({ type: BRAND_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/brand`);
        dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: BRAND_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};



const listOfCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/category`);
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: CATEGORY_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};


const listOfproductsCategory = (cats = "") => async (dispatch) => {
    try {
        dispatch({ type: PCATEGORY_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/products?category=${cats}`);
        dispatch({ type: PCATEGORY_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PCATEGORY_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const listOfSlider = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_LIST_REQUEST });
        const { data } = await axios.get('/api/slider');
        dispatch({ type: SLIDER_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: SLIDER_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};


const listOfNews = () => async (dispatch) => {
    try {
        dispatch({ type: NEWS_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/news`);
        dispatch({ type: NEWS_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: NEWS_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const listOfTopProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });
        const { data } = await axios
            .get('/api/products/top');
        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PRODUCT_TOP_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const detailsOfProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

export { listOfProduct, listOfProductsByCategory, detailsOfProduct, listOfTopProduct, listOfNews, listOfproductsCategory, listOfCategories, listOfSlider, listOfProductsByBrand, listOfBrand};