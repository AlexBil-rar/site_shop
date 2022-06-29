import { createStore, combineReducers,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productTopReducer, productDetailsReducer, newsListReducer, categoriesListReducer, sliderListReducer, brandsListReducer } from './reducers/product.reducers';
import { cartReducer } from './reducers/cart.reducers';
import { userRegisterReducer, userLoginReducer } from './reducers/auth.reducers';
import { userProfileReducer, userUpdateProfileReducer } from './reducers/user.reducers';
import { userDetailsForAdminReducer, 
        userListReducer, 
        userRemoveReducer, 
        userUpdateReducer,
        productCreateReducer,
        productUpdateReducer,
        productRemoveReducer,
        newsCreateReducer,
        newsUpdateReducer,
        newsRemoveReducer,
        orderListReducer, 
        sliderRemoveReducer,
        sliderCreateReducer,
        brandCreateReducer,
        brandRemoveReducer} from './reducers/admin.reducers';
import { orderCreateReducer, 
        orderDetailsReducer, 
        orderPayReducer,
        orderDeliverReducer, 
        myOrderListReducer } from './reducers/order.reducers';
import { reviewCreateReducer, reviewRemoveReducer } from './reducers/review.reducers';

const reducer = combineReducers({
    brandsList : brandsListReducer,
    categoriesList : categoriesListReducer,
    newsList: newsListReducer,
    sliderList: sliderListReducer,
    productList: productListReducer,
    productTop: productTopReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userProfile: userProfileReducer,
    updatingUserProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPayingStatus: orderPayReducer,
    orderDeliveringStatus: orderDeliverReducer,
    myOrderList: myOrderListReducer,
    usersList: userListReducer,
    userRemove: userRemoveReducer,
    userUpdate: userUpdateReducer,
    userDetailsForAdmin: userDetailsForAdminReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productRemove: productRemoveReducer,
    newsCreate: newsCreateReducer,
    newsUpdate: newsUpdateReducer,
    newsRemove: newsRemoveReducer,
    brandsCreate : brandCreateReducer, 
    brandsRemove : brandRemoveReducer, 
    sliderCreate: sliderCreateReducer,
    sliderRemove: sliderRemoveReducer,
    orderList: orderListReducer,
    reviewCreate: reviewCreateReducer,
    reviewRemove: reviewRemoveReducer,
});

const cartProductItemsFromStorage = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : '';

const initialState = {
    cart: { 
        cartProductItems: cartProductItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;