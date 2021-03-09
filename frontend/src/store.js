import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import { 
    productsReducers,
    productDetailsReducer 
} from './reducers/product.reducer'; 
import { authReducer, userReducer } from './reducers/user.reducer';

const reducer = combineReducers({
    products: productsReducers,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer
})

let initialState = {}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;