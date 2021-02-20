import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import { 
    productsReducers,
    productDetailReducers 
} from './reducers/product.reducer'; 

const reducer = combineReducers({
    products: productsReducers,
    productDetails: productDetailReducers
})

let initialState = {}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;