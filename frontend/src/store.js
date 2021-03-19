import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import { productsReducers, productDetailsReducer, newReviewReducer } from './reducers/product.reducer'; 
import { authReducer, userReducer, forgotPasswordReducer} from './reducers/user.reducer';
import { cartReducer } from './reducers/cart.reducer'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from './reducers/order.reducer'

const reducer = combineReducers({
    products: productsReducers,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer

})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;