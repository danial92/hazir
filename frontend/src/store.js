import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, listProductReducer, deleteProductReducer, createProductReducer, updateProductReducer, createProductReviewReducer, topProductsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { getUserProfileReducer, getAllUsersReducer, updateProfileReducer, userLoginReducer, userRegisterReducer, deleteUserReducer, updateUserReducer } from "./reducers/userReducer";
import { createOrderReducer, deliverOrderReducer, getAllOrdersReducer, getMyOrdersReducer, getOrderReducer, payOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    listProducts: listProductReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: getUserProfileReducer,
    updateProfile: updateProfileReducer,
    createOrder: createOrderReducer,
    getOrder: getOrderReducer,
    payOrder: payOrderReducer,
    getMyOrders: getMyOrdersReducer,
    getAllUsers: getAllUsersReducer,
    deleteUser: deleteUserReducer,
    updateUser: updateUserReducer,
    deleteProduct: deleteProductReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    getAllOrders: getAllOrdersReducer,
    deliverOrder: deliverOrderReducer,
    createProductReview: createProductReviewReducer,
    topProducts: topProductsReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};


const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store