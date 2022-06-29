import { 
    BRAND_LIST_REQUEST,
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
    SLIDER_LIST_REQUEST,
    SLIDER_LIST_SUCCESS,
    SLIDER_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL} from "../constants/product.constants";

const newsListReducer = (state = { news: [] }, action) => {
    switch (action.type) {
        case NEWS_LIST_REQUEST:
            return { loading: true };
        case NEWS_LIST_SUCCESS:
            return { 
                loading: false, 
                news: action.payload.news,
            };
        case NEWS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

const sliderListReducer = (state = { slider: [] }, action) => {
    switch (action.type) {
        case SLIDER_LIST_REQUEST:
            return { loading: true };
        case SLIDER_LIST_SUCCESS:
            return { 
                loading: false, 
                slider: action.payload
            };
        case SLIDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

const categoriesListReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true };
        case CATEGORY_LIST_SUCCESS:
            return { 
                loading: false, 
                category: action.payload
            };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}



const brandsListReducer = (state = { brand: [] }, action) => {
    switch (action.type) {
        case BRAND_LIST_REQUEST:
            return { loading: true };
        case BRAND_LIST_SUCCESS:
            return { 
                loading: false, 
                brand: action.payload
            };
        case BRAND_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}



const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

const productTopReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { productListReducer, productTopReducer, productDetailsReducer, newsListReducer, categoriesListReducer, sliderListReducer, brandsListReducer };