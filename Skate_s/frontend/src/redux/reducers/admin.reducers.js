import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_LIST_RESET,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS,
    USER_REMOVE_FAIL,
    USER_ADMIN_DETAILS_REQUEST,
    USER_ADMIN_DETAILS_SUCCESS,
    USER_ADMIN_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_REMOVE_REQUEST,
    PRODUCT_REMOVE_SUCCESS,
    PRODUCT_REMOVE_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    NEWS_CREATE_REQUEST,
    NEWS_CREATE_SUCCESS,
    NEWS_CREATE_FAIL,
    NEWS_CREATE_RESET,
    NEWS_UPDATE_REQUEST,
    NEWS_UPDATE_SUCCESS,
    NEWS_UPDATE_RESET,
    NEWS_UPDATE_FAIL,
    NEWS_REMOVE_REQUEST,
    NEWS_REMOVE_SUCCESS,
    NEWS_REMOVE_FAIL,
    SLIDER_CREATE_REQUEST,
    SLIDER_CREATE_SUCCESS,
    SLIDER_CREATE_FAIL,
    SLIDER_CREATE_RESET,
    SLIDER_REMOVE_REQUEST,
    SLIDER_REMOVE_SUCCESS,
    SLIDER_REMOVE_FAIL,
    BRANDS_CREATE_REQUEST,
    BRANDS_CREATE_SUCCESS,
    BRANDS_CREATE_FAIL,
    BRANDS_CREATE_RESET,
    BRANDS_REMOVE_REQUEST,
    BRANDS_REMOVE_SUCCESS,
    BRANDS_REMOVE_FAIL} from "../constants/admin.constants";

const userListReducer = (state = { userList: [] }, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, userList: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case USER_LIST_RESET:
            return { userList: [] };
        default:
            return state;
    }
};

const userDetailsForAdminReducer = (state = { userAdminDetails: {} }, action) => {
    switch(action.type) {
        case USER_ADMIN_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_ADMIN_DETAILS_SUCCESS:
            return { loading: false, userAdminDetails: action.payload };
        case USER_ADMIN_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const userUpdateReducer = (state = { userAdminDetails: {} }, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userAdminDetails: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

const userRemoveReducer = (state = { }, action) => {
    switch(action.type) {
        case USER_REMOVE_REQUEST:
            return { loading: true };
        case USER_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case USER_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const sliderCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case SLIDER_CREATE_REQUEST:
            return { loading: true };
        case SLIDER_CREATE_SUCCESS:
            return { loading: false, success: true, slider: action.payload };
        case SLIDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case SLIDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const brandCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case BRANDS_CREATE_REQUEST:
            return { loading: true };
        case BRANDS_CREATE_SUCCESS:
            return { loading: false, success: true, brand: action.payload };
        case BRANDS_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case BRANDS_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const newsCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case NEWS_CREATE_REQUEST:
            return { loading: true };
        case NEWS_CREATE_SUCCESS:
            return { loading: false, success: true, news: action.payload };
        case NEWS_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case NEWS_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
const productCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const newsUpdateReducer = (state = { news: {} }, action) => {
    switch(action.type) {
        case NEWS_UPDATE_REQUEST:
            return { loading: true };
        case NEWS_UPDATE_SUCCESS:
            return { loading: false, success: true, news: action.payload };
        case NEWS_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case NEWS_UPDATE_RESET:
            return { news: {} };
        default:
            return state;
    }
};

const productUpdateReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};

const sliderRemoveReducer = (state = { }, action) => {
    switch(action.type) {
        case SLIDER_REMOVE_REQUEST:
            return { loading: true };
        case SLIDER_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case SLIDER_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


const brandRemoveReducer = (state = { }, action) => {
    switch(action.type) {
        case BRANDS_REMOVE_REQUEST:
            return { loading: true };
        case BRANDS_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case BRANDS_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const newsRemoveReducer = (state = { }, action) => {
    switch(action.type) {
        case NEWS_REMOVE_REQUEST:
            return { loading: true };
        case NEWS_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case NEWS_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const productRemoveReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_REMOVE_REQUEST:
            return { loading: true };
        case PRODUCT_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const orderListReducer = (state = { ordersInfo: [] }, action) => {
    switch(action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                ordersInfo: action.payload
            };
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default: 
            return state;
    }
};
    
export { userListReducer, 
        userDetailsForAdminReducer, 
        userUpdateReducer, 
        userRemoveReducer, 
        productCreateReducer,
        productUpdateReducer,
        productRemoveReducer,
        orderListReducer,
        newsRemoveReducer,
        newsUpdateReducer,
        newsCreateReducer,
        sliderCreateReducer,
        sliderRemoveReducer,
        brandCreateReducer,
        brandRemoveReducer };