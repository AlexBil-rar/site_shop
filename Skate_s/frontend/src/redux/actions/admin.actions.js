import axios from "axios";
import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_REMOVE_REQUEST,
    USER_REMOVE_FAIL,
    USER_REMOVE_SUCCESS,
    USER_ADMIN_DETAILS_REQUEST,
    USER_ADMIN_DETAILS_SUCCESS,
    USER_ADMIN_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_REMOVE_REQUEST,
    PRODUCT_REMOVE_SUCCESS,
    PRODUCT_REMOVE_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    NEWS_CREATE_REQUEST,
    NEWS_CREATE_SUCCESS,
    NEWS_CREATE_FAIL,
    NEWS_UPDATE_FAIL,
    NEWS_UPDATE_REQUEST,
    NEWS_UPDATE_SUCCESS,
    NEWS_REMOVE_REQUEST,
    NEWS_REMOVE_SUCCESS,
    NEWS_REMOVE_FAIL, 
    SLIDER_CREATE_REQUEST,
    SLIDER_CREATE_SUCCESS,
    SLIDER_CREATE_FAIL,
    BRANDS_CREATE_REQUEST,
    BRANDS_CREATE_SUCCESS,
    BRANDS_CREATE_FAIL,
    BRANDS_REMOVE_REQUEST,
    BRANDS_REMOVE_FAIL,
    BRANDS_REMOVE_SUCCESS,
} from "../constants/admin.constants";

import { USER_PROFILE_SUCCESS } from "../constants/user.constants";

const listOfUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/admin/users`, config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_LIST_FAIL, 
            payload: message
        }); 
    }
};

const getUserDetailsForAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ADMIN_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/admin/users/${id}`, config);

        dispatch({ type: USER_ADMIN_DETAILS_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_ADMIN_DETAILS_FAIL, 
            payload: message
        }); 
    }
};

const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/admin/users/${user._id}`, user, config);

        dispatch({ type: USER_UPDATE_SUCCESS }); 
        dispatch({ type: USER_ADMIN_DETAILS_SUCCESS, payload: data }); 
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_UPDATE_FAIL, 
            payload: message
        }); 
    }
};

const removeUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/admin/users/${id}`, config);

        dispatch({ type: USER_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_REMOVE_FAIL, 
            payload: message
        }); 
    }
};

const createBrands = (brand) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRANDS_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`/api/admin/brand`, brand, config);

        dispatch({ type: BRANDS_CREATE_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: BRANDS_CREATE_FAIL, 
            payload: message
        }); 
    }
};

const createNews = (news) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWS_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`/api/admin/news`, news, config);

        dispatch({ type: NEWS_CREATE_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: NEWS_CREATE_FAIL, 
            payload: message
        }); 
    }
};

const createSlider = (slider) => async (dispatch, getState) => {
    try {
        dispatch({ type: SLIDER_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`/api/admin/slider`, slider, config);

        dispatch({ type: SLIDER_CREATE_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: SLIDER_CREATE_FAIL, 
            payload: message
        }); 
    }
};

const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`/api/admin/products`, product, config);

        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: PRODUCT_CREATE_FAIL, 
            payload: message
        }); 
    }
};

const updateNews = (news) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWS_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/admin/news/${news._id}`, news, config);

        dispatch({ type: NEWS_UPDATE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: NEWS_UPDATE_FAIL, 
            payload: message
        }); 
    }
};


const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/admin/products/${product._id}`, product, config);

        dispatch({ type: PRODUCT_UPDATE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: PRODUCT_UPDATE_FAIL, 
            payload: message
        }); 
    }
};

const removeBrand = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRANDS_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/admin/brand/${id}`, config);

        dispatch({ type: BRANDS_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: BRANDS_REMOVE_FAIL, 
            payload: message
        }); 
    }
};


const removeNews = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWS_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/admin/news/${id}`, config);

        dispatch({ type: NEWS_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: NEWS_REMOVE_FAIL, 
            payload: message
        }); 
    }
};

const removeSlider = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWS_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/admin/slider/${id}`, config);

        dispatch({ type: NEWS_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: NEWS_REMOVE_FAIL, 
            payload: message
        }); 
    }
};

const removeProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/admin/products/${id}`, config);

        dispatch({ type: PRODUCT_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: PRODUCT_REMOVE_FAIL, 
            payload: message
        }); 
    }
};

const listOfOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get('/api/admin/orders', config);

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data }); 
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: ORDER_LIST_FAIL, 
            payload: message
        }); 
    }
};

export { listOfUsers, 
        getUserDetailsForAdmin, 
        updateUser, 
        removeUser, 
        createProduct,
        updateProduct,
        removeProduct,
        listOfOrders,
        createNews,
        updateNews,
        removeNews,
        createSlider,
        removeSlider,
        createBrands,
        removeBrand };